// frontend/apps/kargo-app/src/theme/index.ts

export const theme = {
  colors: {
    // Carbon Tones (Surface Stacking)
    surfaceLowest: '#041015', // Deepest background / recessed gutters
    surface: '#09151b',       // Content base
    surfaceHigh: '#1a242a',   // Mid-tier lift (inferred for hover/active states)
    surfaceHighest: '#2a363d', // Most prominent interactive modules
    
    // Industrial Accents
    primary: '#ffb3ac',       // Oxblood light
    primaryContainer: '#6e0009', // Oxblood deep
    onPrimaryContainer: '#ffb3ac', 
    
    // Architectural Blue
    secondaryContainer: '#1f477b', 
    onSecondary: '#ffffff',
    
    // Ghost Border Fallback (15% opacity applied later in styles)
    outlineVariant: '#58413f',
  },
  
  typography: {
    display: 'SpaceGrotesk', // Massive, structural anchors
    body: 'Inter',           // Precision logistics data
    letterSpacing: {
      tight: -2,             // For display-lg and headline-lg
    }
  },

  layout: {
    // The "Industrial Precision" rule: Never use border-radius
    radius: 0, 
    // The "No-Line" rule: No 1px borders, rely on gaps
    listGap: 16, // roughly 0.4rem scaled for mobile
  },
  
  shadows: {
    // Ambient floating effect using the secondary container color
    floating: {
      shadowColor: '#1f477b',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 20, // Approximating the 40-60px blur
      elevation: 5,     // Android fallback
    }
  }
};