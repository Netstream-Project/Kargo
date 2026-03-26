import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InspectionScreen from '../screens/InspectionScreen';
import DraftsScreen from '../screens/DraftsScreen';

// Import your screens
import LoginScreen from '../screens/LoginScreen';
import LookupScreen from '../screens/LookupScreen';

// Define the route names for TypeScript safety
export type RootStackParamList = {
  Login: undefined;
  Lookup: undefined;
  Inspection: undefined;
  Drafts: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Lookup" component={LookupScreen} />
        <Stack.Screen name="Inspection" component={InspectionScreen} />
        <Stack.Screen name="Drafts" component={DraftsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}