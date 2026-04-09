import { postContentToWebHook } from '@/app/(main)/(pages)/connections/_actions/disocrd-connection'
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import { postMessageToSlack } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import { db } from '@/lib/db'
import axios from 'axios'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

// ✅ SAFE PARSER
function safeParseFlowPath(flowPath: string | null): string[] {
    if (!flowPath) return []

    try {
        const parsed = JSON.parse(flowPath)
        return Array.isArray(parsed) ? parsed : []
    } catch (err) {
        console.error('Invalid flowPath JSON:', flowPath)
        return []
    }
}

export async function POST(req: NextRequest) {
    console.log('🔴 Changed')

    const headersList = await headers()
    let channelResourceId: string | undefined

    headersList.forEach((value, key) => {
        if (key === 'x-goog-resource-id') {
            channelResourceId = value
        }
    })

    if (!channelResourceId) {
        return Response.json({ message: 'No resource ID' }, { status: 200 })
    }

    const user = await db.user.findFirst({
        where: {
            googleResourceId: channelResourceId,
        },
        select: { clerkId: true, credits: true },
    })

    if (!user) {
        return Response.json({ message: 'User not found' }, { status: 200 })
    }

    if (!(parseInt(user.credits!) > 0 || user.credits === 'Unlimited')) {
        return Response.json({ message: 'No credits' }, { status: 200 })
    }

    const workflows = await db.workflows.findMany({
        where: {
            userId: user.clerkId,
        },
    })

    if (!workflows || workflows.length === 0) {
        return Response.json({ message: 'No workflows' }, { status: 200 })
    }
    // IMPORTANT: use Promise.all instead of map(async)
    await Promise.all(
        workflows.map(async (flow) => {
            try {
                const flowPath = safeParseFlowPath(flow.flowPath)

                if (flowPath.length === 0) {
                    console.log('Skipping empty flow:', flow.id)
                    return
                }

                let current = 0

                while (current < flowPath.length) {
                    const step = flowPath[current]

                    // ✅ DISCORD
                    if (step === 'Discord') {
                        const discordMessage = await db.discordWebhook.findFirst({
                            where: { userId: flow.userId },
                            select: { url: true },
                        })

                        if (discordMessage) {
                            await postContentToWebHook(
                                flow.discordTemplate!,
                                discordMessage.url
                            )
                        }

                        flowPath.splice(current, 1)
                        continue
                    }

                    // ✅ SLACK
                    if (step === 'Slack') {
                        const channels = flow.slackChannels.map((channel) => ({
                            label: '',
                            value: channel,
                        }))

                        await postMessageToSlack(
                            flow.slackAccessToken!,
                            channels,
                            flow.slackTemplate!
                        )

                        flowPath.splice(current, 1)
                        continue
                    }

                    // ✅ NOTION
                    if (step === 'Notion') {
                        await onCreateNewPageInDatabase(
                            flow.notionDbId!,
                            flow.notionAccessToken!,
                            JSON.parse(flow.notionTemplate!)
                        )

                        flowPath.splice(current, 1)
                        continue
                    }

                    if (step === 'Wait') {
                        const res = await axios.put(
                            'https://api.cron-job.org/jobs',
                            {
                                job: {
                                    url: `${process.env.NGROK_URI}?flow_id=${flow.id}`,
                                    enabled: 'true',
                                    schedule: {
                                        timezone: 'Europe/Istanbul',
                                        expiresAt: 0,
                                        hours: [-1],
                                        mdays: [-1],
                                        minutes: ['*****'],
                                        months: [-1],
                                        wdays: [-1],
                                    },
                                },
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${process.env.CRON_JOB_KEY!}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        )

                        if (res) {
                            flowPath.splice(current, 1)

                            await db.workflows.update({
                                where: { id: flow.id },
                                data: {
                                    cronPath: JSON.stringify(flowPath),
                                },
                            })
                        }

                        break
                    }

                    current++
                }

                if (user.credits !== 'Unlimited') {
                    await db.user.update({
                        where: { clerkId: user.clerkId },
                        data: {
                            credits: `${parseInt(user.credits!) - 1}`,
                        },
                    })
                }

            } catch (err) {
                console.error('Flow execution failed:', flow.id, err)
            }
        })
    )

    return Response.json(
        { message: 'flow completed' },
        { status: 200 }
    )
}