"use client"

import React from 'react'
import { Palette, RotateCcw, Settings, X, Dices, Upload, ExternalLink, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useThemeManager } from '@/hooks/use-theme-manager'
import { useCircularTransition } from '@/hooks/use-circular-transition'
import { colorThemes, tweakcnThemes } from '@/config/theme-data'
import { radiusOptions, baseColors } from '@/config/theme-customizer-constants'
import { ColorPicker } from '@/components/color-picker'
import { ImportModal } from '@/components/theme-customizer/import-modal'
import { cn } from '@/lib/utils'
import type { ImportedTheme } from '@/types/theme-customizer'
import "@/components/theme-customizer/circular-transition.css"

interface LandingThemeCustomizerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LandingThemeCustomizer({ open, onOpenChange }: LandingThemeCustomizerProps) {
  const {
    applyImportedTheme,
    isDarkMode,
    resetTheme,
    applyRadius,
    setBrandColorsValues,
    applyTheme,
    applyTweakcnTheme,
    brandColorsValues,
    handleColorChange
  } = useThemeManager()

  const { toggleTheme } = useCircularTransition()

  const [selectedTheme, setSelectedTheme] = React.useState("default")
  const [selectedTweakcnTheme, setSelectedTweakcnTheme] = React.useState("")
  const [selectedRadius, setSelectedRadius] = React.useState("0.5rem")
  const [importModalOpen, setImportModalOpen] = React.useState(false)
  const [importedTheme, setImportedTheme] = React.useState<ImportedTheme | null>(null)

  const handleReset = () => {
    // Reset all state variables to initial values
    setSelectedTheme("")
    setSelectedTweakcnTheme("")
    setSelectedRadius("0.5rem")
    setImportedTheme(null)
    setBrandColorsValues({})

    // Reset theme and radius to defaults
    resetTheme()
    applyRadius("0.5rem")
  }

  const handleImport = (themeData: ImportedTheme) => {
    setImportedTheme(themeData)
    // Clear other selections to indicate custom import is active
    setSelectedTheme("")
    setSelectedTweakcnTheme("")

    // Apply the imported theme
    applyImportedTheme(themeData, isDarkMode)
  }

  const handleImportClick = () => {
    setImportModalOpen(true)
  }

