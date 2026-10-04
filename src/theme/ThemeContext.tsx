import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { useDarkMode } from 'usehooks-ts'
import heIL from 'antd/locale/he_IL'
import { darkTokens, lightTokens } from './tokens'

export type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  toggleMode: () => void
}

const ThemeModeContext = createContext<ThemeContextValue | null>(null)

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const { isDarkMode, toggle } = useDarkMode()
  const mode: ThemeMode = isDarkMode ? 'dark' : 'light'

  // Component CSS files (src/theme/theme.css) key off this attribute.
  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  const value = useMemo<ThemeContextValue>(() => ({ mode, toggleMode: toggle }), [mode, toggle])

  return (
    <ThemeModeContext.Provider value={value}>
      <ConfigProvider
        direction="rtl"
        locale={heIL}
        theme={{
          algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: mode === 'dark' ? darkTokens : lightTokens,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeModeContext.Provider>
  )
}

export function useAppTheme() {
  const ctx = useContext(ThemeModeContext)
  if (!ctx) throw new Error('useAppTheme must be used within AppThemeProvider')
  return ctx
}
