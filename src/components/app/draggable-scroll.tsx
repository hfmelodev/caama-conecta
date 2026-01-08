'use client'

import { type ComponentProps, type RefObject, useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'

type DraggableScrollProps = ComponentProps<'div'>

export function DraggableScroll({ ...props }: DraggableScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { events } = useDraggable(ref as RefObject<HTMLDivElement>)

  return <div {...props} {...events} ref={ref} />
}
