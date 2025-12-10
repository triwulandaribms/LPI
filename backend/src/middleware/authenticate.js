const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Mohon masukkan token.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Format token tidak valid.' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const path = req.baseUrl;

    // untuk admin bisa akses semua route
    if (decoded.role === 'admin') return next();

    // untuk staff hanya bisa akses route pegawai saja
    if (path.startsWith('/api/pegawai') && decoded.role === 'staff') {
      return next();
    }

    return res.status(403).json({ message: 'Akses ditolak.' });

  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid.' });
  }
}

module.exports = { authMiddleware };
