import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [key, setKey] = useState('');

  useEffect(() => {
    // Parse URL for ?visit= param
    const urlParams = new URLSearchParams(window.location.search);
    const visitId = urlParams.get('visit');

    if (!visitId) {
      // No visit ID? Generate one and redirect with it (treated as new visit)
      const newVisitId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      urlParams.set('visit', newVisitId);
      window.location.search = urlParams.toString(); // Force reload with visit param
      return;
    }

    // Check if we already stored a key for this visit
    const stored = sessionStorage.getItem(`key-${visitId}`);
    if (stored) {
      setKey(stored);
      return;
    }

    // Otherwise fetch a new key and save it tied to this visit ID
    fetch('/api/key')
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem(`key-${visitId}`, data.key);
        setKey(data.key);
      });
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
