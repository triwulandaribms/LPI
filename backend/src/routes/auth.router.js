const router = require("express").Router();
const { login} = require("../controller/authContoller");

router.post("/login", login);


module.exports = router;
