import React, { useContext } from 'react';
import { View } from 'react-native';

import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { AppContext } from '@/utils/appContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { cart } = useContext(AppContext);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#440202',
          // borderRadius: 32,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          paddingTop: 10,
          height: 84,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'cafe' : 'cafe-outline'}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <TabBarIcon
                name={focused ? 'cart' : 'cart-outline'}
                color={color}
              />

              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: 'rgb(204, 120, 82)',
                  borderRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ThemedText
                  style={{
                    color: '#fff',
                    fontSize: 16,
                  }}
                >
                  {cart?.length}
                </ThemedText>
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
