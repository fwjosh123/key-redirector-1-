export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const key = 'TJ-' + Array(16)
    .fill(0)
    .map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)])
    .join('');

  res.status(200).json({ key });
}
