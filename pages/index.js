import { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    // Always get a fresh key by forcing unique query param
    fetch('/api/key?ts=' + Date.now())
      .then((res) => res.json())
      .then((data) => setKey(data.key));

    // Force redirect after 60 seconds, regardless of tab state
    const timer = setTimeout(() => {
      window.close();
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
    alert('Key copied!');
  };

  return (
    <div style={{
      fontFamily: 'Arial', textAlign: 'center', marginTop: '100px'
    }}>
      <h1>Your Access Key:</h1>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {key || 'Loading...'}
      </p>

      {key && (
        <button onClick={copyToClipboard}
          style={{
            padding: '10px 20px', fontSize: '16px', marginTop: '20px'
          }}>
          Copy Key
        </button>
      )}

      <p style={{ marginTop: '20px', color: 'red' }}>(do not refresh)</p>
      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Redirecting to Discord in 60 seconds...
      </p>
    </div>
  );
}
