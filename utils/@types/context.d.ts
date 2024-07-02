import { ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export type AppContextType = {
  cart: Item[];
  setCart: (cart: Item[]) => void;
  products: Item[];
  setProducts: (products: Item[]) => void;
  onAdd: (product: Item) => void;
  onRemove: (product: Item) => void;
  onDelete: (product: Item) => void;
  selected: Item;
  setSelected: any;
};

export interface Item {
  id: number;
  title: string;
  price: number;
  unit: string;
  img: ImageSourcePropType;
  isFave: boolean;
  qty: number;
}

export interface PropsWithChildren {
  children: ReactNode;
}
