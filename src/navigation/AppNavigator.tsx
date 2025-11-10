import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ThisWeekScreen from '../screens/ThisWeekScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StatsScreen from '../screens/StatsScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import { MainTabParamList, RootStackParamList } from '../types/types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Tabs Navigator (las 3 pestañas principales)
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 12,
          paddingTop: 8,
          height: 'auto',
          minHeight: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 6,
        },
        headerShown: false,
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tab.Screen
        name="ThisWeek"
        component={ThisWeekScreen}
        options={{
          tabBarLabel: 'Esta Semana',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Historial',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator (envuelve tabs + pantallas modales)
const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen 
        name="AddWorkout" 
        component={AddWorkoutScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;