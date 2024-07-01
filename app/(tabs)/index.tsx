import { useState, useContext } from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  ImageSourcePropType,
  Pressable,
} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import { AppContext } from '@/utils/appContext';

type ItemData = {
  id: number;
  title: string;
  price: string;
  unit: string;
  img: ImageSourcePropType;
  isFave: boolean;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
};

const Item = ({ item, onPress }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.menuItem}>
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
      <Pressable style={styles.button}>
        <ThemedText style={styles.buttonText}>Place Order</ThemedText>
      </Pressable>
    </View>
  </TouchableOpacity>
);

export default function Home() {
  const { products } = useContext(AppContext);

  const [selectedId, setSelectedId] = useState<number>();

  const renderItem = ({ item }: { item: ItemData }) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ThemedView
        style={{
          paddingBottom: 50,
          flex: 1,
        }}
      >
        <ThemedView
          style={{
            paddingVertical: 40,
            paddingHorizontal: 16,
          }}
        >
          <ThemedText style={styles.header}>
            Welcome to Tastebud Cafe
          </ThemedText>

          <ThemedText style={styles.menu}>
            Here's our menu for today ☕️
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.menuList}>
          <FlatList
            numColumns={2}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            extraData={selectedId}
          />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 700,
  },

  menu: {
    fontSize: 18,
    fontWeight: 400,
  },

  menuList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 8,
    paddingHorizontal: 16,
  },

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
