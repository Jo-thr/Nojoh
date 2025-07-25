import { cn } from '@/lib/utils'
import React, { JSX } from 'react'

type TitleProps = {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export function Title({ level = 1, children, className }: TitleProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const baseStyles = {
    1: 'text-4xl md:text-5xl font-bold tracking-tight leading-tight font-dmSerif',
    2: 'text-3xl font-bold font-dmSerif',
    3: 'text-2xl font-semibold font-dmSerif',
    4: 'text-xl font-semibold font-dmSerif',
    5: 'text-lg font-medium font-dmSerif',
    6: 'text-base font-medium font-dmSerif',
  }

  return (
    <Tag className={cn('font-jost', baseStyles[level], className)}>
      {children}
    </Tag>
  )
}
