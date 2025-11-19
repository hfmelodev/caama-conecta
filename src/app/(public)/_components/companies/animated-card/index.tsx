'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: false, // 👈 anima SEMPRE que entrar na tela
    threshold: 0.2, // 20% visível ativa a animação
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
