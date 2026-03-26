import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function InspectionScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- TOP APP BAR (Fixed) --- */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="menu" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.logoText}>KARGO</Text>
        </View>
        <View style={styles.userAvatar}>
          <MaterialIcons name="person" size={20} color={theme.colors.primary} />
        </View>
      </View>

      {/* --- SCROLLABLE MAIN CONTENT --- */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Manifest Header */}
        <View style={styles.manifestSection}>
          <View>
            <Text style={styles.sectionOverline}>CONTAINER INSPECTION</Text>
            <Text style={styles.manifestId}>ID: MSKU9128374</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>STATUS</Text>
            <Text style={styles.statusValue}>IN-PROGRESS</Text>
          </View>
        </View>

        {/* Driver Logistics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>DRIVER LOGISTICS</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>FULL NAME</Text>
            <View style={styles.inputBox}><Text style={styles.inputText}>RICARDO VANCE</Text></View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>LICENSE NO.</Text>
            <View style={styles.inputBox}><Text style={styles.inputText}>TX-992-B-012</Text></View>
          </View>
          <TouchableOpacity style={styles.dashedButton}>
            <MaterialIcons name="add-a-photo" size={16} color={theme.colors.outlineVariant} />
            <Text style={styles.dashedButtonText}>ADD LICENSE IMAGE</Text>
          </TouchableOpacity>
        </View>

        {/* Suppliers List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SUPPLIERS LIST</Text>
          <Text style={styles.inputLabel}>AUTHORIZED PARTNERS & MANIFEST</Text>
          
          {/* Supplier Items */}
          {[
            { name: 'Global Star II', item: 'Steel Coils', qty: '12' },
            { name: 'Maersk Line', item: 'Engine Parts', qty: '45' },
            { name: 'Pacific Orion', item: 'Aluminium Ingots', qty: '08' }
          ].map((supplier, i) => (
            <View key={i} style={styles.supplierItem}>
              <View style={styles.supplierHeader}>
                <Text style={styles.supplierName}>{supplier.name}</Text>
                <MaterialIcons name="verified" size={16} color={theme.colors.primary} />
              </View>
              <View style={styles.supplierDetails}>
                <View>
                  <Text style={styles.inputLabel}>ITEM</Text>
                  <Text style={styles.supplierText}>{supplier.item}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.inputLabel}>QTY</Text>
                  <Text style={styles.supplierText}>{supplier.qty}</Text>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.dashedButtonText}>+ REGISTER NEW SUPPLIER</Text>
          </TouchableOpacity>
        </View>

        {/* Normal Container Images */}
        <View style={styles.imageSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>NORMAL CONTAINER</Text>
            <TouchableOpacity style={styles.addIconButton}>
              <MaterialIcons name="add" size={20} color={theme.colors.onPrimaryContainer} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageGrid}>
            <Image source={{ uri: 'https://picsum.photos/seed/kargo1/400/400' }} style={styles.gridImage} />
            <Image source={{ uri: 'https://picsum.photos/seed/kargo2/400/400' }} style={styles.gridImage} />
          </View>
        </View>

        {/* Full Container Placeholders */}
        <View style={styles.imageSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>FULL CONTAINER</Text>
            <TouchableOpacity style={styles.addIconButton}>
              <MaterialIcons name="add" size={20} color={theme.colors.onPrimaryContainer} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageGrid}>
            <View style={styles.dashedPlaceholder}><Text style={styles.dashedButtonText}>AWAITING ENTRY</Text></View>
            <View style={styles.dashedPlaceholder}><Text style={styles.dashedButtonText}>AWAITING ENTRY</Text></View>
          </View>
        </View>

        {/* Inventory Items */}
        <View style={styles.inventorySection}>
          <Text style={styles.inventoryOverline}>INVENTORY ITEMS</Text>
          
          <View style={styles.card}>
            <Text style={styles.inputLabel}>ITEM CATEGORY</Text>
            <View style={styles.dropdownFake}>
              <Text style={styles.inputText}>Interior Cargo</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.colors.outlineVariant} />
            </View>
            <TouchableOpacity style={styles.addEvidenceBtn}>
              <MaterialIcons name="add-a-photo" size={16} color={theme.colors.onSecondary} />
              <Text style={styles.addEvidenceText}>ADD EVIDENCE</Text>
            </TouchableOpacity>
            <View style={[styles.imageGrid, { marginTop: 16 }]}>
               <Image source={{ uri: 'https://picsum.photos/seed/kargo3/400/400' }} style={[styles.gridImage, { flex: 1 }]} />
               <Image source={{ uri: 'https://picsum.photos/seed/kargo4/400/400' }} style={[styles.gridImage, { flex: 1 }]} />
               <View style={[styles.dashedPlaceholder, { flex: 1 }]}><MaterialIcons name="add" size={20} color={theme.colors.outlineVariant} /></View>
            </View>
          </View>
          
          <View style={styles.card}>
             <Text style={styles.inputLabel}>ITEM CATEGORY</Text>
             <View style={styles.dropdownFake}>
              <Text style={styles.inputText}>Seal Verification</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.colors.outlineVariant} />
            </View>
            <TouchableOpacity style={styles.addEvidenceBtn}>
              <MaterialIcons name="add-a-photo" size={16} color={theme.colors.onSecondary} />
              <Text style={styles.addEvidenceText}>ADD EVIDENCE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Inspection Summary (Bottom of Scroll) */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Inspection Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Items</Text>
            <Text style={styles.summaryValue}>12 Packages</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Images</Text>
            <Text style={styles.summaryValue}>3 Evidence Captures</Text>
          </View>
          <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.summaryLabel}>Risk Level</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>LOW</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.submitWrapper}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryContainer]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.submitGradient}
            >
              <Text style={styles.submitText}>SUBMIT INSPECTION</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.saveDraftBtn}>
             <Text style={styles.saveDraftText}>SAVE DRAFT</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <MaterialIcons name="history" size={24} color={theme.colors.primary} />
          <Text style={[styles.navText, styles.navTextActive]}>DETAILS</Text>
        </TouchableOpacity>
        
        {/* 👉 ADDED onPress HERE */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Drafts')}>
          <MaterialIcons name="description" size={24} color="#64748b" />
          <Text style={styles.navText}>DRAFTS</Text>
        </TouchableOpacity>
        
        {/* 👉 ADDED onPress HERE TOO */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Lookup')}>
          <MaterialIcons name="search" size={24} color="#64748b" />
          <Text style={styles.navText}>SEARCH</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  
  // TOP BAR
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: theme.colors.surface, zIndex: 10 },
  topBarLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuButton: { padding: 4 },
  logoText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, color: theme.colors.primary, letterSpacing: -1 },
  userAvatar: { width: 40, height: 40, backgroundColor: theme.colors.surfaceHighest, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(88, 65, 63, 0.2)' },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 100, paddingTop: 16 },

  // MANIFEST HEADER
  manifestSection: { marginBottom: 32 },
  sectionOverline: { fontFamily: 'SpaceGrotesk_700Bold', color: theme.colors.primaryContainer, fontSize: 12, letterSpacing: 2, marginBottom: 8 },
  manifestId: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 40, color: '#d7e4ed', letterSpacing: -2, marginBottom: 16 },
  statusBox: { backgroundColor: theme.colors.surfaceHighest, padding: 16, alignItems: 'flex-end', alignSelf: 'stretch' },
  statusLabel: { fontFamily: 'Inter_700Bold', fontSize: 10, color: theme.colors.primary, opacity: 0.6, letterSpacing: 2 },
  statusValue: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18, color: theme.colors.primary },

  // CARDS (Surface Layering)
  card: { backgroundColor: theme.colors.surfaceLowest, padding: 24, marginBottom: 24 },
  cardTitle: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18, color: '#d7e4ed', borderLeftWidth: 4, borderLeftColor: theme.colors.primary, paddingLeft: 12, marginBottom: 24, letterSpacing: 1 },
  
  // INPUTS
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontFamily: 'Inter_700Bold', fontSize: 10, color: theme.colors.outlineVariant, letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' },
  inputBox: { backgroundColor: theme.colors.surfaceHigh, padding: 16 },
  inputText: { fontFamily: 'Inter_700Bold', fontSize: 14, color: '#d7e4ed' },
  
  dashedButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: theme.colors.outlineVariant, borderStyle: 'dashed', padding: 16, marginTop: 8 },
  dashedButtonText: { fontFamily: 'Inter_700Bold', fontSize: 10, color: theme.colors.outlineVariant, letterSpacing: 2 },

  // SUPPLIERS
  supplierItem: { backgroundColor: theme.colors.surfaceHigh, padding: 16, borderLeftWidth: 2, borderLeftColor: theme.colors.primary, marginBottom: 12 },
  supplierHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  supplierName: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 16, color: '#d7e4ed' },
  supplierDetails: { flexDirection: 'row', justifyContent: 'space-between' },
  supplierText: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#d7e4ed', marginTop: 4 },
  registerButton: { backgroundColor: 'rgba(42, 54, 61, 0.5)', padding: 16, alignItems: 'center', marginTop: 8 },

  // IMAGE SECTIONS
  imageSection: { marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingBottom: 12, marginBottom: 16 },
  sectionTitle: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 20, color: '#d7e4ed', letterSpacing: -0.5 },
  addIconButton: { backgroundColor: theme.colors.primary, padding: 8 },
  imageGrid: { flexDirection: 'row', gap: 12 },
  gridImage: { flex: 1, aspectRatio: 1, backgroundColor: theme.colors.surfaceLowest },
  dashedPlaceholder: { flex: 1, aspectRatio: 1, backgroundColor: theme.colors.surfaceLowest, borderWidth: 2, borderColor: theme.colors.outlineVariant, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },

  // INVENTORY
  inventorySection: { marginBottom: 32 },
  inventoryOverline: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 12, color: theme.colors.primary, letterSpacing: 3, borderBottomWidth: 1, borderBottomColor: theme.colors.primaryContainer, paddingBottom: 8, marginBottom: 16 },
  dropdownFake: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.surfaceHigh, padding: 16, marginBottom: 16 },
  addEvidenceBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: theme.colors.secondaryContainer, padding: 16 },
  addEvidenceText: { fontFamily: 'Inter_700Bold', fontSize: 10, color: theme.colors.onSecondary, letterSpacing: 2 },

  // SUMMARY BOX
  summaryBox: { backgroundColor: theme.colors.surfaceLowest, padding: 24, marginTop: 16 },
  summaryTitle: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18, color: '#d7e4ed', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant },
  summaryLabel: { fontFamily: 'Inter_400Regular', fontSize: 14, color: theme.colors.outlineVariant },
  summaryValue: { fontFamily: 'Inter_700Bold', fontSize: 14, color: '#d7e4ed' },
  
  submitWrapper: { marginTop: 24, marginBottom: 12 },
  submitGradient: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  submitText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 16, color: theme.colors.surfaceLowest, letterSpacing: 2 },
  saveDraftBtn: { padding: 16, alignItems: 'center', borderWidth: 1, borderColor: theme.colors.outlineVariant },
  saveDraftText: { fontFamily: 'Inter_700Bold', fontSize: 12, color: theme.colors.outlineVariant, letterSpacing: 2 },

  // BOTTOM NAV
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, flexDirection: 'row', backgroundColor: '#041015',zIndex: 50, elevation: 50 },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navItemActive: { backgroundColor: theme.colors.surfaceHighest },
  navText: { fontFamily: 'Inter_700Bold', fontSize: 10, color: '#64748b', marginTop: 4, letterSpacing: 1.5 },
  navTextActive: { color: theme.colors.primary }
});