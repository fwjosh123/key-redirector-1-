import { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    // Generate a new random key every time page loads
    const randomKey = 'TJ-' + Array.from({ length: 16 }, () =>
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 36))
    ).join('');
    setKey(randomKey);

    // Redirect to Discord after 60 seconds (no matter what)
    const redirectTimeout = setTimeout(() => {
      window.location.href = 'https://discord.gg/RZ8qmCUZ';
    }, 60000);

    return () => clearTimeout(redirectTimeout);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
    alert('Key copied to clipboard!');
  };

  return (
    <div style={{
      fontFamily: 'Arial', textAlign: 'center', marginTop: '100px'
    }}>
      <h1>Your Access Key:</h1>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {key}
      </p>
      <button onClick={copyToClipboard}
        style={{
          padding: '10px 20px', fontSize: '16px', marginTop: '20px'
        }}>
        Copy Key
      </button>
      <p style={{ marginTop: '20px', color: 'red' }}>(do not refresh)</p>
      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Redirecting to Discord in 60 seconds...
      </p>
    </div>
  );
}
