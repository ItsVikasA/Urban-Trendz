const express = require("express");
const {
  registerUser,
  googleLogin,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const router = express.Router();

router.post("/register", registerUser);
router.post('/google-login',googleLogin)
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    message: "User is authenticated",
    user,
  });
});

module.exports = router;