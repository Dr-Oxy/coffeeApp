import { useContext } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Pressable,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import ThemedScrollView from '@/components/ThemedScrollView';
import { ThemedView } from '@/components/ThemedView';

import { AppContext } from '@/utils/appContext';

type NavigationOptions = {
  [key: string]: any;
};

export default function Cart() {
  const navigation = useNavigation<NavigationOptions>();

  const { cart, onAdd, onRemove, onDelete } = useContext(AppContext);

  const goToSuccess = () => {
    navigation.navigate('success');
  };

  const goToMenu = () => {
    navigation.navigate('index');
  };

  //Total cart
  const sumPrice = cart.reduce(
    (price, item) => price + item.qty * item.price,
    0,
  );

  //separates the digit with a comma
  const total = new Intl.NumberFormat().format(sumPrice);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ThemedScrollView>
        <ThemedView>
          <ThemedText style={styles.header}>
            Cart <ThemedText>({cart?.length})</ThemedText>
          </ThemedText>
        </ThemedView>

        <ThemedView>
          {cart?.length > 0 ? (
            cart?.map((item) => (
              <ThemedView style={styles.cartCard} key={item.id}>
                <ThemedView
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <ThemedView style={styles.imgWrap}>
                    <Image style={styles.menuImage} source={item.img} />
                  </ThemedView>

                  <ThemedView>
                    <ThemedText style={styles.menuTitle}>
                      {item.title}
                    </ThemedText>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                      }}
                    >
                      <ThemedText style={styles.menuPrice}>
                        ₦{item.price * item.qty}
                      </ThemedText>
                    </View>
                  </ThemedView>
                </ThemedView>

                <ThemedView
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 16,
                  }}
                >
                  <Pressable
                    onPress={() => onDelete(item)}
                    style={styles.delButton}
                  >
                    <Text style={styles.delText}>Delete</Text>
                  </Pressable>

                  <View style={styles.qtyWrap}>
                    <Pressable
                      onPress={() => onRemove(item)}
                      style={styles.qty_button}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </Pressable>

                    <Pressable style={styles.qty_button}>
                      <Text style={styles.buttonText}>{item?.qty}</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => onAdd(item)}
                      style={styles.qty_button}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </Pressable>
                  </View>
                </ThemedView>
              </ThemedView>
            ))
          ) : (
            <ThemedView>
              <ThemedText
                style={{ fontSize: 24, color: 'black', marginTop: 30 }}
              >
                Your cart is empty.
              </ThemedText>

              <ThemedView
                style={{
                  marginVertical: 32,
                }}
              >
                <Image
                  style={styles.emptyImage}
                  source={require('@/assets/images/emptyCup.png')}
                />
              </ThemedView>

              <View>
                <Pressable onPress={goToMenu} style={styles.button}>
                  <ThemedText
                    style={{
                      fontSize: 20,
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Go shopping!
                  </ThemedText>
                </Pressable>
              </View>
            </ThemedView>
          )}
        </ThemedView>

        {cart?.length > 0 ? (
          <ThemedView style={styles.totalWrap}>
            <ThemedText
              style={{
                fontSize: 16,
                color: 'black',
                marginBottom: 8,
              }}
            >
              By clicking make payment, you agree to our Terms and Conditons{' '}
            </ThemedText>
            <Pressable onPress={goToSuccess} style={styles.totalButton}>
              <ThemedText style={styles.lead}>Make Payment: </ThemedText>
              <ThemedText style={styles.lead}> ₦{total} </ThemedText>
            </Pressable>
          </ThemedView>
        ) : (
          ''
        )}
      </ThemedScrollView>
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
    paddingVertical: 20,
  },

  lead: {
    fontSize: 20,
    lineHeight: 40,
    color: 'white',
    fontWeight: '600',
    // textAlign: 'center',
  },

  sub: {
    fontSize: 28,
    lineHeight: 36,
    color: 'black',
  },

  button: {
    padding: 20,
    backgroundColor: '#440202',
    borderRadius: 12,
    marginTop: 12,
  },

  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: 'rgb(68, 2, 2)',
  },

  cartCard: {
    borderTopColor: 'rgba(68, 2, 2, 0.2)',
    borderTopWidth: 1,
    paddingTop: 20,
    marginBottom: 20,
  },

  imgWrap: {
    borderRadius: 20,
    padding: 12,
    backgroundColor: 'rgb(243, 243, 244)',
    alignSelf: 'flex-start',
  },

  emptyImage: {
    height: 200,
    width: '60%',
    resizeMode: 'contain',
    marginHorizontal: 'auto',
  },

  menuImage: {
    height: 72,
    width: 80,
    resizeMode: 'contain',
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 30,
    color: 'rgb(68, 2, 2)',
  },

  menuPrice: {
    color: 'rgb(68, 2, 2)',
    fontSize: 20,
    fontWeight: 700,
  },

  menuUnit: {
    fontSize: 14,
    color: 'rgb(68, 2, 2)',
  },

  qtyWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
  },

  qty_button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderColor: 'rgb(68, 2, 2)',
    borderWidth: 1,
  },

  delButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },

  delText: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
  },

  totalWrap: {
    marginTop: 28,
    paddingTop: 20,
    paddingBottom: 120,
    borderTopColor: 'rgb(68, 2, 2)',
    borderTopWidth: 1,
  },

  totalPrice: {
    fontSize: 32,
    lineHeight: 40,
    color: 'rgb(68, 2, 2)',
    fontWeight: 700,
  },

  totalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(68, 2, 2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 24,
    borderRadius: 12,
  },
});
