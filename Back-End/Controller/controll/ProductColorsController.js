const dataProducts = require("../../Module/allData"); // Import your database connection

addProdctVarColor = async (req, res) => {
  const { product_id, color_id } = req.body;

  dataProducts.query(
    "INSERT INTO color_product (product_id, color ,image_color) VALUES (? , ?)",
    [product_id, color ,image_color],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Item added successfully");
        // You can access the inserted ID using results.insertId
        res.status(200).json({ message: "Item added successfully" });
      }
    }
  );
};

editProdctVarColor = async (req, res) => {
  const itemId = req.params.id;
  const { product_id, color ,image_color} = req.body;
  console.log(itemId);

  if (!color_id) {
    return res
      .status(400)
      .json({ error: "Missing parameters in the request body" });
  }

  dataProducts.query(
    "UPDATE color_product SET product_id = ? , color= ? , image_color = ? WHERE id = ? ",
    [product_id, color ,image_color, itemId],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Item updated successfully");
        res.status(200).json({ message: "Item updated successfully" });
      }
    }
  );
};

deleteProdctVarColor = async (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);

  dataProducts.query(
    "DELETE FROM color_product WHERE id = ?",
    [itemId],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Item deleted successfully");
        res.status(200).json({ message: "Item deleted successfully" });
      }
    }
  );
};

const getcolor = (req, res) => {
  const query = "SELECT color FROM color_product";
  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
};

const getProductcolorvariations = (req, res) => {
  const query = "SELECT * FROM color_product";
  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
};

const getProductcolorvariationsById = (req, res) => {
  const itemId = req.params.id;

  const query = "SELECT * FROM color_product  WHERE id = ?";

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json({ results });
  });
};

module.exports = {
  addProdctVarColor,
  editProdctVarColor,
  deleteProdctVarColor,
  getProductcolorvariations,getcolor,
  getProductcolorvariationsById,
};
