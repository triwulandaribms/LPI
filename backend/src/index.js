const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { sequelize } = require('./config/db.js');

const authRoutes = require("./routes/auth.router");
const userRoutes = require("./routes/user.router");
const pegawaiRoutes = require("./routes/pegawai.router");

const { authMiddleware } = require("./middleware/authenticate.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static("src/uploads"));

app.use("/api/auth", authRoutes);

app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/pegawai", authMiddleware, pegawaiRoutes);

(async () => {

    try {

        await sequelize.authenticate();
        console.log('Terhubung ke database');

        await sequelize.sync({ alter: true });
        console.log("Berhasil sinkronisasi");

        app.listen(3000, () => {
            console.log("Server berjalan di port 3000");
        });

    } catch (err) {
        console.error("Gagal menghubungkan database:", err.message);
    }

})();
