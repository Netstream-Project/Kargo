import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Expo's built-in icon library
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function LookupScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- TOP APP BAR --- */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>KARGO</Text>
        <View style={styles.userAvatar}>
          <MaterialIcons name="person" size={20} color={theme.colors.primary} />
        </View>
      </View>

      {/* --- MAIN CONTENT (Centered) --- */}
      <View style={styles.mainContent}>
        
        {/* Hero Header */}
        <View style={styles.headerSection}>
          <Text style={styles.heroText}>LOOKUP</Text>
          <Text style={styles.heroText}>CONTAINER</Text>
          
          <View style={styles.subtitleRow}>
            <View style={styles.subtitleLine} />
            <Text style={styles.subtitleText}>GLOBAL LOGISTICS REGISTRY / REAL-TIME TELEMETRY</Text>
            <View style={styles.subtitleLine} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchInputContainer}>
            <MaterialIcons name="search" size={24} color={theme.colors.primary} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="ENTER CODE"
              placeholderTextColor="rgba(215, 228, 237, 0.6)" // on-surface-variant/60
            />
          </View>
         <TouchableOpacity 
         activeOpacity={0.8} 
         style={styles.locateButton}
         onPress={() => navigation.navigate('Inspection')} // <-- ADD THIS
       >
         <Text style={styles.locateButtonText}>LOCATE</Text>
       </TouchableOpacity>
        </View>

      </View>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <MaterialIcons name="search" size={24} color={theme.colors.primary} />
          <Text style={[styles.navText, styles.navTextActive]}>SEARCH</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Drafts')}
        > {/* <-- The '>' goes here now */}
          <MaterialIcons name="description" size={24} color="#64748b" /> {/* Slate-500 */}
          <Text style={styles.navText}>DRAFTS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="history" size={24} color="#64748b" />
          <Text style={styles.navText}>HISTORY</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface, // #09151b
  },
  
  // --- TOP BAR ---
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    zIndex: 40,
  },
  logoText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    color: theme.colors.primary, // #ffb3ac
    letterSpacing: -1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.surfaceHighest, // #2a363d
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(88, 65, 63, 0.2)', // outline-variant/20
  },

  // --- MAIN CONTENT ---
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80, // Leave room for bottom nav
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  heroText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 56, // Scales down slightly for mobile screens
    color: '#ff4d4d', // Specific bright red from mockup
    letterSpacing: -2,
    lineHeight: 56,
    textShadowColor: 'rgba(255, 77, 77, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 16,
  },
  subtitleLine: {
    height: 1,
    width: 32,
    backgroundColor: 'rgba(255, 179, 172, 0.3)', // primary/30
  },
  subtitleText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: 'rgba(224, 191, 188, 0.7)', // on-surface-variant/70
    letterSpacing: 4,
  },

  // --- SEARCH BAR ---
  searchWrapper: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: theme.colors.surfaceHigh,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceHighest,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: '#d7e4ed',
    textTransform: 'uppercase',
  },
  locateButton: {
    backgroundColor: '#ff4d4d', // Matches the hero text
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  locateButtonText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: '#680008', // on-primary
    letterSpacing: -0.5,
  },

  // --- BOTTOM NAV ---
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceLowest, // #041015
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: theme.colors.surfaceHighest, // #2a363d
  },
  navText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
    letterSpacing: 1.5,
  },
  navTextActive: {
    color: theme.colors.primary,
  }
});