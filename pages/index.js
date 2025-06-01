import { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    fetch('/api/key')
      .then(res => res.json())
      .then(data => setKey(data.key));

    const timer = setTimeout(() => {
      window.location.href = 'https://discord.gg/RZ8qmCUZ';
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const copyKey = () => {
    navigator.clipboard.writeText(key);
    alert('Key copied to clipboard!');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Your Access Key</h1>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{key || 'Loading...'}</p>
      {key && (
        <button onClick={copyKey} style={{ padding: '10px 20px' }}>
          Copy Key
        </button>
      )}
      <p style={{ color: 'red', marginTop: '20px' }}>(do not refresh)</p>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        Redirecting to Discord in 60 seconds...
      </p>
    </div>
  );
}
