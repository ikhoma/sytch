import { CoffeeItem } from '@/lib/data';

export async function fetchCoffeeData(): Promise<CoffeeItem[]> {
  // Реальна архітектура:
  // Тут має бути виклик до Google Sheets API (пакет googleapis) або fetch до CSV URL
  // Приклад з офіційним API:
  // const auth = new google.auth.GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  // const sheets = google.sheets({ version: 'v4', auth });
  // const response = await sheets.spreadsheets.values.get({ spreadsheetId: process.env.SHEET_ID, range: 'A2:J' });
  // return transformData(response.data.values);

  // Для нашого mock-середовища імітуємо мережеву затримку
  await new Promise((resolve) => setTimeout(resolve, 800));

  const { coffeeData } = await import('@/lib/data');
  return coffeeData;
}
