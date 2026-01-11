'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Squares } from './squares'

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-primary-foreground">
      <Squares />

      <main className="container relative z-10 mx-auto mb-12 flex flex-col items-center justify-center px-6 py-4 pt-20 md:flex-row">
        {/* Texto com fade + slide-up */}
        <motion.article
          className="max-w-3xl flex-2 flex-col space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Badge
            variant="outline"
            className="mx-auto flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm md:mx-0 md:justify-center"
          >
            <Sparkles />
            Benefícios Exclusivos para Advogados
          </Badge>

          <h2 className="text-center font-bold font-calsans text-4xl tracking-tight md:text-left md:text-5xl md:tracking-wide lg:text-6xl">
            Acesse <span className="text-primary">empresas conveniadas</span> em todo Maranhão
          </h2>

          <p className="max-w-2xl text-pretty text-center text-base text-muted-foreground md:text-left md:text-lg">
            Descontos e benefícios exclusivos para advogados associados à CAAMA. Selecione sua cidade e descubra todas as
            vantagens disponíveis.
          </p>
        </motion.article>

        <motion.div
          className="mt-12 md:mt-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <Image
            src="/assets/hero-connection.svg"
            alt="Foto de conexão entre advogados e empresas"
            width={350}
            height={400}
            className="object-contain"
            quality={100}
            priority
          />
        </motion.div>
      </main>
    </div>
  )
}
