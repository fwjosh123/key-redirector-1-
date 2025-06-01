import { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    // Always fetch a fresh key on page load
    fetch('/api/key')
      .then((res) => res.json())
      .then((data) => {
        setKey(data.key);
      });

    // Set a 30-minute timer to redirect
    const timeout = setTimeout(() => {
      window.location.href = 'https://discord.gg/RZ8qmCUZ';
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
    alert('Key copied to clipboard!');
  };

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', marginTop: '100px' }}>
      <h1>Your Access Key:</h1>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {key || 'Generating key...'}
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
