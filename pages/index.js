import React, { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    const storedKey = localStorage.getItem('access_key');
    const referrer = document.referrer;

    // Check if they came from Linkvertise
    const cameFromLinkvertise = referrer.includes('linkvertise');

    if (cameFromLinkvertise || !storedKey) {
      // Generate a new key
      fetch('/api/key')
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('access_key', data.key);
          setKey(data.key);
        });
    } else {
      // Use stored key
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

