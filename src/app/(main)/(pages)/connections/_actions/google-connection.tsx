'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { google } from 'googleapis'

export const getFileMetaData = async () => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.OAUTH2_REDIRECT_URI
    )

    // ✅ FIX: await auth()
    const { userId } = await auth()

    if (!userId) {
        return { message: 'User not found' }
    }

    // ✅ FIX: new clerkClient usage
    const client = await clerkClient()

    // ✅ FIX: remove oauth_ prefix
    const clerkResponse = await client.users.getUserOauthAccessToken(
        userId,
        'google'
    )

    // ✅ SAFETY CHECK
    if (!clerkResponse.data || clerkResponse.data.length === 0) {
        return { message: 'Google account not connected' }
    }

    const accessToken = clerkResponse.data[0].token

    oauth2Client.setCredentials({
        access_token: accessToken,
    })

    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client,
    })

    try {
        const response = await drive.files.list({
            pageSize: 10,
            fields: 'files(id, name, mimeType)',
        })

        return {
            files: response.data.files || [],
        }
    } catch (error) {
        console.error('Drive Error:', error)
        return { message: 'Something went wrong' }
    }
}