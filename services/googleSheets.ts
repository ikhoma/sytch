import { CoffeeItem } from '@/lib/data';
import Papa from 'papaparse';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1KfRfP4UKNiL3wmaFFR1xCadAyldehNZ_Dhhipyx1TiA/export?format=csv&gid=0';

export async function fetchCoffeeData(): Promise<CoffeeItem[]> {
  try {
    const response = await fetch(SHEET_URL, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }
    
    const csvData = await response.text();
    
    const parsed = Papa.parse<string[]>(csvData, {
      skipEmptyLines: true,
    });

    const items: CoffeeItem[] = parsed.data
      .filter(row => row.length >= 10 && (row[0] === 'Espresso' || row[0] === 'Filter'))
      .map((row, index) => {
        return {
          id: `item-${index}`,
          category: row[0] as 'Espresso' | 'Filter',
          number: parseInt(row[1], 10) || 0,
          name: row[2]?.trim() || '',
          region: row[3]?.trim() || '',
          flavorProfile: row[4]?.trim() || '',
          processing: row[5]?.trim() || '',
          retailPrice: {
            weight250g: parseInt(row[6], 10) || 0,
            weight1kg: parseInt(row[7], 10) || 0,
          },
          wholesalePrice: {
            weight250g: parseInt(row[8], 10) || 0,
            weight1kg: parseInt(row[9], 10) || 0,
          }
        };
      });

    return items;
  } catch (error) {
    console.error('Error fetching/parsing Google Sheets CSV:', error);
    // Fallback to local data if fetch fails
    const { coffeeData } = await import('@/lib/data');
    return coffeeData;
  }
}

