// const dataProducts = require("../Module/test"); // Import your database connection
const dataProducts = require("../../Module/allData"); // Import your database connection
const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });
// const IMGPATH = process.env.IMGPATH;
const multer = require("multer");
const fs = require("fs");
const path = require("path");

addProductDetails = async (req, res) => {
  const {
    product_name,
    light_title,
    price,
    old_price,
    size_screen,
    battery,
    camera,
    stock,
    category_id,
    images,
    image_main
  } = req.body;
  //Write the image to the folder using the image path and image name,
  dataProducts.query(
    "INSERT INTO products (product_name ,light_title , price, old_price, size_screen, battery,camera, stock, category_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      product_name,
      light_title,
      price,
      old_price,
      size_screen,
      battery,
      camera,
      stock,
      category_id,
    ],
    (error, result) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Item added successfully");
        //After the product added successfully we will add the product's images
        ///Adding the images paths
        // if (images) {
        //   images.forEach((img) => {
        //     //Add image on server
        //     WriteImage(img.imgName, img.imgData);

        //     //Add image path on database
        //     dataProducts.query(
        //       "INSERT INTO product_images (id_product, image_path, is_main) VALUES (?, ?, false)",
        //       [result.p_id, path],
        //       (error, results) => {
        //         if (error) {
        //           console.error(error);
        //           res.status(500).json({ error: "Internal Server Error" });
        //         } else {
        //           //console.log("Item added successfully");
        //           //res.status(200).json({ message: "image added successfully" });
        //         }
        //       }
        //     );
        //   });
        // }

        //Adding main image path
        // if (mainImage) {
        //   //Add image on server
        //   WriteImage(mainImage.mainImgName, mainImage.mainImgdata);

        //   //Add image path on database
        //   dataProducts.query(
        //     "INSERT INTO product_images (id_product, image_path, is_main) VALUES (?, ?, true)",
        //     [result.p_id, mainImage.mainImgName],
        //     (error, results) => {
        //       if (error) {
        //         console.error(error);
        //         res.status(500).json({ error: "Internal Server Error" });
        //       } else {
        //         //console.log("Item added successfully");
        //         //res.status(200).json({ message: "image added successfully" });
        //       }
        //     }
        //   );
        // }

        res.status(200).json({ message: "Item added successfully" });
      }
    }
  );
};

function WriteImage(imageName, imageData) {
  // Specify the path where you want to save the image
  const folderPath = path.join(
    "C:\\Users\\orana\\OneDrive\\سطح المكتب\\",
    "imagesIsys"
  );
  const imagePath = path.join(folderPath, imageName);

  // Ensure the folder exists, if not, create it
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Write the image data to the specified path
  fs.writeFileSync(imagePath, imageData);

  console.log("Image saved successfully.");
}

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../images');
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + path.extname());
//   },
// });

// const upload = multer({ storage: storage });

// addProductDetails = async (req, res) => {
//   // Handle image upload using multer
//   upload.single("image")(req, res, function (err) {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Image upload failed" });
//     }
//     // console.log(req);

