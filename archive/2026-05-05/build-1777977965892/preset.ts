import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  
  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      _hover: {
        color: 'accent',
      },
    },
  },
  
  theme: {
    tokens: {
      colors: {
        // Neutral palette (warm taupe-sage, H:82°, S:6-8%)
        stone: {
          50: { value: '#F4F3EF' },
          100: { value: '#EBEAE4' },
          200: { value: '#D6D4CB' },
          300: { value: '#B9B7AD' },
          400: { value: '#9A9890' },
          500: { value: '#787670' },
          600: { value: '#585651' },
          700: { value: '#3C3B37' },
          800: { value: '#232220' },
          900: { value: '#111110' },
        },
        
        // Primary accent (muted spring green, H:90°, S:48-62%)
        green: {
          light: { value: '#ADBF9B' },
          base: { value: '#6A8F58' },
          dark: { value: '#4A6B3C' },
          glow: { value: '#6A8F5812' },
        },
        
        // Secondary accent (soft terracotta, H:24°, S:32%)
        amber: {
          base: { value: '#C0906F' },
          soft: { value: '#C0906F80' },
        },
      },
      
      spacing: {
        0: { value: '0px' },
        1: { value: '4px' },
        2: { value: '8px' },
        3: { value: '12px' },
        4: { value: '16px' },
        5: { value: '20px' },
        6: { value: '24px' },
        7: { value: '28px' },
        8: { value: '32px' },
        9: { value: '36px' },
        10: { value: '40px' },
        12: { value: '48px' },
        14: { value: '56px' },
        16: { value: '64px' },
        18: { value: '72px' },
        20: { value: '80px' },
        24: { value: '96px' },
      },
      
      fontWeights: {
        thin: { value: '100' },
        extralight: { value: '200' },
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
        extrabold: { value: '800' },
        black: { value: '900' },
      },
      
      lineHeights: {
        tight: { value: '1.00' },
        snug: { value: '1.15' },
        normal: { value: '1.55' },
        loose: { value: '1.75' },
      },
      
      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },
      
      radii: {
        none: { value: '0px' },
        sm: { value: '2px' },
        base: { value: '4px' },
        md: { value: '8px' },
        full: { value: '9999px' },
      },
    },
    
    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.stone.50}',
            _light: '{colors.stone.50}',
          },
        },
        
        'bg-secondary': {
          value: {
            base: '{colors.stone.100}',
            _light: '{colors.stone.100}',
          },
        },
        
        text: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.700}',
          },
        },
        
        'text-secondary': {
          value: {
            base: '{colors.stone.600}',
            _light: '{colors.stone.600}',
          },
        },
        
        'text-muted': {
          value: {
            base: '{colors.stone.500}',
            _light: '{colors.stone.500}',
          },
        },
        
        'text-disabled': {
          value: {
            base: '{colors.stone.400}',
            _light: '{colors.stone.400}',
          },
        },
        
        accent: {
          value: {
            base: '{colors.green.base}',
            _light: '{colors.green.base}',
          },
        },
        
        'accent-light': {
          value: {
            base: '{colors.green.light}',
            _light: '{colors.green.light}',
          },
        },
        
        'accent-dark': {
          value: {
            base: '{colors.green.dark}',
            _light: '{colors.green.dark}',
          },
        },
        
        'accent-glow': {
          value: {
            base: '{colors.green.glow}',
            _light: '{colors.green.glow}',
          },
        },
        
        border: {
          value: {
            base: '{colors.stone.200}',
            _light: '{colors.stone.200}',
          },
        },
        
        'border-strong': {
          value: {
            base: '{colors.stone.300}',
            _light: '{colors.stone.300}',
          },
        },
        
        'accent-secondary': {
          value: {
            base: '{colors.amber.soft}',
            _light: '{colors.amber.soft}',
          },
        },
      },
    },
  },
})