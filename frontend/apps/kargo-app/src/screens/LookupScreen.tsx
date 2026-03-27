import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function LookupScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    // State to manage the visibility of the profile menu
    const [showMenu, setShowMenu] = useState(false);

    // Logout function: Clears the menu and resets the stack to the Login screen
    const handleLogout = () => {
        setShowMenu(false);
        // Using replace() prevents the user from hitting the Android 'back' button to re-enter
        navigation.replace('Login'); 
    };

  return (
    // TouchableWithoutFeedback lets us tap anywhere else on the screen to close the menu
    <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
      <SafeAreaView style={styles.container}>
        
        {/* --- TOP APP BAR --- */}
        <View style={styles.topBar}>
          <Text style={styles.logoText}>KARGO</Text>
          
          {/* Profile Icon - wrapped to toggle the menu */}
          <View>
            <TouchableOpacity 
                style={styles.userAvatar}
                onPress={() => setShowMenu(!showMenu)}
            >
              <MaterialIcons name="person" size={20} color={theme.colors.primary} />
            </TouchableOpacity>

            {/* --- PROFILE DROPDOWN MENU --- */}
            {showMenu && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => { setShowMenu(false); /* Add Settings Nav here */ }}>
                    <Text style={styles.dropdownText}>Settings</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.divider} />
                  
                  <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
                    {/* Re-using your specific bright red for the logout text to match the alert vibe */}
                    <Text style={[styles.dropdownText, { color: '#ff4d4d' }]}>Log out</Text>
                  </TouchableOpacity>
                </View>
            )}
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
                placeholderTextColor="rgba(215, 228, 237, 0.6)" 
              />
            </View>
           <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.locateButton}
            onPress={() => navigation.navigate('Inspection')}
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
          > 
            <MaterialIcons name="description" size={24} color="#64748b" /> 
            <Text style={styles.navText}>DRAFTS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="history" size={24} color="#64748b" />
            <Text style={styles.navText}>HISTORY</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface, 
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
    color: theme.colors.primary, 
    letterSpacing: -1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.surfaceHighest, 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(88, 65, 63, 0.2)', 
  },

  // --- DROPDOWN MENU STYLES ---
  dropdownMenu: {
    position: 'absolute',
    top: 50, // Anchored just below the avatar
    right: 0,
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: 8,
    padding: 8,
    minWidth: 140,
    borderWidth: 1,
    borderColor: 'rgba(88, 65, 63, 0.2)',
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#d7e4ed', // Matches your search text color
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(215, 228, 237, 0.1)',
    marginVertical: 4,
  },

  // --- MAIN CONTENT ---
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80, 
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  heroText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 56, 
    color: '#ff4d4d', 
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
    backgroundColor: 'rgba(255, 179, 172, 0.3)', 
  },
  subtitleText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: 'rgba(224, 191, 188, 0.7)', 
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
    backgroundColor: '#ff4d4d', 
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  locateButtonText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: '#680008', 
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
    backgroundColor: theme.colors.surfaceLowest, 
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: theme.colors.surfaceHighest, 
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