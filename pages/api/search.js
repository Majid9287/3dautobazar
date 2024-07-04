// pages/api/ads.js
import { db } from '../../lib/firebase'; // Ensure the correct path to your firebase.js file
import { ref, get } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const dbRef = ref(db, 'ads');
      const snapshot = await get(dbRef);
      const ads = [];

      const { carModel, carRegYear, carColor, q, sortOption } = req.query;

      snapshot.forEach((adSnapshot) => {
        const adData = adSnapshot.val();
        const adId = adSnapshot.key;

        // Apply filters
        if (
          (!carModel || adData.carModel === carModel) &&
          (!carRegYear || adData.carRegYear === carRegYear) &&
          (!carColor || adData.carColor === carColor) &&
          (!q || adData.adTitle.toLowerCase().includes(q.toLowerCase()) || adData.adDescription.toLowerCase().includes(q.toLowerCase()))
        ) {
          ads.push({ adId, ...adData });
        }
      });

      // Apply sorting
      if (sortOption) {
        ads.sort((a, b) => {
          if (sortOption === 'priceAsc') return a.price - b.price;
          if (sortOption === 'priceDesc') return b.price - a.price;
          if (sortOption === 'yearAsc') return a.carRegYear - b.carRegYear;
          if (sortOption === 'yearDesc') return b.carRegYear - a.carRegYear;
          return 0;
        });
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
