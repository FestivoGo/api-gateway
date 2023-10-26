const router = require("express").Router();
const adminController = require("../../controllers/v1/adminController");
const limiter = require("../../utils/RateLimiter");

router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getAdminById);
router.post("/register", adminController.register);
router.post("/login",limiter, adminController.login);
router.post("/logout", adminController.logout);
router.put("/", adminController.updateAdmin);
router.put("/password", adminController.resetPassword);
router.delete("/", adminController.deleteAdmin);

module.exports = router;