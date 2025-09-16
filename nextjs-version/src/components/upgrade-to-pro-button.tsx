"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Rocket, Blocks, LayoutDashboard, ArrowRight } from "lucide-react"
import Image from "next/image"


const SHADCN_BLOCKS_URL = "https://shadcnstore.com/blocks"

export function UpgradeToProButton() {


  return (
    <div className="fixed z-50 bottom-8 right-4 md:right-6 lg:right-8 flex flex-col items-end gap-2">
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button
            size="lg"
            className="px-6 py-3 bg-gradient-to-br shadow-lg from-slate-900 cursor-pointer to-slate-400 text-white font-bold"
            style={{ minWidth: 180 }} onClick={() => typeof window !== "undefined" && window.open(SHADCN_BLOCKS_URL, "_blank")}
          >
            Upgrade to Pro
            <Rocket size={30} className="ml-1" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="mb-3 w-90 rounded-xl shadow-2xl bg-background border border-border p-3 animate-in fade-in slide-in-from-bottom-4 relative mr-4 md:mr-6 lg:mr-8">
          <div className="flex flex-col items-center text-center gap-3">
            <a href={SHADCN_BLOCKS_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <Image src="/hero-images-container.png" alt="shadcn" width={300} height={200} />
            </a>
            <h3 className="font-bold text-lg flex items-center py-2 gap-2">
              <Rocket size={18} className="text-primary" />
              Unlock Premium Blocks
              <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-full shadow">Live</Badge>
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get access to exclusive premium blocks and dashboards for your next project. Elevate your UI instantly!
            </p>
            <div className="flex flex-row gap-2 w-full mt-2 justify-center">
              <div className="relative w-1/2">
                <a href={SHADCN_BLOCKS_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full flex items-center justify-center cursor-pointer" variant="default">
                    <Blocks size={16} />
                    Pro Blocks
                    <ArrowRight size={16} />
                  </Button>
                </a>
              </div>
              <div className="relative w-1/2">
                <Button className="w-full flex items-center justify-center" variant="default" disabled>
                  <LayoutDashboard size={16} />
                  Pro Dashboards
                </Button>
                <span className="absolute -top-5 -right-1">
                  <Badge variant="outline" className="bg-yellow-400 text-yellow-900 border-yellow-400 text-xs px-2 py-0.5 rounded-full shadow">Coming soon</Badge>
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
