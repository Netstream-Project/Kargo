import React, { useState, useEffect } from 'react'; // 👉 ADDED: useEffect
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { theme } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native'; // 👉 CONSOLIDATED IMPORTS
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function LookupScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<any>(); // 👉 NEW: Get the route to listen for parameters
    
    // --- STATE ---
    const [showMenu, setShowMenu] = useState(false);
    
    // State for the search and dropdown
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);

    // 👉 NEW: State to control the success toast
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    // 👉 NEW: Listener for the 'showSuccessToast' parameter from InspectionScreen
    useEffect(() => {
      if (route.params?.showSuccessToast) {
        setShowSuccessToast(true);
        
        // Auto-hide the toast after 3 seconds
        setTimeout(() => setShowSuccessToast(false), 3000);
        
        // Clear the parameter so it doesn't show again unexpectedly
        navigation.setParams({ showSuccessToast: undefined });
      }
    }, [route.params?.showSuccessToast]);

    // Mock Database of Containers
    const mockContainers = [
      'KRG-44102', 'KPN-2982947', 'KRG-89211', 'KRG-33094', 
      'KRG-11200', 'KRG-77621', 'KRG-44209', 'KRG-55012'
    ];

    // Filter containers based on typing
    const filteredContainers = mockContainers.filter(container => 
      container.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Logout function
    const handleLogout = () => {
        setShowMenu(false);
        navigation.replace('Login'); 
    };

    // Handle tapping a recommendation
    const handleSelectContainer = (containerId: string) => {
      setSearchQuery(containerId);
      setShowSearchDropdown(false);
      Keyboard.dismiss();
      
      navigation.navigate('Inspection'); 
    };

  return (
    <SafeAreaView style={styles.container}>
      
      <Pressable 
        style={StyleSheet.absoluteFill} 
        onPress={() => { 
          setShowMenu(false); 
          setShowSearchDropdown(false); 
          Keyboard.dismiss(); 
        }} 
      />

      {/* 👉 NEW: SUCCESS TOAST UI */}
      {showSuccessToast && (
        <View style={styles.toastContainer}>
          <MaterialIcons name="check-circle" size={24} color="#4ade80" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.toastTitle}>INSPECTION SUBMITTED</Text>
            <Text style={styles.toastSubtitle}>Log synced with global registry.</Text>
          </View>
        </View>
      )}

      {/* --- TOP APP BAR --- */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>KARGO</Text>
        
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
                <TouchableOpacity style={styles.dropdownItem} onPress={() => { setShowMenu(false); }}>
                  <Text style={styles.dropdownText}>Settings</Text>
                </TouchableOpacity>
                
                <View style={styles.divider} />
                
                <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
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

        {/* Search Bar & Dropdown Container */}
        <View style={{ zIndex: 10, elevation: 10, width: '100%' }}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchInputContainer}>
              <MaterialIcons name="search" size={24} color={theme.colors.primary} style={styles.searchIcon} />
              
              <TextInput 
                style={styles.searchInput}
                placeholder="ENTER CODE"
                placeholderTextColor="rgba(215, 228, 237, 0.6)" 
                autoCapitalize="characters"
                autoCorrect={false}
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  setShowSearchDropdown(text.length > 0);
                }}
              />
              
              {/* 'X' Clear Button */}
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  onPress={() => {
                    setSearchQuery('');
                    setShowSearchDropdown(false);
                    Keyboard.dismiss();
                  }}
                  style={{ padding: 4, marginLeft: 8 }}
                >
                  <MaterialIcons name="cancel" size={20} color="#737780" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity 
              activeOpacity={0.8} 
              style={styles.locateButton}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('Inspection');
              }}
            >
              <Text style={styles.locateButtonText}>LOCATE</Text>
            </TouchableOpacity>
          </View>

          {/* THE RECOMMENDATIONS DROPDOWN */}
          {showSearchDropdown && filteredContainers.length > 0 && (
            <View style={styles.searchDropdownContainer}>
              {filteredContainers.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.searchDropdownItem, 
                    index === filteredContainers.length - 1 && { borderBottomWidth: 0 }
                  ]}
                  onPress={() => handleSelectContainer(item)}
                >
                  <MaterialIcons name="inventory" size={18} color="#ff4d4d" />
                  <Text style={styles.searchDropdownText}>{item}</Text>
                 <MaterialIcons name="chevron-right" size={20} color="#64748b" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
              ))}
            </View>
          )}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface, 
  },
  
  // 👉 NEW: TOAST STYLES
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 24,
    right: 24,
    backgroundColor: '#1c2e2a',
    borderColor: '#2e5c50',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    zIndex: 200,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  toastTitle: {
    color: '#4ade80',
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
  },
  toastSubtitle: {
    color: '#a7f3d0',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: 2,
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
    top: 50, 
    right: 0,
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: 8,
    padding: 8,
    minWidth: 140,
    borderWidth: 1,
    borderColor: 'rgba(88, 65, 63, 0.2)',
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
    color: '#d7e4ed', 
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

  // --- SEARCH DROPDOWN STYLES ---
  searchDropdownContainer: {
    position: 'absolute',
    top: 64, 
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surfaceHighest, 
    borderWidth: 1,
    borderColor: 'rgba(88, 65, 63, 0.2)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  searchDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(215, 228, 237, 0.05)',
  },
  searchDropdownText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
    color: '#d7e4ed',
    marginLeft: 12,
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