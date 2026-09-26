import express from "express";
import {
  userLoginController,
  userRefreshTokenController,
  userRegisterController,
  getUserController,
  userLogoutController,
} from "../controllers/auth.controllers.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @description Route for user registration
 * @method POST
 * @url /api/auth/register
 * @access public
 */
router.post("/register", registerValidator, userRegisterController);

/**
 * @description Route for user login
 * @method POST
 * @url /api/auth/login
 * @access public
 */
router.post("/login", loginValidator, userLoginController);

/**
 * @description Route for user refresh token
 * @method POST
 * @url /api/auth/refresh
 * @access protected
 */
router.post("/refresh", userRefreshTokenController);

/** 
 * @description Route to get current logged in user
 * @method GET
 * @url /api/auth/me
 * @access protected
 */
router.get("/me", authenticationMiddleware, getUserController);

/**
 * @description Route for user logout
 * @method POST
 * @url /api/auth/logout
 * @access protected
 */
router.post("/logout", userLogoutController);

export default router;
