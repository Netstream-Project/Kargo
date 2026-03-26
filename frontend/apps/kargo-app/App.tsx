import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';
import LookupScreen from './src/screens/LookupScreen';
// Font Imports
import { 
  useFonts as useSpaceGrotesk, 
  SpaceGrotesk_400Regular, 
  SpaceGrotesk_700Bold 
} from '@expo-google-fonts/space-grotesk';
import { 
  useFonts as useInter, 
  Inter_400Regular, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';

// Theme Import
import { theme } from './src/theme';

// Keep the splash screen visible while fonts fetch
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [spaceGroteskLoaded] = useSpaceGrotesk({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_700Bold,
  });

  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    if (spaceGroteskLoaded && interLoaded) {
      SplashScreen.hideAsync();
    }
  }, [spaceGroteskLoaded, interLoaded]);

  if (!spaceGroteskLoaded || !interLoaded) {
    return null; // App waits here until fonts are ready
  }

 return (
    <>
      <AppNavigator />
      <StatusBar style="light" /> 
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceLowest,
    justifyContent: 'center',
    alignItems: 'flex-start', // Anchored to the left
    // Asymmetrical margins translated to React Native padding (approx 5.5rem left, 1.75rem right)
    paddingLeft: 88,  
    paddingRight: 28,
  },
  architecturalAnchor: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 36,
    color: theme.colors.onPrimaryContainer, // Oxblood red for high-alert/focus
    letterSpacing: -0.72, // -2% letter spacing for display-lg
    marginBottom: 12,
  },
  logisticsData: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: theme.colors.onSecondary,
    letterSpacing: 0.5,
  },
});