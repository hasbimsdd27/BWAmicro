const express = require("express");
const router = express.Router();
const OrderPaymentController = require("../controller/order-payment");

router.get("/", OrderPaymentController.GetOrders);

module.exports = router;
