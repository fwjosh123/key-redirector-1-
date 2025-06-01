export default function handler(req, res) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomPart = '';
  for (let i = 0; i < 13; i++) {
    randomPart += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  const key = 'TJ-' + randomPart;
  res.status(200).json({ key });
}
