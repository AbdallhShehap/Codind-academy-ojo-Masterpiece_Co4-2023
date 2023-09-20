const dataProducts = require("../../Module/allData"); // Import your database connection

addProductCapacity = async (req, res) => {
  const { product_id, capacity } = req.body;

  dataProducts.query(
    "INSERT INTO product_capacity (product_id ,capacity ) VALUES (? , ?)",
    [product_id, capacity],
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

editProductCapacity  = async (req, res) => {
  const itemId = req.params.id;
  const { product_id, capacity } = req.body;
  console.log(itemId);

  if (!capacity) {
    return res
      .status(400)
      .json({ error: "Missing parameters in the request body" });
  }

  dataProducts.query(
    "UPDATE product_capacity SET capacity  = ? WHERE id = ? ",
    [product_id, capacity, itemId],
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

deleteProductCapacity  = async (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);

  dataProducts.query(
    "DELETE FROM product_capacity WHERE id = ?",
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

const getProductCapacity  = (req, res) => {
  const query = "SELECT * FROM product_capacity";
  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
};


const getCapacity  = (req, res) => {
  const query = "SELECT capacity FROM product_capacity";
  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
};

const getProductCapacityById = (req, res) => {
  const itemId = req.params.id;

  const query = "SELECT * FROM product_capacity  WHERE id  = ?";

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
  addProductCapacity ,
  editProductCapacity ,
  deleteProductCapacity ,
  getProductCapacity ,getCapacity,
  getProductCapacityById,
};
