'use client'

import React from 'react'

type Tier = 'Free' | 'Pro' | 'Unlimited'

type BillingProviderProps = {
  credits: string
  tier: Tier
  setCredits: React.Dispatch<React.SetStateAction<string>>
  setTier: React.Dispatch<React.SetStateAction<Tier>>
}

type WithChildProps = {
  children: React.ReactNode
}

const context = React.createContext<BillingProviderProps | null>(null)

export const BillingProvider = ({ children }: WithChildProps) => {
  const [credits, setCredits] = React.useState('0')
  const [tier, setTier] = React.useState<Tier>('Free')

  const values = {
    credits,
    setCredits,
    tier,
    setTier,
  }

  return <context.Provider value={values}>{children}</context.Provider>
}

export const useBilling = () => {
  const state = React.useContext(context)

  if (!state) {
    throw new Error('useBilling must be used within BillingProvider')
  }

  return state
}