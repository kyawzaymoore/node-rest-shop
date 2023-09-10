const express = require('express');
const router = express.Router();

const ProductsController = require("../controllers/productsController");

//#region "Get Products List"
//#region "Swagger /products"
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieve a list of products records
 *     responses:
 *       '200':
 *         description: A successful response
 *     tags:
 *       - Products
 */
//#endregion
router.get('/', ProductsController.products_get_all);
//#endregion

//#region "Create Product"
//#region "Swagger /products"
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with a JSON request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *     responses:
 *       '200':
 *         description: Product created successfully.
 *       '400':
 *         description: Invalid input data.
 *     tags:
 *       - Products
 */
//#endregion
router.post('/', ProductsController.products_create);
//#endregion

//#region "Get Product By ID"
router.get('/:productId', ProductsController.products_get_by_id);
//#endregion

//#region "PATCH Producty By ID"
router.patch('/:productId', ProductsController.products_update);
//#endregion

//#region "DELETE Product By ID"
router.delete('/:productId', ProductsController.products_delete);
//#endregion

module.exports = router;