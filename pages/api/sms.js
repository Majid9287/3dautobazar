// pages/api/sms.js
import { db } from '../../lib/firebase';
import { ref, push, set } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, country, subject, message } = req.body;

    if (!name || !email || !phone || !country || !subject || !message) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    try {
      const smsRef = ref(db, 'sms');
      const newSmsRef = push(smsRef); // Create a new child node with a unique key
      const newSmsId = newSmsRef.key;

      await set(newSmsRef, {
        name,
        email,
        phone,
        country,
        subject,
        message,
        smsId: newSmsId
      });

      res.status(201).json({ message: 'SMS added successfully', smsId: newSmsId });
    } catch (error) {
      console.error('Error adding SMS:', error);
      res.status(500).json({ error: 'Failed to add SMS' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
