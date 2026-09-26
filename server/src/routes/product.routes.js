import express from "express";
import multer from "multer";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";
import { createProductValidator } from "../validators/product.validator.js";
import {
  createProductController,
  getAllProductController,
} from "../controllers/product.controllers.js";

// configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5, // max 5 images
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg, jpg, png images are allowed"), false);
    }
  },
});

const router = express.Router();

/**
 * @description Route for create product
 * @method POST
 * @url /api/product/
 * @access private(only seller)
 */
router.post(
  "/",
  authenticationMiddleware,
  // check user role is seller or not
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "You are not authorized to create a product",
      });
    }
    next();
  },
  // handle file uploads
  upload.array("images"),
  // parse array fields from string to array
  (req, res, next) => {
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    next();
  },
  createProductValidator,
  createProductController,
);

/**
 * @description Route for get all products
 * @method GET
 * @url /api/product/
 * @access public
 */
router.get("/", getAllProductController);

export default router;
