import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
    credits: number
    tier: string
}

const CreditTracker = ({ credits, tier }: Props) => {
    const maxCredits =
        tier === 'Free' ? 10 : tier === 'Pro' ? 100 : 999

    const percentage =
        tier === 'Unlimited'
            ? 100
            : Math.min((credits / maxCredits) * 100, 100)

    return (
        <div className="p-6">
            <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800  shadow-sm hover:shadow-md transition-all">

                <CardContent className="p-6 flex flex-col gap-6">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg text-neutral-900 font-semibold  dark:text-white">
                            Credit Usage
                        </h2>

                        <span className="
                            text-xs px-3 py-1 rounded-full
                            bg-neutral-100 text-neutral-700
                            dark:bg-neutral-800 dark:text-neutral-300
                            border border-neutral-200 dark:border-neutral-700
                        ">
                            {tier} Plan
                        </span>
                    </div>

                    {/* Credits */}
                    <div>
                        <p className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            {tier === 'Unlimited' ? '∞' : credits}
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Credits Used
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col gap-2">
                        <div className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className="
                                    h-full rounded-full 
                                    bg-gradient-to-r from-neutral-900 to-neutral-700
                                    dark:from-white dark:to-neutral-300
                                    transition-all duration-500 ease-out
                                "
                                style={{ width: `${percentage}%` }}
                            />
                        </div>

                        <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                            <span>{percentage.toFixed(0)}%</span>
                            {tier !== 'Unlimited' && (
                                <span>{maxCredits - credits} left</span>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    {tier !== 'Unlimited' && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {maxCredits - credits} credits remaining
                        </p>
                    )}

                </CardContent>
            </Card>
        </div>
    )
}

export default CreditTracker