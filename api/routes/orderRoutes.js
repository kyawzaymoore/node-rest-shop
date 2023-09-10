const express = require('express');
const router = express.Router();

const OrdersController = require("../controllers/ordersController");

//#region "Swagger /orders"
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get a list of orders
 *     description: Retrieve a list of orders records
 *     responses:
 *       '200':
 *         description: A successful response
 *     tags:
 *       - Orders
 */
//#endregion
router.get('/', OrdersController.orders_get_all);

router.post('/', OrdersController.orders_create);

router.get('/:orderId', OrdersController.orders_get_by_id);

router.patch('/:orderId', OrdersController.orders_update);

router.delete('/:orderId', OrdersController.orders_delete);

module.exports = router;