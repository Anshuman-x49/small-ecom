import express from "express";
import multer from "multer";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  createProductValidator,
  deleteProductValidator,
  getSingleProductValidator,
  updateProductValidator,
} from "../validators/product.validator.js";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  updateProductController,
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
  authorizationMiddleware,
  // handle file uploads
  upload.array("images"),
  // parse array fields from string to array
  (req, res, next) => {
    if (typeof req.body?.sizes === "string") {
      req.body.sizes = JSON.parse(req.body.sizes);
    }
    if (typeof req.body?.price === "string") {
      req.body.price = JSON.parse(req.body.price);
    }
    next();
  },
  createProductValidator,
  createProductController,
);

/**
 * @description Route for update product
 * @method PUT
 * @url /api/product/id
 * @access private(only seller)
 */
router.put(
  "/:id",
  authenticationMiddleware,
  authorizationMiddleware,
  upload.array("images"),
  // parse array fields from string to array
  (req, res, next) => {
    if (typeof req.body?.sizes === "string") {
      try {
        req.body.sizes = JSON.parse(req.body.sizes);
      } catch (e) {}
    }
    if (typeof req.body?.price === "string") {
      try {
        req.body.price = JSON.parse(req.body.price);
      } catch (e) {}
    }
    next();
  },
  updateProductValidator,
  updateProductController,
);

/**
 * @description Route for delete product
 * @method DELETE
 * @url /api/product/id
 * @access private(only seller)
 */
router.delete(
  "/:id",
  authenticationMiddleware,
  authorizationMiddleware,
  deleteProductValidator,
  deleteProductController,
);

/**
 * @description Route for get all products
 * @method GET
 * @url /api/product/
 * @access public
 */
router.get("/", getAllProductController);

/**
 * @description Route for get single product
 * @method GET
 * @url /api/product/id
 * @access public
 */
router.get("/:id", getSingleProductValidator, getSingleProductController);

export default router;