  const handleRandomShadcn = () => {
    // Apply a random shadcn theme
    const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)]
    setSelectedTheme(randomTheme.value)
    setSelectedTweakcnTheme("")
    setBrandColorsValues({})
    setImportedTheme(null)
    applyTheme(randomTheme.value, isDarkMode)
  }

  const handleRandomTweakcn = () => {
    // Apply a random tweakcn theme
    const randomTheme = tweakcnThemes[Math.floor(Math.random() * tweakcnThemes.length)]
    setSelectedTweakcnTheme(randomTheme.value)
    setSelectedTheme("")
    setBrandColorsValues({})
    setImportedTheme(null)
    applyTweakcnTheme(randomTheme.preset, isDarkMode)
  }

  const handleRadiusSelect = (radius: string) => {
    setSelectedRadius(radius)
    applyRadius(radius)
  }

  const handleLightMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === false) return
    toggleTheme(event)
  }

  const handleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === true) return
    toggleTheme(event)
  }

  // Re-apply themes when theme mode changes
  React.useEffect(() => {
    if (importedTheme) {
      applyImportedTheme(importedTheme, isDarkMode)
    } else if (selectedTheme) {
      applyTheme(selectedTheme, isDarkMode)
    } else if (selectedTweakcnTheme) {
      const selectedPreset = tweakcnThemes.find(t => t.value === selectedTweakcnTheme)?.preset
      if (selectedPreset) {
        applyTweakcnTheme(selectedPreset, isDarkMode)
      }
    }
  }, [isDarkMode, importedTheme, selectedTheme, selectedTweakcnTheme, applyImportedTheme, applyTheme, applyTweakcnTheme])

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
        <SheetContent
          side="right"
          className="w-[400px] p-0 gap-0 pointer-events-auto [&>button]:hidden overflow-hidden flex flex-col"
          onInteractOutside={(e) => {
            // Prevent the sheet from closing when dialog is open
            if (importModalOpen) {
              e.preventDefault()
            }
          }}
        >
          <SheetHeader className="space-y-0 p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-4 w-4" />
              </div>
              <SheetTitle className="text-lg font-semibold">Theme Customizer</SheetTitle>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handleReset} className="cursor-pointer h-8 w-8">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => onOpenChange(false)} className="cursor-pointer h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <SheetDescription className="text-sm text-muted-foreground">
              Customize the theme and colors of your landing page.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Mode Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Mode</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={!isDarkMode ? "secondary" : "outline"}
                  size="sm"
                  onClick={handleLightMode}
                  className="cursor-pointer mode-toggle-button relative overflow-hidden"
                >
                  <Sun className="h-4 w-4 mr-1 transition-transform duration-300" />
                  Light
                </Button>
                <Button
                  variant={isDarkMode ? "secondary" : "outline"}
                  size="sm"
                  onClick={handleDarkMode}
                  className="cursor-pointer mode-toggle-button relative overflow-hidden"
                >
                  <Moon className="h-4 w-4 mr-1 transition-transform duration-300" />
                  Dark
                </Button>
              </div>
            </div>

            <Separator />

            {/* Shadcn UI Theme Presets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Shadcn UI Theme Presets</Label>
                <Button variant="outline" size="sm" onClick={handleRandomShadcn} className="cursor-pointer">
                  <Dices className="h-3.5 w-3.5 mr-1.5" />
                  Random
                </Button>
              </div>

              <Select value={selectedTheme} onValueChange={(value) => {
                setSelectedTheme(value)
                setSelectedTweakcnTheme("")
                setBrandColorsValues({})
                setImportedTheme(null)
                applyTheme(value, isDarkMode)
              }}>
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Choose Shadcn Theme" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <div className="p-2">
                    {colorThemes.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value} className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.primary }}
                            />
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.secondary }}
                            />
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.accent }}
                            />
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.muted }}
                            />
                          </div>
                          <span>{theme.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Tweakcn Theme Presets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Tweakcn Theme Presets</Label>
                <Button variant="outline" size="sm" onClick={handleRandomTweakcn} className="cursor-pointer">
                  <Dices className="h-3.5 w-3.5 mr-1.5" />
                  Random
                </Button>
              </div>

              <Select value={selectedTweakcnTheme} onValueChange={(value) => {
                setSelectedTweakcnTheme(value)
                setSelectedTheme("")
                setBrandColorsValues({})
                setImportedTheme(null)
                const selectedPreset = tweakcnThemes.find(t => t.value === value)?.preset
                if (selectedPreset) {
                  applyTweakcnTheme(selectedPreset, isDarkMode)
                }
              }}>
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Choose Tweakcn Theme" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <div className="p-2">
                    {tweakcnThemes.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value} className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.primary }}
                            />
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.secondary }}
                            />
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.accent }}
                            />
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.muted }}
                            />
                          </div>
                          <span>{theme.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Radius Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Radius</Label>
              <div className="grid grid-cols-5 gap-2">
                {radiusOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`relative cursor-pointer rounded-md p-3 border transition-colors ${
                      selectedRadius === option.value
                        ? "border-primary"
                        : "border-border hover:border-border/60"
                    }`}
                    onClick={() => handleRadiusSelect(option.value)}
                  >
                    <div className="text-center">
                      <div className="text-xs font-medium">{option.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Import Theme Button */}
            <div className="space-y-3">
              <Button
                variant="outline"
                size="lg"
                onClick={handleImportClick}
                className="w-full cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                Import Theme
              </Button>
            </div>

            {/* Brand Colors Section */}
            <Accordion type="single" collapsible className="w-full border-b rounded-lg">
              <AccordionItem value="brand-colors" className="border border-border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors">
                  <Label className="text-sm font-medium cursor-pointer">Brand Colors</Label>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2 space-y-3 border-t border-border bg-muted/20">
                  {baseColors.map((color) => (
                    <div key={color.cssVar} className="flex items-center justify-between">
                      <ColorPicker
                        label={color.name}
                        cssVar={color.cssVar}
                        value={brandColorsValues[color.cssVar] || ""}
                        onChange={handleColorChange}
                      />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Tweakcn */}
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Advanced Customization</span>
              </div>
              <p className="text-xs text-muted-foreground">
                For advanced theme customization with real-time preview, visual color picker, and hundreds of prebuilt themes, visit{" "}
                <a
                  href="https://tweakcn.com/editor/theme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium cursor-pointer"
                >
                  tweakcn.com
                </a>
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full cursor-pointer"
                onClick={() => window.open('https://tweakcn.com/editor/theme', '_blank')}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Open Tweakcn
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <ImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImport}
      />
    </>
  )
}

// Floating trigger button for landing page
export function LandingThemeCustomizerTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        "fixed top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer right-4"
      )}
    >
      <Settings className="h-5 w-5" />
    </Button>
  )
}
