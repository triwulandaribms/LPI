const router = require("express").Router();
const pegawaiController = require("../controller/pegawaiController");
const upload = require("../middleware/uploads");

router.get("/get", pegawaiController.getPegawai);
router.get("/get-by/:id", pegawaiController.getPegawaiBy);
router.post("/add", upload.single("photo"), pegawaiController.createPegawai);
router.put("/update/:id", upload.single("photo"), pegawaiController.updatePegawai);
router.delete("/delete/:id", pegawaiController.deletePegawai);

module.exports = router;
