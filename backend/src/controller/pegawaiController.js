const Pegawai = require("../models/pegawaiModel");

async function getPegawai(_req, res) {
  try {
    const data = await Pegawai.findAll({
      attributes:["id", "name","email", "phone", "position", "photo"],
      where: { deletedAt: null}
    })
    

    if (data.length === 0) {
      return res.status(404).json({ message: "Belum ada data pegawai." });
    }

    res.status(200).json({
      message: "sukses",
      data,
    });
  } catch (error) {
    console.error("Error getPegawai:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}

async function getPegawaiBy(req, res) {
  try {
    const { id } = req.params;

    const pegawai = await Pegawai.findOne({
      attributes: ["id", "name", "email", "phone", "position", "photo"],
      where: {
        id,
        deletedAt: null
      }
    });

    if (!pegawai) {
      return res.status(404).json({
        message: "Pegawai tidak ditemukan."
      });
    }

    res.status(200).json({
      message: "sukses",
      data: pegawai,
    });

  } catch (error) {
    console.error("Error getPegawaiById:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}

async function createPegawai(req, res) {
  try {
    const { name, email, phone, position } = req.body;

    if (!name || !email || !phone || !position) {
      return res.status(400).json({ message: "Semua field wajib diisi." });
    }

    let photoFileName = null;

    if (req.file) {
      const cekType = ["image/jpeg", "image/jpg"];
      if (!cekType.includes(req.file.mimetype)) {
        return res.status(400).json({
          message: "Format foto harus JPG atau JPEG.",
        });
      }

      const ukuranFoto = 300 * 1024; 
      if (req.file.size > ukuranFoto) {
        return res.status(400).json({
          message: "Ukuran foto maksimal 300KB.",
        });
      }

      photoFileName = req.file.filename;
    }

    const pegawai = await Pegawai.create({
      name,
      email,
      phone,
      position,
      photo: photoFileName,
      created_by: req.user.id,
    });

    res.status(201).json({
      message: "Sukses",
      data: pegawai,
    });

  } catch (error) {
    console.error("Error createPegawai:", error.message);
    res.status(400).json({ message: error.message });
  }
}

async function updatePegawai(req, res) {
  try {
    const { id } = req.params;

    const pegawai = await Pegawai.findOne({
      where: { id, deletedAt: null }
    });

    if (!pegawai) {
      return res.status(404).json({
        message: "Pegawai tidak ditemukan atau sudah dihapus."
      });
    }

    let photoFileName = pegawai.photo; 

    if (req.file) {
      const cekType = ["image/jpeg", "image/jpg"];
      if (!cekType.includes(req.file.mimetype)) {
        return res.status(400).json({
          message: "Format foto harus JPG atau JPEG.",
        });
      }

      const ukuranFoto = 300 * 1024;
      if (req.file.size > ukuranFoto) {
        return res.status(400).json({
          message: "Ukuran foto maksimal 300KB.",
        });
      }

      photoFileName = req.file.filename;
    }

    const updateData = {
      name: req.body.name || pegawai.name,
      email: req.body.email || pegawai.email,
      phone: req.body.phone || pegawai.phone,
      position: req.body.position || pegawai.position,
      photo: photoFileName
    };

    await Pegawai.update(updateData, { where: { id } });

    return res.status(200).json({
      message: "Pegawai berhasil diupdate.",
      data: updateData
    });

  } catch (error) {
    console.error("Error updatePegawai:", error.message);
    res.status(400).json({ message: error.message });
  }
}

async function deletePegawai(req, res) {
  try {
    const { id } = req.params;

    const pegawai = await Pegawai.findOne({
      where: { 
        id, 
        deletedAt: null 
      }
    });

    if (!pegawai) {
      return res.status(404).json({
        message: "Pegawai tidak ditemukan atau sudah dihapus."
      });
    }

    await pegawai.destroy();

    return res.status(200).json({
      message: "Pegawai berhasil dihapus."
    });

  } catch (error) {
    console.error("Error deletePegawai:", error.message);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}


module.exports = {
  getPegawai,
  getPegawaiBy,
  createPegawai,
  updatePegawai,
  deletePegawai,
};
