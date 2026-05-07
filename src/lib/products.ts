import bag1 from "@/assets/bag-1.jpg";
import bag2 from "@/assets/bag-2.jpg";
import cap from "@/assets/cap.jpg";
import cover from "@/assets/cover.jpg";
import shirt from "@/assets/shirt.jpg";
import bottle from "@/assets/bottle.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
};

export const products: Product[] = [
  { id: "bag-45", name: "Bag Bee Delivery 45L Térmica", category: "Bags e Mochilas", price: 289.9, oldPrice: 349.9, image: bag1, badge: "Mais vendido" },
  { id: "bag-60", name: "Bag Profissional 60L Impermeável", category: "Bags e Mochilas", price: 459.9, image: bag2, badge: "Novo" },
  { id: "capa-45", name: "Capa de Chuva para Bag 42–45L", category: "Acessórios", price: 89.9, oldPrice: 109.9, image: cover },
  { id: "bone", name: "Boné Bee Delivery Aba Curva", category: "Vestuário", price: 49.9, image: cap },
  { id: "camisa", name: "Camisa Oficial Bee Dry-Fit", category: "Vestuário", price: 79.9, image: shirt, badge: "Edição Fortaleza" },
  { id: "garrafa", name: "Garrafa Térmica Bee 750ml", category: "Canecas e Garrafas", price: 119.9, image: bottle },
];

export const categories = [
  "Bags e Mochilas",
  "Acessórios",
  "Vestuário",
  "Canecas e Garrafas",
];