// pages/api/products.js
import { db } from '../../lib/firebase'; // Ensure the correct path to your firebase.js file
import { ref, get } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { adId } = req.query;

    if (!adId) {
      res.status(400).json({ error: 'Missing adId' });
      return;
    }

    try {
      // Fetch ad data using adId directly
      const adSnapshot = await get(ref(db, `ads/${adId}`));
      if (!adSnapshot.exists()) {
        res.status(404).json({ error: 'Ad not found' });
        return;
      }

      const adData = adSnapshot.val();
      adData.adId = adId;

      // Fetch user data using userId from adData (if userId is stored within adData)
      // Modify this part based on how user data is structured in your database

      // Assuming userId is directly available in adData (if not, modify accordingly)
      const userId = adData.userId;
      const userSnapshot = await get(ref(db, `users/${userId}`));
      if (!userSnapshot.exists()) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const userData = userSnapshot.val();

      res.status(200).json({ ad: adData, user: userData });
    } catch (error) {
      console.error('Error fetching ad details:', error);
      res.status(500).json({ error: 'Failed to fetch ad details' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
