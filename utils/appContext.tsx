import React, { useState, createContext, ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface Item {
  id: number;
  title: string;
  price: string;
  unit: string;
  img: ImageSourcePropType;
  isFave: boolean;
  qty?: number;
}

export type AppContextType = {
  cart: Item[];
  setCart: (cart: Item[]) => void;
  products: Item[];
  setProducts: (products: Item[]) => void;
  onAdd: (product: Item) => void;
  onRemove: (product: Item) => void;
  onDelete: (product: Item) => void;
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
  onAdd: () => {},
  onRemove: () => {},
  onDelete: () => {},
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

  const onAdd = (product: Item) => {
    //checks if the product already exist in the cart
    const itemExist = cart.find((x) => x.id === product.id);

    //If product exists in cart
    if (itemExist) {
      setCart(
        cart.map((x) =>
          x.id === product.id
            ? { ...itemExist, qty: (itemExist.qty || 0) + 1 }
            : x,
        ),
      );
    } else {
      //if product doesn't exist in cart, add to cart
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product: Item) => {
    const itemExist = cart.find((x) => x.id === product.id);

    if (itemExist && itemExist.qty === 1) {
      setCart(cart.filter((x) => x.id !== product.id));
    } else if (itemExist) {
      setCart(
        cart.map((x) =>
          x.id === product.id
            ? { ...itemExist, qty: (itemExist.qty || 0) - 1 }
            : x,
        ),
      );
    }
  };

  const onDelete = (product: Item) => {
    const itemExist = cart.find((x) => x.id === product.id);

    if (itemExist) {
      setCart(cart.filter((x) => x.id !== product.id));
    }
  };

  const value = {
    products,
    setProducts,
    cart,
    setCart,
    onAdd,
    onRemove,
    onDelete,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
