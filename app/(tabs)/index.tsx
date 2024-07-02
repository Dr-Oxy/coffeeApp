import { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MenuCard } from '@/components/MenuCard';
import { ViewItem } from '@/components/ViewItem';

import { AppContext } from '@/utils/appContext';
import { Item } from '@/utils/@types/context';

export default function Home() {
  const { products, onAdd, onRemove, selected, setSelected, cart } =
    useContext(AppContext);

  const [openModal, setOpenModal] = useState(false);

  const openOptions = () => {
    setOpenModal(!openModal);
  };

  const handleClick = (product: Item) => {
    onAdd(product);
    setSelected({ ...product, qty: (product?.qty || 0) + 1 });
    openOptions();
  };

  useEffect(() => {
    if (selected?.qty < 1) {
      setOpenModal(false);
    }
  }, [selected]);

  const renderItem = ({ item }: { item: Item }) => {
    return <MenuCard item={item} onPress={() => handleClick(item)} />;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ThemedView style={{ paddingBottom: 50, flex: 1 }}>
        <ThemedView style={{ paddingVertical: 40, paddingHorizontal: 16 }}>
          <ThemedText style={styles.header}>
            Welcome to Tastebud Cafes
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
            extraData={selected}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ViewItem openModal={openModal} openOptions={openOptions} />
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

  lead: {
    fontSize: 32,
    color: '#F3E3BF',
    fontWeight: '600',
    marginBottom: 8,
  },

  sub: {
    fontSize: 20,
    color: 'rgba(243, 227, 191, 0.7)',
  },

  modal: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },

  modalBody: {
    paddingTop: 30,
    paddingHorizontal: 16,
    borderRadius: 32,
    height: '80%',
    backgroundColor: '#482B29',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  button: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#F3E3BF',
    borderRadius: 8,
    marginLeft: 'auto',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
  },

  menuItem: {
    width: '80%',
    marginHorizontal: 'auto',
    marginTop: 30,
    borderRadius: 8,
  },

  menuImage: {
    height: 280,
    width: '100%',
    resizeMode: 'contain',
  },

  menuTitle: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 30,
    color: 'white',
  },

  menuPrice: {
    color: 'white',
    fontSize: 32,
    fontWeight: 700,
  },

  menuUnit: {
    fontSize: 18,
    color: 'white',
  },

  qtyWrap: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },

  qty_button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 14,

    backgroundColor: '#F3E3BF',
    borderRadius: 8,
  },
});
