import { fetchCoffeeData } from '@/services/googleSheets';
import CoffeeCatalog from './CoffeeCatalog';
import { CoffeeItem } from '@/lib/data';

export default async function Home() {
  let initialData: CoffeeItem[] = [];

  try {
    initialData = await fetchCoffeeData();
  } catch {
    // Fallback до локальних даних вже вбудований у fetchCoffeeData
  }

  // JSON-LD для каталогу — генерується server-side з реальними даними
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Каталог свіжообсмаженої кави Sytch Coffee Roasters",
    "description": "Ми обсмажуємо та доставляємо свіжообсмажену specialty каву для дому, офісів та кав'ярень.",
    "url": "https://sytch.com.ua",
    "numberOfItems": initialData.length,
    "itemListElement": initialData.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.name,
        "description": [item.region, item.flavorProfile, item.processing].filter(Boolean).join(". "),
        "category": item.category === 'Espresso' ? 'Еспресо кава' : 'Фільтр кава',
        "brand": {
          "@type": "Brand",
          "name": "Sytch Coffee Roasters",
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "UAH",
          "lowPrice": item.wholesalePrice.weight250g,
          "highPrice": item.retailPrice.weight1kg,
          "availability": "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <CoffeeCatalog initialData={initialData} />
    </>
  );
}
