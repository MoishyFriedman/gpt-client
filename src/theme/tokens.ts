import type { ThemeConfig } from 'antd'

// Colors extracted from the "Main Glow" Figma file (node 309:17394).
export const brand = {
  teal: '#13BBD1',
}

export const lightTokens: ThemeConfig['token'] = {
  colorPrimary: brand.teal,
  colorLink: brand.teal,
  colorBgLayout: '#F8FAFD',
  colorBgContainer: '#FFFFFF',
  colorBorder: '#D9D9D9',
  colorBorderSecondary: '#F0F0F0',
  colorText: 'rgba(0, 0, 0, 0.88)',
  colorTextSecondary: 'rgba(0, 0, 0, 0.45)',
  colorTextTertiary: 'rgba(0, 0, 0, 0.25)',
  colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
  borderRadius: 8,
  fontFamily: "'Heebo', system-ui, sans-serif",
}

export const darkTokens: ThemeConfig['token'] = {
  colorPrimary: brand.teal,
  colorLink: brand.teal,
  colorBgLayout: '#141414',
  colorBgContainer: '#1F1F1F',
  colorBorder: '#434343',
  colorBorderSecondary: '#262626',
  colorText: 'rgba(255, 255, 255, 0.88)',
  colorTextSecondary: 'rgba(255, 255, 255, 0.45)',
  colorTextTertiary: 'rgba(255, 255, 255, 0.25)',
  colorFillTertiary: 'rgba(255, 255, 255, 0.04)',
  borderRadius: 8,
  fontFamily: "'Heebo', system-ui, sans-serif",
}

