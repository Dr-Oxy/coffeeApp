import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet, Modal, Pressable, View, Image, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';

import { AppContext } from '@/utils/appContext';
import { Item } from '@/utils/@types/context';
import { converIntl } from '@/utils/helper';

type ModalProps = {
  openModal: boolean;
  hide: () => void;
};

type NavigationOptions = {
  [key: string]: any;
};

export const ViewItem = ({ openModal, hide }: ModalProps) => {
  const navigation = useNavigation<NavigationOptions>();

  const goToCart = () => {
    hide();
    navigation.navigate('cart');
  };

  const { onAdd, onRemove, selected, setSelected } = useContext(AppContext);

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
            <Text style={styles.tag}>Added to cart </Text>

            <Pressable onPress={hide} style={styles.button}>
              <Text style={styles.continue}>Continue Shopping</Text>
            </Pressable>

            <View style={styles.menuItem}>
              <View>
                <Image style={styles.menuImage} source={selected?.img} />
              </View>

              <View>
                <Text style={styles.menuTitle}>{selected?.title}</Text>
                <View>
                  <Text style={styles.menuPrice}>
                    ₦
                    {converIntl(
                      selected ? selected.price * (selected.qty ?? 0) : 0,
                    )}
                  </Text>
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

              <Pressable onPress={goToCart} style={styles.checkButton}>
                <Text style={styles.checkText}>Go to Checkout</Text>
              </Pressable>
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

    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '80%',
    backgroundColor: '#440202',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  tag: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 32,
    fontSize: 18,
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
  },

  continue: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },

  button: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#440202',
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },

  menuItem: {
    width: '80%',
    marginHorizontal: 'auto',
    marginTop: 30,
    borderRadius: 8,
  },

  menuImage: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
  },

  menuTitle: {
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 30,
    color: 'white',
    textAlign: 'center',
  },

  menuPrice: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
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

    borderColor: '#F3E3BF',
    borderWidth: 1,
    borderRadius: 8,
  },

  checkButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginTop: 24,
  },
  checkText: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
});
