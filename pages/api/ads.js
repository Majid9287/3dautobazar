// pages/api/products.js
import { db } from '../../lib/firebase'; // Ensure the correct path to your firebase.js file
import { ref, get } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { model, color, year, sort } = req.query;

      const dbRef = ref(db, 'ads');
      const snapshot = await get(dbRef);
      let ads = [];

      snapshot.forEach((adSnapshot) => {
        const adId = adSnapshot.key;
        const adData = adSnapshot.val();
        ads.push({ adId, ...adData });
      });

      // Apply filters
      if (model) {
        ads = ads.filter(ad => ad.carModel === model);
      }
      if (year) {
        ads = ads.filter(ad => ad.carRegYear === year);
      }
      if (color) {
        ads = ads.filter(ad => ad.carColor === color);
      }

      // Apply sorting
      if (sort === 'priceAsc') {
        ads.sort((a, b) => a.price - b.price);
      } else if (sort === 'priceDesc') {
        ads.sort((a, b) => b.price - a.price);
      } else if (sort === 'yearAsc') {
        ads.sort((a, b) => a.carRegYear - b.carRegYear);
      } else if (sort === 'yearDesc') {
        ads.sort((a, b) => b.carRegYear - a.carRegYear);
      }

      res.status(200).json({ ads });
    } catch (error) {
      console.error("Error fetching ads:", error);
      res.status(500).json({ error: 'Failed to fetch ads' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
