export default function handler(req, res) {
  const key = 'TJ-' + Math.random().toString(36).substr(2, 16).toUpperCase();
  res.status(200).json({ key });
}
