"use client"

import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Arc Reactor */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <motion.div
            className="absolute w-full h-full rounded-full border-4 border-ironman-blue opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <motion.div
            className="absolute w-3/4 h-3/4 rounded-full border-2 border-ironman-gold opacity-70"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <motion.div
            className="w-1/2 h-1/2 rounded-full bg-ironman-blue"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        {/* Loading text */}
        <motion.div
          className="mt-4 text-center text-sm text-ironman-gold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          SYSTEM LOADING
        </motion.div>
      </motion.div>
    </div>
  )
}
