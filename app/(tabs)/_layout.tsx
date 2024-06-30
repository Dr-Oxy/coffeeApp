import React from 'react';
import { StyleSheet } from 'react-native';

import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#2f0202',
          borderRadius: 32,
          paddingTop: 10,
          height: 84,
          ...styles.shadow,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'cafe' : 'cafe-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'cart' : 'cart-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOpacity: 0.25,
    elevation: 4,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
});
