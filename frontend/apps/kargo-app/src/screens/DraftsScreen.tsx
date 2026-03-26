import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';

// Mock data for the drafts based on your Stitch design
const draftItems = [
  { id: 'MSKU9128374', status: 'RE-INSPECT', time: '2 HOURS AGO', detail: 'SHIP: MAERSK INTEGRITY', border: theme.colors.primary, badgeBg: '#6e0009', badgeText: theme.colors.primary },
  { id: 'HLXU4402198', status: 'GATE 04', time: '4 HOURS AGO', detail: 'DRIVER: R. SULLIVAN', border: 'transparent', badgeBg: '#1f477b', badgeText: '#a7c8ff' },
  { id: 'CMAU8821033', status: 'FLAGGED', time: 'YESTERDAY', detail: 'SHIP: NORTH STAR', border: '#6e0009', badgeBg: '#93000a', badgeText: '#ffdad6' },
  { id: 'TGBU5510294', status: 'GATE 04', time: '2 DAYS AGO', detail: 'DRIVER: M. CHEN', border: 'transparent', badgeBg: '#1f477b', badgeText: '#a7c8ff' },
];

export default function DraftsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Background Watermark */}
      <View style={styles.watermarkContainer}>
        <Text style={styles.watermarkText}>KARGO</Text>
      </View>

      {/* --- TOP APP BAR --- */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="menu" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.logoText}>KARGO</Text>
        </View>
        <View style={styles.topBarSearch}>
          <MaterialIcons name="search" size={16} color={theme.colors.outlineVariant} />
          <Text style={styles.topBarSearchText}>ENTER CODE</Text>
        </View>
      </View>

      {/* --- SCROLLABLE MAIN CONTENT --- */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.heroText}>DRAFTS</Text>
          <Text style={styles.heroSubText}>8 PENDING INSPECTIONS</Text>
          <View style={styles.headerLine} />
        </View>

        {/* Drafts List */}
        <View style={styles.draftsContainer}>
          {draftItems.map((item, index) => (
            <TouchableOpacity activeOpacity={0.8} key={index} style={[styles.draftCard, { borderLeftColor: item.border }]}>
              
              <View style={styles.draftInfo}>
                <View style={styles.badgeRow}>
                  <View style={[styles.badge, { backgroundColor: item.badgeBg }]}>
                    <Text style={[styles.badgeText, { color: item.badgeText }]}>{item.status}</Text>
                  </View>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                
                <Text style={styles.draftId}>{item.id}</Text>
                <Text style={styles.draftDetail}>{item.detail}</Text>
              </View>

              <View style={styles.resumeButtonWrapper}>
                <LinearGradient
                  colors={[theme.colors.primary, theme.colors.primaryContainer]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={styles.resumeGradient}
                >
                  <Text style={styles.resumeText}>RESUME</Text>
                  <MaterialIcons name="arrow-forward" size={16} color="#680008" />
                </LinearGradient>
              </View>

            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Lookup')}>
          <MaterialIcons name="search" size={24} color={theme.colors.outlineVariant} />
          <Text style={styles.navText}>SEARCH</Text>
        </TouchableOpacity>
        
        {/* Active Tab */}
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <MaterialIcons name="edit-document" size={24} color={theme.colors.primary} />
          <Text style={[styles.navText, styles.navTextActive]}>DRAFTS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="history" size={24} color={theme.colors.outlineVariant} />
          <Text style={styles.navText}>HISTORY</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface }, // #09151b
  
  // WATERMARK
  watermarkContainer: { position: 'absolute', bottom: 100, right: -40, opacity: 0.05, zIndex: -1 },
  watermarkText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 180, color: '#ffffff' },

  // TOP BAR
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, zIndex: 10 },
  topBarLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuButton: { padding: 4 },
  logoText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, color: theme.colors.primary, letterSpacing: -1 },
  topBarSearch: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1a262c', paddingHorizontal: 12, paddingVertical: 6 },
  topBarSearchText: { fontFamily: 'Inter_700Bold', fontSize: 10, color: theme.colors.outlineVariant, letterSpacing: 2 },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 100, paddingTop: 16 },

  // HEADER
  headerSection: { marginBottom: 32 },
  heroText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 64, color: theme.colors.primary, letterSpacing: -2 },
  heroSubText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18, color: '#fd6e65', marginTop: 4, letterSpacing: -0.5 },
  headerLine: { width: 120, height: 4, backgroundColor: theme.colors.primary, marginTop: 16 },

  // DRAFTS LIST
  draftsContainer: { gap: 16 },
  draftCard: { flexDirection: 'column', backgroundColor: '#111d23', padding: 24, borderLeftWidth: 4, gap: 20 },
  draftInfo: { flex: 1 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  badge: { paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 2 },
  timeText: { fontFamily: 'Inter_700Bold', fontSize: 10, color: theme.colors.outlineVariant, letterSpacing: 2 },
  draftId: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 32, color: '#d7e4ed', letterSpacing: -1, marginBottom: 4 },
  draftDetail: { fontFamily: 'Inter_700Bold', fontSize: 12, color: '#a78a87', letterSpacing: 1 },
  
  resumeButtonWrapper: { alignSelf: 'flex-start' },
  resumeGradient: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 32, paddingVertical: 16 },
  resumeText: { fontFamily: 'Inter_700Bold', fontSize: 12, color: '#680008', letterSpacing: 2 },

  // BOTTOM NAV
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, flexDirection: 'row', backgroundColor: '#041015' },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 8 },
  navItemActive: { borderTopWidth: 2, borderTopColor: theme.colors.primaryContainer },
  navText: { fontFamily: 'Inter_700Bold', fontSize: 10, color: theme.colors.outlineVariant, marginTop: 4, letterSpacing: 1.5 },
  navTextActive: { color: theme.colors.primary }
});