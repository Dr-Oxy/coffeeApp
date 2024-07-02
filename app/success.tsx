import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { AppContext } from '@/utils/appContext';

import { Image, StyleSheet, SafeAreaView, Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type NavigationOptions = {
  [key: string]: any;
};

const Success = () => {
  const { setCart } = useContext(AppContext);
  const navigation = useNavigation<NavigationOptions>();

  const goBack = () => {
    navigation.navigate('index');
    setCart([]);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ThemedView style={styles.container}>
        <ThemedView
          style={{
            marginBottom: 32,
            backgroundColor: 'transparent',
          }}
        >
          <Image
            style={styles.emptyImage}
            source={require('@/assets/images/coffee-mug.png')}
          />
        </ThemedView>

        <ThemedText style={styles.header}> Payment Successful!!!</ThemedText>

        <ThemedText style={styles.sub}>
          Your order is on it's way. Driver will contact you soon. Enjoy 😌
        </ThemedText>

        <Pressable onPress={goBack} style={styles.button}>
          <ThemedText style={styles.buttonText}>Back to Shopping</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(47, 2, 2)',
  },

  container: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 16,
    backgroundColor: '#440202',
  },

  header: {
    fontSize: 40,
    fontWeight: 700,
    marginBottom: 10,
    lineHeight: 40,
    color: 'white',
  },

  sub: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  emptyImage: {
    height: 200,
    width: '60%',
    resizeMode: 'contain',
    marginHorizontal: 'auto',
  },

  button: {
    borderRadius: 12,
    width: '100%',
    padding: 20,
    backgroundColor: '#440202',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 40,
  },

  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});

export default Success;
