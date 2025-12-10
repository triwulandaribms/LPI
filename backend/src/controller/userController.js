const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");

async function getUsers(_req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
      where: { deletedAt: null }
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "Belum ada data user." });
    }

    res.status(200).json({
      message: "Sukses",
      data: users
    });
  } catch (error) {
    console.error("Error getUsers:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function getUserBy(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: id,
        deletedAt: null
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "Data user tidak ditemukan."
      });
    }

    res.status(200).json({
      message: "Sukses",
      data: user
    });

  } catch (error) {
    console.error("Error getUserById:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function createUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Semua field wajib diisi." });
    }

    const cekEmail = await User.findOne({ where: { email } });

    if (cekEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar." });
    }

    const allUsers = await User.findAll({ attributes: ["password"] });
    for (const user of allUsers) {
      const cekPasswordSama = await bcrypt.compare(password, user.password);
      if (cekPasswordSama) {
        return res.status(400).json({
          message: "Password ini sudah pernah digunakan. Gunakan password lain."
        });
      }
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hash,
      role
    });

    return res.status(201).json({
      message: "User berhasil dibuat",
      data: newUser
    });

  } catch (error) {
    console.error("Error createUser:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id, deletedAt: null }
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    if (req.body.password) {
      const bcrypt = require("bcrypt");
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
    }

    await User.update(req.body, {
      where: { id, deletedAt: null }
    });

    const updatedUser = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] } 
    });

    res.status(200).json({
      message: "User berhasil diupdate.",
      data: updatedUser
    });

  } catch (error) {
    console.error("Error updateUser:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function deleteUser(req, res) {

  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        deletedAt: null
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan atau sudah dihapus.",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "User berhasil dihapus."
    });

  } catch (error) {
    console.error("Error deleteUser:", error.message);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}


module.exports = {
  getUsers,
  getUserBy,
  createUser,
  updateUser,
  deleteUser
};
