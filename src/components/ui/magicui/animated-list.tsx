'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState
} from 'react'

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 350, damping: 40 }
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
        }, delay)

        return () => clearTimeout(timeout)
      }
    }, [index, delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse()
      return result
    }, [index, childrenArray])

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = 'AnimatedList'

// Demo version for the bento grid
export const AnimatedListDemo = ({ className }: { className?: string }) => {
  const demoItems = [
    <div
      key="item-1"
      className="w-full rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <div className="space-y-1">
          <div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div className="h-3 w-32 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </div>
    </div>,
    <div
      key="item-2"
      className="w-full rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <div className="space-y-1">
          <div className="h-4 w-28 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div className="h-3 w-36 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </div>
    </div>,
    <div
      key="item-3"
      className="w-full rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <div className="space-y-1">
          <div className="h-4 w-20 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div className="h-3 w-28 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </div>
    </div>
  ]

  return (
    <AnimatedList className={className} delay={2000}>
      {demoItems}
    </AnimatedList>
  )
}
