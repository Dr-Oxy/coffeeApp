import React, { useState, createContext, ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface Item {
  id: number;
  title: string;
  price: string;
  unit: string;
  img: ImageSourcePropType;
  isFave: boolean;
}

export type AppContextType = {
  cart: Item[];
  setCart: (cart: Item[]) => void;
  products: Item[];
  setProducts: (products: Item[]) => void;
};

export interface PropsWithChildren {
  children: ReactNode;
}

// Provide a default value for the context
const defaultContextValue: AppContextType = {
  cart: [],
  setCart: () => {},
  products: [],
  setProducts: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Item[]>([]);
  const [products, setProducts] = useState<Item[]>([
    {
      id: 1,
      title: 'Americano',
      price: '1800',
      unit: '/cup',
      img: require('@/assets/images/americano.png'),
      isFave: false,
    },
    {
      id: 2,
      title: 'Cappuccino',
      price: '2200',
      unit: '/cup',
      img: require('@/assets/images/cappuccino.png'),
      isFave: true,
    },
    {
      id: 3,
      title: 'Espresso',
      price: '1950',
      unit: '/cup',
      img: require('@/assets/images/expresso.png'),
      isFave: false,
    },
    {
      id: 4,
      title: 'Latte',
      price: '2200',
      unit: '/cup',
      img: require('@/assets/images/latte.png'),
      isFave: true,
    },
    {
      id: 5,
      title: 'Macchiato',
      price: '2000',
      unit: '/cup',
      img: require('@/assets/images/macchiato.png'),
      isFave: false,
    },
    {
      id: 6,
      title: 'Iced Cold Brew',
      price: '1900',
      unit: '/cup',
      img: require('@/assets/images/iced_cold_brew.png'),
      isFave: true,
    },
    {
      id: 7,
      title: 'Frappuccino',
      price: '3500',
      unit: '/cup',
      img: require('@/assets/images/frappuccino.png'),
      isFave: true,
    },
    {
      id: 8,
      title: 'Caffé Mocha',
      price: '3850',
      unit: '/cup',
      img: require('@/assets/images/caffe-mocha.png'),
      isFave: true,
    },
    {
      id: 9,
      title: 'Black Eye',
      price: '1050',
      unit: '/cup',
      img: require('@/assets/images/expresso.png'),
      isFave: false,
    },
  ]);

  const value = {
    products,
    setProducts,
    cart,
    setCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
