const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi." });
    }

    const user = await User.findOne({
      where: { email, deletedAt: null }
    });

    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan atau akun sudah dihapus." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password salah." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login berhasil.",
      token: token,
    });

  } catch (error) {
    console.error("Error login:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}

module.exports = {
  login
};
