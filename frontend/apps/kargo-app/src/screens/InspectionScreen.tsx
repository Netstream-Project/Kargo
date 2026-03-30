import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function InspectionScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleFinalize = () => {
      setShowSuccessModal(false);
      // 👉 This takes them back to Search and triggers the green "Sync" toast!
      navigation.navigate('Lookup', { showSuccessToast: true } as any);
    };

    // --- STATE MANAGEMENT ---
    const [fullName, setFullName] = useState('');
    const [licenseNo, setLicenseNo] = useState('');

    const [licenseImage, setLicenseImage] = useState<string | null>(null);
    const [normalContainerImages, setNormalContainerImages] = useState<(string | null)[]>([null, null]);
    const [fullContainerImages, setFullContainerImages] = useState<(string | null)[]>([null, null]);
    
    const [inventoryEvidence1, setInventoryEvidence1] = useState<string[]>([]);
    const [inventoryEvidence2, setInventoryEvidence2] = useState<string[]>([]);

    const [isInventory1Expanded, setIsInventory1Expanded] = useState(false);
    const [isInventory2Expanded, setIsInventory2Expanded] = useState(false);

    // 👉 NEW: E-Signature State
    const [isSigned, setIsSigned] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // --- NAVIGATION HANDLERS ---
    const handleSubmitInspection = () => {
      if (!isSigned) {
        Alert.alert("Signature Required", "Please provide an authorization signature before submitting.");
        return;
      }
      setShowSuccessModal(true);
    };
    

    // 👉 NEW: Saves to draft and goes to Drafts screen with new data
    const handleSaveDraft = () => {
      const newDraftData = {
        id: `KRG-${Math.floor(10000 + Math.random() * 90000)}`,
        ship: fullName ? `DRIVER: ${fullName.toUpperCase()}` : 'PENDING DRIVER INFO',
        time: 'JUST NOW',
        type: 'IN PROGRESS'
      };
      navigation.navigate('Drafts', { newDraft: newDraftData } as any);
    };

    // --- IMAGE PICKER ---
    const pickImage = async (callback: (uri: string) => void) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You've refused permission to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, 
            quality: 0.8,
        });

        if (!result.canceled) {
            callback(result.assets[0].uri);
        }
    };

    const updateImageArray = (setter: React.Dispatch<React.SetStateAction<(string | null)[]>>, index: number, uri: string) => {
        setter(prev => {
            const newArr = [...prev];
            newArr[index] = uri;
            return newArr;
        });
    };

    // --- DYNAMIC ADD & REPLACE LOGIC ---
    const handleAddDynamicEvidence = (setEvidenceArray: React.Dispatch<React.SetStateAction<string[]>>) => {
        pickImage((uri) => {
            setEvidenceArray(prev => [...prev, uri]);
        });
    };

    const handleReplaceDynamicEvidence = (setEvidenceArray: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
        pickImage((uri) => {
            setEvidenceArray(prev => {
                const newArr = [...prev];
                newArr[index] = uri;
                return newArr;
            });
        });
    };

    // --- GRID RENDERER FOR INVENTORY ---
    const renderInventoryGrid = (evidenceArray: string[], setEvidenceArray: React.Dispatch<React.SetStateAction<string[]>>) => {
        const placeholdersCount = Math.max(3 - evidenceArray.length, (3 - (evidenceArray.length % 3)) % 3);
        const gridItems = [...evidenceArray, ...Array(placeholdersCount).fill(null)];

        return (
            <View style={[styles.imageGrid, { marginTop: 16 }]}>
                {gridItems.map((uri, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.gridImageContainer} 
                        onPress={() => {
                            if (uri) {
                                handleReplaceDynamicEvidence(setEvidenceArray, index);
                            } else {
                                handleAddDynamicEvidence(setEvidenceArray);
                            }
                        }}
                    >
                        {uri ? (
                            <Image source={{ uri }} style={styles.gridImage} />
                        ) : (
                            <View style={styles.dashedPlaceholder}>
                                <MaterialIcons name="add" size={20} color={theme.colors.outlineVariant} />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- TOP APP BAR --- */}
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
            <TextInput 
              style={styles.textInput}
              placeholder="ENTER DRIVER NAME"
              placeholderTextColor={theme.colors.outlineVariant}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>LICENSE NO.</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="ENTER LICENSE NUMBER"
              placeholderTextColor={theme.colors.outlineVariant}
              value={licenseNo}
              onChangeText={setLicenseNo}
              autoCapitalize="characters"
            />
          </View>

          <TouchableOpacity 
            style={licenseImage ? styles.imageContainer : styles.dashedButton}
            onPress={() => pickImage(setLicenseImage)}
          >
            {licenseImage ? (
                <Image source={{ uri: licenseImage }} style={styles.fullWidthImage} />
            ) : (
                <>
                    <MaterialIcons name="add-a-photo" size={16} color={theme.colors.outlineVariant} />
                    <Text style={styles.dashedButtonText}>ADD LICENSE IMAGE</Text>
                </>
            )}
          </TouchableOpacity>
        </View>

        {/* Suppliers List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>CONTAINERS LIST</Text>
          <Text style={styles.inputLabel}>AUTHORIZED PARTNERS & MANIFEST</Text>
          
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
          </View>
          <View style={styles.imageGrid}>
            {[0, 1].map((index) => (
                <TouchableOpacity key={`normal-${index}`} style={styles.gridImageContainer} onPress={() => pickImage((uri) => updateImageArray(setNormalContainerImages, index, uri))}>
                    {normalContainerImages[index] ? (
                        <Image source={{ uri: normalContainerImages[index]! }} style={styles.gridImage} />
                    ) : (
                        <View style={styles.dashedPlaceholder}><MaterialIcons name="add" size={24} color={theme.colors.outlineVariant} /></View>
                    )}
                </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Full Container Images */}
        <View style={styles.imageSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>FULL CONTAINER</Text>
          </View>
          <View style={styles.imageGrid}>
             {[0, 1].map((index) => (
                <TouchableOpacity key={`full-${index}`} style={styles.gridImageContainer} onPress={() => pickImage((uri) => updateImageArray(setFullContainerImages, index, uri))}>
                    {fullContainerImages[index] ? (
                        <Image source={{ uri: fullContainerImages[index]! }} style={styles.gridImage} />
                    ) : (
                        <View style={styles.dashedPlaceholder}><Text style={styles.dashedButtonText}>AWAITING ENTRY</Text></View>
                    )}
                </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- INVENTORY ITEMS --- */}
        <View style={styles.inventorySection}>
          <Text style={styles.inventoryOverline}>INVENTORY ITEMS</Text>
          
          <View style={styles.card}>
            <Text style={styles.inputLabel}>ITEM CATEGORY</Text>
            <TouchableOpacity 
              style={styles.dropdownFake} 
              activeOpacity={0.7}
              onPress={() => setIsInventory1Expanded(!isInventory1Expanded)}
            >
              <Text style={styles.inputText}>Interior Cargo</Text>
              <MaterialIcons name={isInventory1Expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color={theme.colors.outlineVariant} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addEvidenceBtn} onPress={() => handleAddDynamicEvidence(setInventoryEvidence1)}>
              <MaterialIcons name="add-a-photo" size={16} color={theme.colors.onSecondary} />
              <Text style={styles.addEvidenceText}>ADD EVIDENCE</Text>
            </TouchableOpacity>
            {isInventory1Expanded && renderInventoryGrid(inventoryEvidence1, setInventoryEvidence1)}
          </View>
          
          <View style={styles.card}>
             <Text style={styles.inputLabel}>ITEM CATEGORY</Text>
             <TouchableOpacity 
               style={styles.dropdownFake}
               activeOpacity={0.7}
               onPress={() => setIsInventory2Expanded(!isInventory2Expanded)}
             >
              <Text style={styles.inputText}>Seal Verification</Text>
              <MaterialIcons name={isInventory2Expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color={theme.colors.outlineVariant} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addEvidenceBtn} onPress={() => handleAddDynamicEvidence(setInventoryEvidence2)}>
              <MaterialIcons name="add-a-photo" size={16} color={theme.colors.onSecondary} />
              <Text style={styles.addEvidenceText}>ADD EVIDENCE</Text>
            </TouchableOpacity>
            {isInventory2Expanded && renderInventoryGrid(inventoryEvidence2, setInventoryEvidence2)}
          </View>
        </View>

        {/* Inspection Summary & E-Signature */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Inspection Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Items</Text>
            <Text style={styles.summaryValue}>12 Packages</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Images</Text>
            <Text style={styles.summaryValue}>
                {[licenseImage, ...normalContainerImages, ...fullContainerImages, ...inventoryEvidence1, ...inventoryEvidence2].filter(Boolean).length} Evidence Captures
            </Text>
          </View>
          <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.summaryLabel}>Risk Level</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>LOW</Text>
          </View>

          {/* 👉 NEW: E-SIGNATURE COMPONENT */}
          <View style={styles.signatureContainer}>
            <Text style={styles.inputLabel}>AUTHORIZATION SIGNATURE</Text>
            <TouchableOpacity 
              style={[styles.signatureBox, isSigned && styles.signatureBoxSigned]} 
              onPress={() => setIsSigned(!isSigned)}
            >
              {isSigned ? (
                <View style={styles.signedContent}>
                  <MaterialIcons name="verified" size={24} color="#4ade80" />
                  <View>
                    <Text style={styles.cursiveSignature}>{fullName || 'Signed by Driver'}</Text>
                    <Text style={styles.timestampText}>Verified: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                  </View>
                </View>
              ) : (
                <>
                  <MaterialIcons name="draw" size={24} color={theme.colors.outlineVariant} />
                  <Text style={styles.dashedButtonText}>TAP TO PROVIDE E-SIGNATURE</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* 👉 UPDATED: WIRED BUTTONS */}
          <TouchableOpacity activeOpacity={0.8} style={styles.submitWrapper} onPress={handleSubmitInspection}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryContainer]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.submitGradient}
            >
              <Text style={styles.submitText}>SUBMIT INSPECTION</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.saveDraftBtn} onPress={handleSaveDraft}>
             <Text style={styles.saveDraftText}>SAVE DRAFT</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      {/* 👉 MOVE STEP 2 HERE (At the bottom of the JSX) */}
      {showSuccessModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={['#1c2e2a', '#0a1116']}
              style={styles.modalGradient}
            >
              <View style={styles.successIconCircle}>
                <MaterialIcons name="check" size={40} color="#4ade80" />
              </View>
              
              <Text style={styles.modalTitle}>INSPECTION COMPLETED</Text>
              <Text style={styles.modalSubtitle}>
                Manifest MSKU9128374 has been successfully verified and uploaded to the Kargo Cloud Registry.
              </Text>

              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleFinalize}
              >
                <Text style={styles.confirmButtonText}>OK, RETURN TO SEARCH</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      )}

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <MaterialIcons name="history" size={24} color={theme.colors.primary} />
          <Text style={[styles.navText, styles.navTextActive]}>DETAILS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Drafts')}>
          <MaterialIcons name="description" size={24} color="#64748b" />
          <Text style={styles.navText}>DRAFTS</Text>
        </TouchableOpacity>
        
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

  // CARDS 
  card: { backgroundColor: theme.colors.surfaceLowest, padding: 24, marginBottom: 24 },
  cardTitle: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18, color: '#d7e4ed', borderLeftWidth: 4, borderLeftColor: theme.colors.primary, paddingLeft: 12, marginBottom: 24, letterSpacing: 1 },
  
  // INPUTS 
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontFamily: 'Inter_700Bold', fontSize: 10, color: theme.colors.outlineVariant, letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' },
  textInput: { backgroundColor: theme.colors.surfaceHigh, padding: 16, fontFamily: 'Inter_700Bold', fontSize: 14, color: '#d7e4ed' },
  inputText: { fontFamily: 'Inter_700Bold', fontSize: 14, color: '#d7e4ed' },
  
  dashedButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: theme.colors.outlineVariant, borderStyle: 'dashed', padding: 16, marginTop: 8 },
  dashedButtonText: { fontFamily: 'Inter_700Bold', fontSize: 10, color: theme.colors.outlineVariant, letterSpacing: 2 },

  // IMAGE HANDLING
  imageContainer: { width: '100%', height: 150, marginTop: 8, overflow: 'hidden', borderRadius: 4 },
  fullWidthImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridImageContainer: { width: '30%', aspectRatio: 1, marginBottom: 8 },
  gridImage: { flex: 1, width: '100%', height: '100%', backgroundColor: theme.colors.surfaceLowest, resizeMode: 'cover', borderRadius: 4 },
  dashedPlaceholder: { flex: 1, width: '100%', height: '100%', backgroundColor: theme.colors.surfaceLowest, borderWidth: 2, borderColor: theme.colors.outlineVariant, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', borderRadius: 4 },

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
  
  // 👉 NEW: SIGNATURE STYLES
  signatureContainer: { marginTop: 24, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant },
  signatureBox: { height: 80, borderWidth: 1, borderColor: theme.colors.outlineVariant, borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 12, backgroundColor: 'rgba(215, 228, 237, 0.02)' },
  signatureBoxSigned: { borderStyle: 'solid', borderColor: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.05)' },
  signedContent: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  cursiveSignature: { fontFamily: 'Inter_400Regular', fontStyle: 'italic', fontSize: 24, color: '#d7e4ed' },
  timestampText: { fontFamily: 'Inter_700Bold', fontSize: 9, color: '#4ade80', letterSpacing: 1, marginTop: 4 },

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
  navTextActive: { 
    color: theme.colors.primary 
  }, // <--- ✅ ADD THIS COMMA

  // 👉 MODAL STYLES
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(4, 16, 21, 0.95)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.2)',
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 32,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#4ade80',
  },
  modalTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: '#4ade80',
    letterSpacing: 2,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#d7e4ed',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    opacity: 0.8,
  },
  confirmButton: {
    backgroundColor: '#4ade80',
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    color: '#041015',
    letterSpacing: 1,
  },
});
