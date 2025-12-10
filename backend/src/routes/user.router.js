const router = require("express").Router();
const userController = require("../controller/userController");

router.get("/get", userController.getUsers);
router.get("/get-by/:id", userController.getUserBy);
router.post("/add", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
