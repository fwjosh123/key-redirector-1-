import { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    // Detect if this is a browser reload
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    const storedKey = sessionStorage.getItem('accessKey');

    if (storedKey && isReload) {
      // If user refreshed, just show the same key
      setKey(storedKey);
    } else {
      // Generate a new key and store it (first visit or new tab)
      fetch('/api/key')
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem('accessKey', data.key);
          setKey(data.key);
        });
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
    alert('Key copied to clipboard!');
  };

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', marginTop: '100px' }}>
      <h1>Your Access Key:</h1>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {key || 'Loading key...'}
      </p>
      {key && (
        <button
          onClick={copyToClipboard}
          style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}
        >
          Copy Key
        </button>
      )}
      <p style={{ marginTop: '20px', color: 'red' }}>(do not refresh)</p>
    </div>
  );
}
