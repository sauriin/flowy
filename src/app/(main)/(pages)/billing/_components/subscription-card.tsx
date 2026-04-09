'use client'
import React from 'react'

type Props = {
    onPayment(id: string): void
    products: any[]
    tier: string
}

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const SubscriptionCard = ({ onPayment, products, tier }: Props) => {
    return (
        <section className="flex w-full justify-center md:flex-row flex-col gap-6">
            {products &&
                products.map((product: any) => (
                    <Card
                        className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl"
                        key={product.id}
                    >
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">
                                {product.name}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col h-full">

                            {/* TOP CONTENT */}
                            <div className="flex flex-col gap-5 grow">

                                {/* Description */}
                                <CardDescription className="text-neutral-400 leading-relaxed min-h-20">
                                    {product.name === 'Unlimited'
                                        ? 'Enjoy a monthly torrent of credits flooding your account, empowering you to tackle even the most ambitious automation tasks effortlessly.'
                                        : product.name === 'Pro'
                                            ? 'Experience a monthly surge of credits to supercharge your automation efforts. Ideal for small to medium-sized projects seeking consistent support.'
                                            : 'Get a monthly wave of credits to automate your tasks with ease. Perfect for starters looking to dip their toes into Flowy\'s automation capabilities.'}
                                </CardDescription>

                                {/* Credits + Price */}
                                <div className="flex justify-between items-center mt-auto">
                                    <p>
                                        {product.name === 'Free'
                                            ? '10'
                                            : product.name === 'Pro'
                                                ? '100'
                                                : 'Unlimited'}{' '}
                                        credits
                                    </p>

                                    <p className="font-bold">
                                        {product.name === 'Free'
                                            ? 'Free'
                                            : product.name === 'Pro'
                                                ? '649.99'
                                                : '1499.99'}
                                        /mo
                                    </p>
                                </div>

                            </div>

                            {/* BUTTON ALWAYS AT BOTTOM */}
                            <div className="mt-6">
                                {product.name === tier ? (
                                    <Button disabled variant="outline" className="w-full">
                                        Active
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => onPayment(product.default_price)}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Purchase
                                    </Button>
                                )}
                            </div>

                        </CardContent>
                    </Card>
                ))}
        </section>
    )
}