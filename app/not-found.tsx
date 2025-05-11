"use client"

import * as React from "react"
import { useState } from "react"
import { FuzzyText } from "@/components/ui/fuzzy-text"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Terminal } from "lucide-react"

export default function Error() {
  const [enableHover] = useState(true)
  const [hoverIntensity] = useState(0.4)
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <div className="mb-6 flex justify-center">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={hoverIntensity}
            enableHover={enableHover}
            className="text-9xl font-bold text-center w-full"
          >
            404
          </FuzzyText>
        </div>
        
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-bold">System Malfunction Detected</h2>
          
          <div className="bg-gray-900 rounded-lg p-4 text-left font-mono text-sm border border-gray-800">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Terminal size={16} />
              <span>terminal@aidaptics:~$</span>
            </div>
            <p className="text-gray-400">
              <span className="text-green-500">ERROR:</span> Page not found in memory address 0x00000404<br/>
              <span className="text-green-500">TRACE:</span> Neural pathway disconnected<br/>
              <span className="text-green-500">STATUS:</span> Quantum entanglement failed<br/>
              <span className="text-green-500">SOLUTION:</span> Return to main interface
            </p>
          </div>
          
          <p className="text-gray-400">
            The page you&lsquo;re looking for has been lost in the digital void. Our AI is still learning to navigate all corners of cyberspace.
          </p>
        </div>
        
        <Link href="/">
          <Button 
            variant="outline" 
            size="lg"
            className="gap-2 border-indigo-500 text-indigo-400 hover:bg-indigo-950/30"
          >
            <ArrowLeft size={16} />
            Return to Home Interface
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
