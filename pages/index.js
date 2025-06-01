import React, { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    // Check if key already exists in sessionStorage
    const existingKey = sessionStorage.getItem('accessKey');

    if (existingKey) {
      setKey(existingKey);
    } else {
      // Check if user came from LootLabs/Linkvertise
      const referrer = document.referrer;
      const isFromLoot = /loot(links|labs|vertise)/i.test(referrer);

      if (isFromLoot) {
        fetch('/api/key')
          .then((res) => res.json())
          .then((data) => {
            sessionStorage.setItem('accessKey', data.key);
            setKey(data.key);
          });
      } else {
        setKey(''); // Don't show key
      }
    }
  }, []);

  const copyToClipboard = () => {
    if (key) {
      navigator.clipboard.writeText(key);
      alert('Key copied to clipboard!');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', marginTop: '100px' }}>
      <h1>Your Access Key:</h1>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {key || 'No key available. You must access this page via LootLabs/Linkvertise.'}
      </p>
      {key && (
        <button onClick={copyToClipboard} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Copy Key
        </button>
      )}
      <p style={{ marginTop: '20px', color: 'red' }}>(do not refresh)</p>
    </div>
  );
}