//     if (!req.file) {
//       console.error("No file uploaded");
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const {
//       product_name,
//       color_id,
//       stock,
//       price,
//       image_slider,
//       old_price,
//       category_id,
//     } = req.body;

//     // Get the path of the uploaded image
//     const image_main = req.file.path;

//     // Save the image path in the image_main column
//     dataProducts.query(
//       "INSERT INTO products (product_name, color_id, stock, price, image_slider, old_price, category_id, image_main) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//       [
//         product_name,
//         color_id,
//         stock,
//         price,
//         image_slider,
//         old_price,
//         category_id,
//         image_main,
//       ],
//       (error, results) => {
//         if (error) {
//           console.error(error);
//           // Handle the error
//           res.status(500).json({ error: "Internal Server Error" });
//         } else {
//           console.log("Item added successfully");
//           // You can access the inserted ID using results.insertId
//           res.status(200).json({ message: "Item added successfully" });
//         }
//       }
//     );
//   });
// };

editProductDetails = async (req, res) => {
  const itemId = req.params.id;
  const {
    product_name,
    light_title,
    price,
    old_price,
    size_screen,
    battery,
    camera,
    stock,

    category_id,
  } = req.body;
  console.log(itemId);

  if (
    !product_name ||
    !light_title ||
    !price ||
    !old_price ||
    !size_screen ||
    !battery ||
    !camera ||
    !stock ||
    !category_id
  ) {
    return res
      .status(400)
      .json({ error: "Missing parameters in the request body" });
  }
  console.log("###########################" + category_id);
  dataProducts.query(
    "UPDATE products SET product_name = ? , light_title = ? , price = ?, old_price = ? , size_screen = ?, battery = ? , camera = ? , stock = ? , category_id = ?  WHERE p_id = ?",
    [
      product_name,
      light_title,
      price,
      old_price,
      size_screen,
      battery,
      camera,
      stock,
      category_id,
      itemId,
    ],
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

deleteProductDetails = async (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);

  dataProducts.query(
    "DELETE FROM products WHERE p_id = ?",
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

const getProductDetails = (req, res) => {
  //Read the image from the folder using the image path and image name saved in database
  const query = "SELECT *  FROM products";
  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
};

const getProductDetailsImacById = (req, res) => {
  const itemId = req.params.id;

  const query = `SELECT products.*
  FROM products
  JOIN category ON products.category_id = categorY.category_id
  WHERE category.category_name = 'iMac' `;

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsIphoneById = (req, res) => {
  const itemId = req.params.id;

  const query = `SELECT products.*
  FROM products
  JOIN category ON products.category_id = category.category_id
  WHERE category.category_name = 'iPhone' `;

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsIpadById = (req, res) => {
  const itemId = req.params.id;

  const query = `SELECT products.*
  FROM products
  JOIN category ON products.category_id = category.category_id
  WHERE category.category_name = 'iPad' `;

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsWatchById = (req, res) => {
  const itemId = req.params.id;

  const query = `SELECT products.*
  FROM products
  JOIN category ON products.category_id = category.category_id
  WHERE category.category_name = 'Watch' `;

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsAudioById = (req, res) => {
  const itemId = req.params.id;

  const query = `SELECT products.*
  FROM products
  JOIN category ON products.category_id = category.category_id
  WHERE category.category_name = 'Audio' `;

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsAppleTvById = (req, res) => {
  const itemId = req.params.id;

  const query = `SELECT products.*
  FROM products
  JOIN category ON products.category_id = category.category_id
  WHERE category.category_name = 'Apple TV' `;

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsAccessoriesTvById = (req, res) => {
  const itemId = req.params.id;

  const query = `SELECT products.*
  FROM products
  JOIN category ON products.category_id = category.category_id
  WHERE category.category_name = 'Accessories' `;

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

module.exports = {
  addProductDetails,
  editProductDetails,
  deleteProductDetails,
  getProductDetails,
  getProductDetailsIphoneById,
  getProductDetailsImacById,
  getProductDetailsIpadById,
  getProductDetailsWatchById,
  getProductDetailsAudioById,
  getProductDetailsAppleTvById,
  getProductDetailsAccessoriesTvById,
};

// const getProductDetailsImacById = (req, res) => {
//   const itemId = req.params.id;

//   const query =
//     "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 2";

//   dataProducts.query(query, [itemId], (err, results) => {
//     if (err) {
//       console.error("Error executing SQL query:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }

//     console.log(results);
//     res.status(200).json(results);
//   });
// };

// const getProductDetailsIphoneById = (req, res) => {
//   const itemId = req.params.id;

//   const query =
//     "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 3";

//   dataProducts.query(query, [itemId], (err, results) => {
//     if (err) {
//       console.error("Error executing SQL query:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }

//     console.log(results);
//     res.status(200).json(results);
//   });
// };

// const getProductDetailsIpadById = (req, res) => {
//   const itemId = req.params.id;

//   const query =
//     "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 2";

//   dataProducts.query(query, [itemId], (err, results) => {
//     if (err) {
//       console.error("Error executing SQL query:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }

//     console.log(results);
//     res.status(200).json(results);
//   });
// };

// const getProductDetailsWatchById = (req, res) => {
//   const itemId = req.params.id;

//   const query =
//     "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 4";

//   dataProducts.query(query, [itemId], (err, results) => {
//     if (err) {
//       console.error("Error executing SQL query:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }

//     console.log(results);
//     res.status(200).json(results);
//   });
// };

// const getProductDetailsAudioById = (req, res) => {
//   const itemId = req.params.id;

//   const query =
//     "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 5";

//   dataProducts.query(query, [itemId], (err, results) => {
//     if (err) {
//       console.error("Error executing SQL query:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }

//     console.log(results);
//     res.status(200).json(results);
//   });
// };

// const getProductDetailsAppleTvById = (req, res) => {
//   const itemId = req.params.id;

//   const query =
//     "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 6";

//   dataProducts.query(query, [itemId], (err, results) => {
//     if (err) {
//       console.error("Error executing SQL query:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }

//     console.log(results);
//     res.status(200).json(results);
//   });
// };

// const getProductDetailsAccessoriesTvById = (req, res) => {
//   const itemId = req.params.id;

//   const query =
//     "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 7";

//   dataProducts.query(query, [itemId], (err, results) => {
//     if (err) {
//       console.error("Error executing SQL query:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }

//     console.log(results);
//     res.status(200).json(results);
//   });
// };
