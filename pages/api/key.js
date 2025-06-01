import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data/keys.json');

function readKeys() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeKeys(keys) {
  fs.writeFileSync(filePath, JSON.stringify(keys, null, 2));
}

function generateKey() {
  return 'TJ-' + Array.from({ length: 16 }, () =>
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]
  ).join('');
}

export default function handler(req, res) {
  // Read current keys
  const keys = readKeys();

  // Generate a unique key
  let newKey;
  do {
    newKey = generateKey();
  } while (keys.find(k => k.key === newKey));

  // Store as unused key
  keys.push({ key: newKey, used: false, createdAt: new Date().toISOString() });

  writeKeys(keys);

  res.status(200).json({ key: newKey });
}
