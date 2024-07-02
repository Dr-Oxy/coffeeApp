import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';

import { ThemedText } from './ThemedText';

import { Item } from '@/utils/@types/context';

type ItemProps = {
  item: Item;
  onPress: () => void;
};

export const MenuCard = ({ item, onPress }: ItemProps) => (
  <TouchableOpacity style={styles.menuItem}>
    <View>
      <Image style={styles.menuImage} source={item.img} />
    </View>

    <View
      style={{
        padding: 8,
      }}
    >
      <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <ThemedText style={styles.menuPrice}>{item.price}</ThemedText>
        <ThemedText style={styles.menuUnit}>{item.unit}</ThemedText>
      </View>
    </View>

    <View>
      <Pressable onPress={onPress} style={styles.button}>
        <ThemedText style={styles.buttonText}>Place Order</ThemedText>
      </Pressable>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItem: {
    width: '50%',
    // marginBottom: 20,
    borderRadius: 8,
    borderColor: '#f5f5f5',
    borderWidth: 1,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: 600,
  },

  menuImage: {
    height: 160,
    width: '100%',
    resizeMode: 'contain',
  },

  menuPrice: {
    fontSize: 20,
    marginVertical: 4,
    fontWeight: 700,
  },

  menuUnit: {
    fontSize: 12,
  },
  button: {
    paddingVertical: 14,
    backgroundColor: '#F3E3BF',
    color: '#996A22',
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Catamaran',
  },
});
