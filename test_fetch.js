const Papa = require('papaparse');
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1KfRfP4UKNiL3wmaFFR1xCadAyldehNZ_Dhhipyx1TiA/export?format=csv&gid=0';

async function test() {
  const response = await fetch(SHEET_URL);
  const csvData = await response.text();
  console.log("CSV length:", csvData.length);
  const parsed = Papa.parse(csvData, { skipEmptyLines: true });
  console.log("Parsed rows:", parsed.data.length);
  const filtered = parsed.data.filter(row => row.length >= 10 && (row[0] === 'Espresso' || row[0] === 'Filter'));
  console.log("Filtered rows:", filtered.length);
  if (filtered.length > 0) {
    console.log("First row example:", filtered[0]);
  }
}
test();
