// pages/api/products.js
import { db } from '../../lib/firebase'; // Ensure the correct path to your firebase.js file
import { ref, get } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const dbRef = ref(db, 'ads');
      const snapshot = await get(dbRef);
      const ads = [];

      snapshot.forEach((adSnapshot) => {
        const adId = adSnapshot.key;  // adId directly from the snapshot key
        const adData = adSnapshot.val();
        ads.push({ adId, ...adData });
      });

      res.status(200).json({ ads });
    } catch (error) {
      console.error("Error fetching ads:", error);
      res.status(500).json({ error: 'Failed to fetch ads' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
