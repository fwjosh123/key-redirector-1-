import { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  useEffect(() => {
    const existingKey = sessionStorage.getItem('accessKey');

    if (existingKey) {
      setKey(existingKey); // Show the key from earlier this session
    } else {
      // Always generate a new key on new visit
      fetch('/api/key')
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem('accessKey', data.key); // Save it for refreshes
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
