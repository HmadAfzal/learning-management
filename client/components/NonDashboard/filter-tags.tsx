"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function FilterTags({setSelectedTag}: { setSelectedTag: (tag: string | null) => void }) {
  const tags = ["web development", "enterprise IT", "react nextjs", "web development", "enterprise IT"]

  return (
    <div className="no-scrollbar overflow-x-auto">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-2 pb-2"
      >
        {tags.map((tag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button
              variant="secondary"
              className="whitespace-nowrap rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary"
              onClick={() => setSelectedTag(tag)}
           >
              {tag}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

