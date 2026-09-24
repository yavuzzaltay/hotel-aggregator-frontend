'use client'

import React, { createContext, useContext, useState } from 'react'

export type DashboardThemeMode = 'editorial' | 'classic'

interface DashboardThemeContextType {
  mode: DashboardThemeMode
  setMode: (mode: DashboardThemeMode) => void
  toggleMode: () => void
  showDemoGuides: boolean
  setShowDemoGuides: (show: boolean) => void
  toggleDemoGuides: () => void
}

const DashboardThemeContext = createContext<DashboardThemeContextType | undefined>(undefined)

export function DashboardThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<DashboardThemeMode>('editorial')
  const [showDemoGuides, setShowDemoGuides] = useState<boolean>(true)

  const toggleMode = () => {
    setMode((prev) => (prev === 'editorial' ? 'classic' : 'editorial'))
  }

  const toggleDemoGuides = () => {
    setShowDemoGuides((prev) => !prev)
  }

  return (
    <DashboardThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        showDemoGuides,
        setShowDemoGuides,
        toggleDemoGuides,
      }}
    >
      {children}
    </DashboardThemeContext.Provider>
  )
}

export function useDashboardTheme() {
  const context = useContext(DashboardThemeContext)
  if (!context) {
    throw new Error('useDashboardTheme must be used within a DashboardThemeProvider')
  }
  return context
}
