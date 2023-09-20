const express = require("express");
const router = express.Router();
const productcapacityDetails = require("../Controller/controll/ProductCapacityController");

router.post("/add", productcapacityDetails.addProductCapacity);

router.put("/edit/:id", productcapacityDetails.editProductCapacity);

router.delete("/delete/:id", productcapacityDetails.deleteProductCapacity);


router.get("/getproductscapacity", productcapacityDetails.getProductCapacity);

router.get("/getcapacity", productcapacityDetails.getCapacity);

router.get("/getcapacity/:id", productcapacityDetails.getProductCapacityById);

module.exports = router;
