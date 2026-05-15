export type CoffeeItem = {
  id: string;
  number: number;
  name: string;
  region: string;
  flavorProfile: string;
  processing: string;
  retailPrice: {
    weight250g: number;
    weight1kg: number;
  };
  wholesalePrice: {
    weight250g: number;
    weight1kg: number;
  };
  category: 'Espresso' | 'Filter';
};

export const coffeeData: CoffeeItem[] = [
  // Espresso
  {
    id: 'e1', number: 1, name: 'PERU', region: 'El Aliso', flavorProfile: 'Молочний шоколад, Кеш\'ю', processing: 'Washed',
    retailPrice: { weight250g: 256, weight1kg: 958 }, wholesalePrice: { weight250g: 180, weight1kg: 658 }, category: 'Espresso'
  },
  {
    id: 'e2', number: 2, name: 'BRAZIL CANARIO', region: 'Minas Gerais', flavorProfile: 'Чорний шоколад, Горіх', processing: 'Natural',
    retailPrice: { weight250g: 268, weight1kg: 1006 }, wholesalePrice: { weight250g: 190, weight1kg: 696 }, category: 'Espresso'
  },
  {
    id: 'e3', number: 3, name: 'BRAZIL IBIRACI', region: 'Minas Gerais, Yellow Bourbon', flavorProfile: 'Шоколад, Горіхи, Цитрус, Карамель', processing: 'Natural',
    retailPrice: { weight250g: 282, weight1kg: 1040 }, wholesalePrice: { weight250g: 196, weight1kg: 720 }, category: 'Espresso'
  },
  {
    id: 'e4', number: 4, name: 'COLOMBIA MEDELLINE', region: 'Antioquia', flavorProfile: 'Сухофрукти, Карамель, Яблуко, Шоколад, Лимон', processing: 'Washed',
    retailPrice: { weight250g: 288, weight1kg: 1046 }, wholesalePrice: { weight250g: 200, weight1kg: 736 }, category: 'Espresso'
  },
  {
    id: 'e5', number: 5, name: 'HONDURAS', region: 'Guara Verde', flavorProfile: 'Карамель, Шоколад, Волоський горіх', processing: 'Washed',
    retailPrice: { weight250g: 282, weight1kg: 1062 }, wholesalePrice: { weight250g: 204, weight1kg: 752 }, category: 'Espresso'
  },
  {
    id: 'e6', number: 6, name: 'SALVADOR', region: 'La Majada', flavorProfile: 'Молочний шоколад, Фундук, Сухофрукти', processing: 'Washed',
    retailPrice: { weight250g: 284, weight1kg: 1068 }, wholesalePrice: { weight250g: 206, weight1kg: 758 }, category: 'Espresso'
  },
  {
    id: 'e7', number: 7, name: 'GUATEMALA', region: 'Huehuetenango La Democracia', flavorProfile: 'Шоколад, Лісові Горіхи, Смородина', processing: 'Washed',
    retailPrice: { weight250g: 288, weight1kg: 1090 }, wholesalePrice: { weight250g: 208, weight1kg: 770 }, category: 'Espresso'
  },
  {
    id: 'e8', number: 8, name: 'PERU CAJAMARCA', region: 'Aromas Del Valle', flavorProfile: 'Молочний Шоколад, сухофрукти, Мигдаль, Червоне яблуко', processing: 'Washed',
    retailPrice: { weight250g: 288, weight1kg: 1090 }, wholesalePrice: { weight250g: 208, weight1kg: 770 }, category: 'Espresso'
  },
  {
    id: 'e9', number: 9, name: 'ETHIOPIA KAFA', region: 'Tega & Tula', flavorProfile: 'Молочний Шоколад, Червоні Фрукти, Персик', processing: 'Natural',
    retailPrice: { weight250g: 288, weight1kg: 1090 }, wholesalePrice: { weight250g: 212, weight1kg: 780 }, category: 'Espresso'
  },

  // Filter
  {
    id: 'f21', number: 21, name: 'TANZANIA MBOZI', region: 'Iyenga Amcos', flavorProfile: 'Чорниця, Слива, Червоний виноград, Шоколад', processing: 'Washed',
    retailPrice: { weight250g: 308, weight1kg: 1164 }, wholesalePrice: { weight250g: 228, weight1kg: 844 }, category: 'Filter'
  },
  {
    id: 'f22', number: 22, name: 'SALVADOR', region: 'El Aguacate', flavorProfile: 'Молочний шоколад, Вино, Ягоди Слива Виноград', processing: 'Macerated 90 Hours',
    retailPrice: { weight250g: 336, weight1kg: 1278 }, wholesalePrice: { weight250g: 250, weight1kg: 938 }, category: 'Filter'
  },
  {
    id: 'f23', number: 23, name: 'KENYA', region: 'Narok', flavorProfile: 'Малина, Виноград, Карамель', processing: 'Natural',
    retailPrice: { weight250g: 350, weight1kg: 1334 }, wholesalePrice: { weight250g: 264, weight1kg: 994 }, category: 'Filter'
  },
  {
    id: 'f24', number: 24, name: 'COLOMBIA JAIRO ARCILA', region: 'Santa Monica', flavorProfile: 'Яблуко, Персик, Ананас, Молочний Шоколад', processing: 'Natural',
    retailPrice: { weight250g: 356, weight1kg: 1358 }, wholesalePrice: { weight250g: 270, weight1kg: 1018 }, category: 'Filter'
  },
  {
    id: 'f25', number: 25, name: 'KENYA NYERI', region: 'Mathira', flavorProfile: 'Ягоди, Ожина, Лайм', processing: 'Washed',
    retailPrice: { weight250g: 364, weight1kg: 1390 }, wholesalePrice: { weight250g: 282, weight1kg: 1060 }, category: 'Filter'
  },
  {
    id: 'f26', number: 26, name: 'PAPUA NEW GUINEA', region: 'Western Highland Kindeng Mill', flavorProfile: 'Малина, Ананас, Тропічні фрукти, Молочний шоколад', processing: 'Natural',
    retailPrice: { weight250g: 368, weight1kg: 1406 }, wholesalePrice: { weight250g: 282, weight1kg: 1066 }, category: 'Filter'
  },
  {
    id: 'f27', number: 27, name: 'ETHIOPIA KABIRA', region: 'Arago', flavorProfile: 'Малина, Вишня, Апельсин, Виноград', processing: 'Natural',
    retailPrice: { weight250g: 364, weight1kg: 1390 }, wholesalePrice: { weight250g: 284, weight1kg: 1070 }, category: 'Filter'
  },
  {
    id: 'f28', number: 28, name: 'ETHIOPIA GEDEB GOTITI', region: 'Guji', flavorProfile: 'Абрикос, Ягоди, Квіти, Мед, Апельсин', processing: 'Washed',
    retailPrice: { weight250g: 384, weight1kg: 1474 }, wholesalePrice: { weight250g: 294, weight1kg: 1114 }, category: 'Filter'
  },
  {
    id: 'f29', number: 29, name: 'COSTA RICA BRUNCA', region: 'El Mango', flavorProfile: 'Смородина, Яблуко, Виноград, Вино', processing: 'Natural Anaerobic',
    retailPrice: { weight250g: 384, weight1kg: 1474 }, wholesalePrice: { weight250g: 300, weight1kg: 1134 }, category: 'Filter'
  }
];
