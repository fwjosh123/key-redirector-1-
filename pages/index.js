import { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    // Always fetch a new key — every visit, every time
    fetch('/api/key?' + new Date().getTime())
      .then((res) => res.json())
      .then((data) => {
        setKey(data.key);
      });

    // Redirect after 1 minute
    const timer = setTimeout(() => {
      window.location.href = 'https://discord.gg/RZ8qmCUZ';
    }, 60000);

    return () => clearTimeout(timer);
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
      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        You will be redirected in 60 seconds...
      </p>
    </div>
  );
}
