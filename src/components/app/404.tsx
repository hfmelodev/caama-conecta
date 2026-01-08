'use client'

import { motion } from 'framer-motion'
import { FileSearch } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Page404() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut',
        }}
        className="mb-8 inline-block"
      >
        <FileSearch className="h-24 w-24 text-primary" />
      </motion.div>

      <h1 className="mb-2 font-bold text-4xl text-primary">404</h1>
      <h2 className="mb-4 font-semibold text-2xl text-primary">Página não encontrada</h2>

      <p className="mx-auto mb-8 max-w-md text-gray-600">
        Ops! Parece que você se perdeu. Esta página não existe no nosso sistema.
      </p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button asChild>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>Voltar para a Página Inicial</Link>
        </Button>
      </motion.div>
    </motion.div>
  )
}
