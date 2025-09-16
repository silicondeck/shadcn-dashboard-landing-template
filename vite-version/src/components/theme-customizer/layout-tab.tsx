"use client"

import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useSidebarConfig } from '@/contexts/sidebar-context'
import { useSidebar } from '@/components/ui/sidebar'
import { sidebarVariants, sidebarCollapsibleOptions, sidebarSideOptions } from '@/config/theme-customizer-constants'

export function LayoutTab() {
  const { config: sidebarConfig, updateConfig: updateSidebarConfig } = useSidebarConfig()
  const { toggleSidebar, state: sidebarState } = useSidebar()

  // Sidebar handler functions
  const handleSidebarVariantSelect = (variant: "sidebar" | "floating" | "inset") => {
    updateSidebarConfig({ variant })
  }

  const handleSidebarCollapsibleSelect = (collapsible: "offcanvas" | "icon" | "none") => {
    updateSidebarConfig({ collapsible })
    
    // If switching to icon mode and sidebar is currently expanded, auto-collapse it
    if (collapsible === "icon" && sidebarState === "expanded") {
      toggleSidebar()
    }
  }

  const handleSidebarSideSelect = (side: "left" | "right") => {
    updateSidebarConfig({ side })
  }

  return (
    <div className="p-4 space-y-6">
      {/* Sidebar Configuration */}
      <div className="space-y-3">
        {/* Sidebar Variant */}
        <div>
          <Label className="text-sm font-medium">Sidebar Variant</Label>
          {sidebarConfig.variant && (
            <p className="text-xs text-muted-foreground mt-1">
              {sidebarConfig.variant === "sidebar" && "Default: Standard sidebar layout"}
              {sidebarConfig.variant === "floating" && "Floating: Floating sidebar with border"}
              {sidebarConfig.variant === "inset" && "Inset: Inset sidebar with rounded corners"}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {sidebarVariants.map((variant) => (
            <div
              key={variant.value}
              className={`relative p-4 border rounded-md cursor-pointer transition-colors ${
                sidebarConfig.variant === variant.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-border/60"
              }`}
              onClick={() => handleSidebarVariantSelect(variant.value as "sidebar" | "floating" | "inset")}
            >
              {/* Visual representation of sidebar variant */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-center">{variant.name}</div>
                <div className={`flex h-12 rounded border ${ variant.value === "inset" ? "bg-muted" : "bg-background" }`}>
                  {/* Sidebar representation - smaller and more proportional */}
                  <div 
                    className={`w-3 flex-shrink-0 bg-muted flex flex-col gap-0.5 p-1 ${
                      variant.value === "floating" ? "border-r m-1 rounded" :
                      variant.value === "inset" ? "m-1 ms-0 rounded bg-muted/80" :
                      "border-r"
                    }`}
                  >
                    {/* Menu icon representations - clearer and more visible */}
                    <div className="h-0.5 w-full bg-foreground/60 rounded"></div>
                    <div className="h-0.5 w-3/4 bg-foreground/50 rounded"></div>
                    <div className="h-0.5 w-2/3 bg-foreground/40 rounded"></div>
                    <div className="h-0.5 w-3/4 bg-foreground/30 rounded"></div>
                  </div>
                  {/* Main content area - larger and more prominent */}
                  <div className={`flex-1 ${ variant.value === "inset" ? "bg-background ms-0" : "bg-background/50" } m-1 rounded-sm border-dashed border border-muted-foreground/20`}>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />

      {/* Sidebar Collapsible Mode */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">Sidebar Collapsible Mode</Label>
          {sidebarConfig.collapsible && (
            <p className="text-xs text-muted-foreground mt-1">
              {sidebarConfig.collapsible === "offcanvas" && "Off Canvas: Slides out of view"}
              {sidebarConfig.collapsible === "icon" && "Icon: Collapses to icon only"}
              {sidebarConfig.collapsible === "none" && "None: Always visible"}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {sidebarCollapsibleOptions.map((option) => (
            <div
              key={option.value}
              className={`relative p-4 border rounded-md cursor-pointer transition-colors ${
                sidebarConfig.collapsible === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-border/60"
              }`}
              onClick={() => handleSidebarCollapsibleSelect(option.value as "offcanvas" | "icon" | "none")}
            >
              {/* Visual representation of collapsible mode */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-center">{option.name}</div>
                <div className="flex h-12 rounded border bg-background">
                  {/* Sidebar representation based on collapsible mode */}
                  {option.value === "offcanvas" ? (
                    // Off-canvas: Show collapsed state with hamburger menu
                    <div className="flex-1 bg-background/50 m-1 rounded-sm border-dashed border border-muted-foreground/20 flex items-center justify-start pl-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="w-3 h-0.5 bg-foreground/60 rounded"></div>
                        <div className="w-3 h-0.5 bg-foreground/60 rounded"></div>
                        <div className="w-3 h-0.5 bg-foreground/60 rounded"></div>
                      </div>
                    </div>
                  ) : option.value === "icon" ? (
                    // Icon mode: Show thin icon sidebar with clear icons
                    <>
                      <div className="w-4 flex-shrink-0 bg-muted flex flex-col gap-1 p-1 border-r items-center">
                        <div className="w-2 h-2 bg-foreground/60 rounded-sm"></div>
                        <div className="w-2 h-2 bg-foreground/40 rounded-sm"></div>
                        <div className="w-2 h-2 bg-foreground/30 rounded-sm"></div>
                      </div>
                      <div className="flex-1 bg-background/50 m-1 rounded-sm border-dashed border border-muted-foreground/20"></div>
                    </>
                  ) : (
                    // None: Always show full sidebar - more proportional
                    <>
                      <div className="w-6 flex-shrink-0 bg-muted flex flex-col gap-0.5 p-1 border-r">
                        <div className="h-0.5 w-full bg-foreground/60 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-foreground/50 rounded"></div>
                        <div className="h-0.5 w-2/3 bg-foreground/40 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-foreground/30 rounded"></div>
                      </div>
                      <div className="flex-1 bg-background/50 m-1 rounded-sm border-dashed border border-muted-foreground/20"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sidebar Side */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">Sidebar Position</Label>
          {sidebarConfig.side && (
            <p className="text-xs text-muted-foreground mt-1">
              {sidebarConfig.side === "left" && "Left: Sidebar positioned on the left side"}
              {sidebarConfig.side === "right" && "Right: Sidebar positioned on the right side"}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {sidebarSideOptions.map((side) => (
            <div
              key={side.value}
              className={`relative p-4 border rounded-md cursor-pointer transition-colors ${
                sidebarConfig.side === side.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-border/60"
              }`}
              onClick={() => handleSidebarSideSelect(side.value as "left" | "right")}
            >
              {/* Visual representation of sidebar side */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-center">{side.name}</div>
                <div className="flex h-12 rounded border bg-background">
                  {side.value === "left" ? (
                    // Left sidebar layout - more proportional
                    <>
                      <div className="w-6 flex-shrink-0 bg-muted flex flex-col gap-0.5 p-1 border-r">
                        <div className="h-0.5 w-full bg-foreground/60 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-foreground/50 rounded"></div>
                        <div className="h-0.5 w-2/3 bg-foreground/40 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-foreground/30 rounded"></div>
                      </div>
                      <div className="flex-1 bg-background/50 m-1 rounded-sm border-dashed border border-muted-foreground/20"></div>
                    </>
                  ) : (
                    // Right sidebar layout - more proportional
                    <>
                      <div className="flex-1 bg-background/50 m-1 rounded-sm border-dashed border border-muted-foreground/20"></div>
                      <div className="w-6 flex-shrink-0 bg-muted flex flex-col gap-0.5 p-1 border-l">
                        <div className="h-0.5 w-full bg-foreground/60 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-foreground/50 rounded"></div>
                        <div className="h-0.5 w-2/3 bg-foreground/40 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-foreground/30 rounded"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
