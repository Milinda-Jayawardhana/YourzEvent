import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js"

const validateCategorySelection = async (majorCategory, category, subCategory) => {
    const categoryDoc = await categoryModel.findOne({ majorCategory, name: category });
    if (!categoryDoc) {
        return "Selected category does not exist in the chosen major category";
    }

    const hasSubCategory = categoryDoc.subcategories.some(
        (item) => item.name === subCategory
    );

    if (!hasSubCategory) {
        return "Selected subcategory does not exist in the chosen category";
    }

    return null;
}

//add product
const addProduct = async(req, res) => {
    try {
        const {
            name, 
            description, 
            price, 
            majorCategory,
            category, 
            subCategory, 
            bestseller,
            stockStatus // New field
        } = req.body;

        if (!['Flower Bouquets', 'Gift Items'].includes(majorCategory)) {
            return res.json({ success: false, message: "Major category must be Flower Bouquets or Gift Items" });
        }

        const categoryError = await validateCategorySelection(majorCategory, category, subCategory);
        if (categoryError) {
            return res.json({ success: false, message: categoryError });
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]


        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;
            })
        )

    

        const productData = {
            name,
            description,
            price: Number(price),
            majorCategory,
            category,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now(),
            stockStatus: stockStatus || 'In Stock', 
        }
        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        res.json({success: true, message: "Product Added Successfully"})
    }
    catch(error){
        res.json({success: false, message: error.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            price,
            majorCategory,
            category,
            subCategory,
            bestseller,
            stockStatus,
        } = req.body;

        if (!['Flower Bouquets', 'Gift Items'].includes(majorCategory)) {
            return res.json({ success: false, message: "Major category must be Flower Bouquets or Gift Items" });
        }

        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        const categoryError = await validateCategorySelection(majorCategory, category, subCategory);
        if (categoryError) {
            return res.json({ success: false, message: categoryError });
        }

        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        const newImages = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = existingProduct.image;
        if (newImages.length > 0) {
            imagesUrl = await Promise.all(
                newImages.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                    return result.secure_url;
                })
            );
        }

        const updatedFields = {
            name,
            description,
            price: Number(price),
            majorCategory,
            category,
            subCategory,
            bestseller: bestseller === "true" || bestseller === true,
            image: imagesUrl,
        };

        if (stockStatus) {
            updatedFields.stockStatus = stockStatus;
        }

        await productModel.findByIdAndUpdate(id, updatedFields);

        res.json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//list product
// List products sorted by most recent (newest first)
const listProducts = async (req, res) => {
    try {
        // Sort by date field in descending order so newest products appear first
        const products = await productModel.find({}).sort({ date: -1 }); 
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//function remove Product
const removeProduct = async(req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product Deleted Successfully"})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//single product info
const singleProduct = async(req, res) => {
    try {
        const productId = req.body.productId || req.params.id
        const product = await productModel.findById(productId)
        res.json({success: true, product})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Update product stock status
const updateStockStatus = async(req, res) => {
    try {
        const { productId, stockStatus } = req.body
        
        if (!['In Stock', 'Out of Stock', 'Limited Stock'].includes(stockStatus)) {
            return res.json({ 
                success: false, 
                message: "Invalid stock status. Must be 'In Stock', 'Out of Stock', or 'Limited Stock'" 
            })
        }
        
        await productModel.findByIdAndUpdate(productId, { stockStatus })
        res.json({ success: true, message: "Stock status updated successfully" })
    } catch(error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update product best seller status
const updateBestSeller = async(req, res) => {
    try {
        const { productId, bestseller } = req.body
        await productModel.findByIdAndUpdate(productId, { bestseller })
        res.json({ success: true, message: "Best seller status updated successfully" })
    } catch(error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    singleProduct, 
    removeProduct, 
    listProducts, 
    addProduct,
    updateProduct,
    updateStockStatus, // New function export
    updateBestSeller
}
