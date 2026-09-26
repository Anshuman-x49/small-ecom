import productModel from "../models/product.model.js";
import { uploadProductService } from "../services/storage.service.js";

//create a new product controller
const createProductController = async (req, res) => {
  try {
    // extract data from request
    const { title, description, sizes, price } = req.body;
    const images = req.files;
    const { userId } = req.user;

    // check if images are provided
    if (!images || images.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one image",
      });
    }

    // upload all images to imagekit and get urls
    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        const result = await uploadProductService({ image });
        return result.url;
      }),
    );

    // create product
    const product = await productModel.create({
      title,
      description,
      sizes,
      price,
      images: imagesUrl,
      seller: userId,
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

//get all product controller
const getAllProductController = async (req, res) => {
  try {
    const product = await productModel.find();

    if (!product && product.length === 0) {
      return res.status(404).json({
        message: "No product found",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

export { createProductController, getAllProductController };
