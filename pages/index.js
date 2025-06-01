import React, { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    const storedKey = sessionStorage.getItem('accessKey');

    // Only fetch a new key if:
    // - There's no stored key
    // - AND the user came from LootLabs or Loot-Links
    if (!storedKey) {
      const referrer = document.referrer;

      const isFromLoot = /loot(links|labs)/i.test(referrer);

      if (isFromLoot) {
        fetch('/api/key')
          .then((res) => res.json())
          .then((data) => {
            setKey(data.key);
            sessionStorage.setItem('accessKey', data.key);
          });
      } else {
        setKey('No key. You must access from lootlabs/linkvertise.');
      }
    } else {
      setKey(storedKey);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
    alert('Key copied to clipboard!');
  };

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', marginTop: '100px' }}>
      <h1>Your Access Key:</h1>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{key}</p>
      <button onClick={copyToClipboard} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Copy Key
      </button>
      <p style={{ marginTop: '20px', color: 'red' }}>(do not refresh)</p>
    </div>
  );
}
