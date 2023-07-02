const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.getAdmin);
router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.post("/logout", adminController.logout);

module.exports = router;
