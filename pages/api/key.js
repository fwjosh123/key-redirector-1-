export default function handler(req, res) {
  // Generate a random 16-digit key starting with TJ-
  const key = 'TJ-' + Math.random().toString(36).substring(2, 10).toUpperCase() +
                     Math.random().toString(36).substring(2, 10).toUpperCase();
  res.status(200).json({ key: key.substring(0, 16) });
}
