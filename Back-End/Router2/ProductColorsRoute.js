const express = require("express");
const router = express.Router();
const products = require("../Controller/controll/ProductColorsController");

router.post("/add", products.addProdctVarColor);

router.put("/edit/:id", products.editProdctVarColor);

router.delete("/delete/:id", products.deleteProdctVarColor);

router.get("/getcolorproduct", products.getProductcolorvariations);

router.get("/getcolor", products.getcolor);

router.get("/getcolororoduct/:id", products.getProductcolorvariationsById);
module.exports = router;
