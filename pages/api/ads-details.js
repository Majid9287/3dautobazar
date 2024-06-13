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
      const dbRef = ref(db, 'ads');
      const snapshot = await get(dbRef);

      let adData = null;
      let userId = null;

      // Iterate through the users and their ads to find the ad by adId
      snapshot.forEach((userSnapshot) => {
        userSnapshot.forEach((adSnapshot) => {
          if (adSnapshot.key === adId) {
            userId = userSnapshot.key;
            adData = adSnapshot.val();
            adData.adId = adId;
            adData.userId = userId;
          }
        });
      });

      if (!adData || !userId) {
        res.status(404).json({ error: 'Ad not found' });
        return;
      }

      // Fetch user data using userId
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
