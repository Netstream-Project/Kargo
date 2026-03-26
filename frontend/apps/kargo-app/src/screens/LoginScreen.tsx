import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
// You will need to install expo-linear-gradient if you haven't already:
// npm install expo-linear-gradient -w kargo-app
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const [pin, setPin] = useState(['', '', '', '']);

  // Helper function to render the custom keypad based on the Stitch mockup
  const renderKey = (value: string, onPress?: () => void) => (
    <TouchableOpacity 
      style={styles.keypadButton} 
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.keypadText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Branding Shell (Architectural Anchor) */}
      <View style={styles.brandingSection}>
        <View style={styles.brandingBox}>
           <Text style={styles.heroHeadline}>KARGO</Text>
           <Text style={styles.heroSubhead}>Authorized personnel only.</Text>
           <View style={styles.decorationLineContainer}>
              <View style={[styles.decorationLine, { width: 64 }]} />
              <View style={[styles.decorationLine, { width: 24, opacity: 0.3 }]} />
           </View>
        </View>
      </View>

      {/* Main Login Canvas */}
      <View style={styles.loginCanvas}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.terminalLabel}>Terminal Access</Text>
          <Text style={styles.credentialTitle}>Enter Credentials</Text>
        </View>

        {/* PIN Input Dots */}
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <View key={index} style={styles.pinDotContainer}>
               <Text style={styles.pinDot}>{digit ? '*' : '•'}</Text>
            </View>
          ))}
        </View>

        {/* Numeric Keypad Grid */}
        <View style={styles.keypadGrid}>
           {renderKey('1')}
           {renderKey('2')}
           {renderKey('3')}
           {renderKey('4')}
           {renderKey('5')}
           {renderKey('6')}
           {renderKey('7')}
           {renderKey('8')}
           {renderKey('9')}
           {renderKey('⌫')} 
           {renderKey('0')}
           {renderKey('✓')} 
        </View>

        {/* Primary CTA with Gradient */}
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={styles.loginButtonWrapper}
          onPress={() => navigation.navigate('Lookup')} // <-- ADD IT HERE!
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>LOGIN →</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceLowest, // #041015 base
  },
  
  // --- BRANDING SECTION ---
  brandingSection: {
    padding: 32,
    paddingTop: 48,
    backgroundColor: theme.colors.surfaceLowest,
  },
  brandingBox: {
    backgroundColor: '#641613', // from Stitch tertiary-container
    padding: 32,
    // Emulating the shadow-2xl from Tailwind
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  heroHeadline: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 56,
    color: theme.colors.primary, 
    letterSpacing: -2,
    marginBottom: 16,
  },
  heroSubhead: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: theme.colors.primary,
    opacity: 0.9,
    marginBottom: 24,
  },
  decorationLineContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  decorationLine: {
    height: 2,
    backgroundColor: theme.colors.primary,
  },

  // --- LOGIN CANVAS ---
  loginCanvas: {
    flex: 1,
    backgroundColor: theme.colors.surface, // #09151b
    padding: 32,
    // "Ambient Shadow" from your design rules
    shadowColor: theme.colors.secondaryContainer,
    shadowOffset: { width: -40, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 60,
  },
  headerContainer: {
    marginBottom: 40,
  },
  terminalLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: theme.colors.primary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  credentialTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 32,
    color: theme.colors.onSecondary, // White text for headlines
    letterSpacing: -1,
  },

  // --- PIN DOTS ---
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  pinDotContainer: {
    width: 64,
    height: 64,
    backgroundColor: theme.colors.surfaceHigh, // #1a242a
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinDot: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    color: theme.colors.onSecondary,
  },

  // --- KEYPAD ---
  keypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
    alignSelf: 'center',
    width: 250, // Constrain to match the max-w-[280px] grid look
  },
  keypadButton: {
    width: 72,
    height: 60,
    backgroundColor: theme.colors.surfaceHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: theme.colors.onSecondary,
  },

  // --- CTA BUTTON ---
  loginButtonWrapper: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 24,
  },
  ctaGradient: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // 0px border radius
  },
  ctaText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
    color: theme.colors.surfaceLowest, // Contrasting text
    letterSpacing: 2,
  }
});