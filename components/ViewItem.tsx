import { useState, useContext } from 'react';
import { StyleSheet, Modal, Pressable, View, Image, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import { AppContext } from '@/utils/appContext';
import { Item } from '@/utils/@types/context';

type ModalProps = {
  openModal: boolean;
  openOptions: () => void;
};

export const ViewItem = ({ openModal, openOptions }: ModalProps) => {
  const { cart, onAdd, onRemove, selected, setSelected } =
    useContext(AppContext);

  const increaseCart = (product: Item) => {
    onAdd(product);
    setSelected((prevSelected: any) =>
      prevSelected
        ? { ...prevSelected, qty: (prevSelected?.qty || 0) + 1 }
        : product,
    );
  };

  const decreaseCart = (product: Item) => {
    onRemove(product);
    setSelected((prevSelected: { qty: any }) => {
      // Check if prevSelected exists before accessing qty
      return prevSelected
        ? { ...prevSelected, qty: Math.max(prevSelected.qty || 0, 0) - 1 }
        : product;
    });
  };

  return (
    <ThemedView>
      <Modal animationType="slide" transparent={true} visible={openModal}>
        <ThemedView style={styles.modal}>
          <ThemedView style={styles.modalBody}>
            <Pressable onPress={openOptions} style={styles.button}>
              <ThemedText style={styles.buttonText}>Close</ThemedText>
            </Pressable>

            <View style={styles.menuItem}>
              <View>
                <Image style={styles.menuImage} source={selected?.img} />
              </View>

              <View>
                <ThemedText style={styles.menuTitle}>
                  {selected?.title}
                </ThemedText>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={styles.menuPrice}>
                    ₦{selected ? selected.price * (selected.qty ?? 0) : 0}
                  </Text>
                  <ThemedText style={styles.menuUnit}>
                    {selected?.unit}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.qtyWrap}>
                <Pressable
                  onPress={() => selected && decreaseCart(selected)}
                  style={styles.qty_button}
                >
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>

                <Pressable style={styles.qty_button}>
                  <Text style={styles.buttonText}>{selected?.qty || 1}</Text>
                </Pressable>

                <Pressable
                  onPress={() => selected && increaseCart(selected)}
                  style={styles.qty_button}
                >
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </View>
            </View>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
};

export const styles = StyleSheet.create({
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
