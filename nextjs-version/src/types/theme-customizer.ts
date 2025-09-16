export interface ThemePreset {
  label?: string
  styles: {
    light: Record<string, string>
    dark: Record<string, string>
  }
}

export interface ColorTheme {
  name: string
  value: string
  preset: ThemePreset
}

export interface SidebarVariant {
  name: string
  value: "sidebar" | "floating" | "inset"
  description: string
}

export interface SidebarCollapsibleOption {
  name: string
  value: "offcanvas" | "icon" | "none"
  description: string
}

export interface SidebarSideOption {
  name: string
  value: "left" | "right"
}

export interface RadiusOption {
  name: string
  value: string
}

export interface BrandColor {
  name: string
  cssVar: string
}

export interface ImportedTheme {
  light: Record<string, string>
  dark: Record<string, string>
}
