import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { Item } from '@/utils/@types/context';

import { converIntl } from '@/utils/helper';

type ItemProps = {
  item: Item;
  onPress: () => void;
};

export const MenuCard = ({ item, onPress }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.menuItem}>
    <View>
      <Image style={styles.menuImage} source={item.img} />
    </View>

    <View
      style={{
        padding: 8,
      }}
    >
      <Text style={styles.menuTitle}>{item.title}</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <Text style={styles.menuPrice}> ₦{converIntl(item?.price)}</Text>
        <Text style={styles.menuUnit}>{item.unit}</Text>
      </View>
    </View>

    <View style={styles.button}>
      <Text style={styles.buttonText}>
        <Ionicons size={28} name="cart-outline" color="white" />
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItem: {
    width: '50%',
    marginHorizontal: 2,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#f5f5f5',
    borderWidth: 1,
    paddingBottom: 16,
  },

  menuTitle: {
    fontSize: 24,
    fontWeight: '600',
  },

  menuImage: {
    height: 160,
    width: '100%',
    resizeMode: 'contain',
  },

  menuPrice: {
    fontSize: 20,
    marginVertical: 4,
    fontWeight: '700',
  },

  menuUnit: {
    fontSize: 16,
  },

  button: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#440202',
    marginTop: 8,
    borderRadius: 8,
    marginRight: 16,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
});
