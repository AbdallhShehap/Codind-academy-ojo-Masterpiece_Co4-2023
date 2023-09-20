const dataProducts = require("../../Module/allData"); // Import your database connection
const mysql = require("mysql");


const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage });
const fs = require('fs');
const path = require('path'); // Import the path module

// ...

// Create a function to handle the upload of multiple images
const uploadMultiple = (req, res, next) => {
  upload.array('image')(req, res, (err) => {
    if (err) {
      console.error('Error uploading images:', err);
      return res.status(500).json({ error: 'Image upload failed' });
    }
    next();
  });
};

app.post('/upload', uploadMultiple, (req, res) => {
  // Handle the uploaded images
  const uploadDirectory = 'C:/Users/orana/OneDrive/سطح المكتب/imagesIsys'; // Use forward slashes

  // Initialize an array to store image file paths
  const imagePaths = [];

  // Loop through the uploaded files and save each one
  req.files.forEach((file) => {
    const fileName = file.originalname; // Use the original filename of the uploaded file
    const filePath = path.join(uploadDirectory, fileName); // Create the full file path using path.join

    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error('Error saving an image:', err);
        return res.status(500).json({ error: 'Image upload failed' });
      }
      console.log('Image saved successfully:', filePath);
      imagePaths.push(filePath); // Add the saved image path to the array
    });
  });

  // Call the addProduct function with the imagePaths array
  addProduct(imagePaths)
    .then(() => {
      res.status(200).json({ message: 'Images uploaded and saved successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Modify the addProduct function to accept an array of image paths
const addProduct = async (imagePaths) => {
  const body = req.body;
  const imagesPaths = imagePaths; // Use the array of image paths

  // Your database insertion logic here
  // ...

  return new Promise((resolve, reject) => {
    dataProducts.query(
      'INSERT INTO product_images (id_product, image_path) VALUES (?, ?)',
      [id_product, image_path], // Use the array of image paths
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log('Item added successfully');
          resolve();
        }
      }
    );
  });
};














// addProduct = async (req, res) => {
//   const body = req.body;
//   const imagesPaths = body.imagesPaths;

//   imagesPaths.forEach(path => {
//     dataProducts.query(
//       'INSERT INTO product_images (id_product, image_path) VALUES (?, ?)',
//       [id_product, image_path], // Use the array of image URLs
//       (error, results) => {
//         if (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//           console.log('Item added successfully');
//           res.status(200).json({ message: 'Item added successfully' });
//         }
//       }
//     );
//   });
// };



editProduct = async (req, res) => {
    const itemId = req.params.id;
    const {id_product, image_path	} = req.body;
    console.log(itemId);

      if (!id_product || !image_path	) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataProducts.query(
        'UPDATE product_images SET id_product = ?, image_path = ? WHERE id  = ?',
        [id_product, images_product, itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Item updated successfully');
                res.status(200).json({ message: 'Item updated successfully' });
            }
        }
    );
}


    deleteProduct = async (req, res) => {
        const itemId = req.params.id;
            console.log(itemId);
    
        dataProducts.query(
            'DELETE FROM product_images WHERE id = ?',
            [itemId],
            (error, results) => {
                if (error) {
                    console.error(error);
                    // Handle the error
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Item deleted successfully');
                    res.status(200).json({ message: 'Item deleted successfully' });
                }
            }
        );
    }


    const getProduct  = (req, res) => {

        const query = 'SELECT * FROM product_images';
        dataProducts.query(query, (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          res.json(results);
        });
      }
      


      const getProductById = (req, res) => {
        const itemId =  req.params.id ;
      
        const query = 'SELECT * FROM product_images  WHERE id = ?'
      
        dataProducts.query(query ,
        [itemId], (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }

          
           console.log(results);
           res.status(200).json({ results });
        });
      }
      

      // const getProductIphone  = (req, res) => {

      //   const query = 'SELECT * FROM product_image WHERE p_category = 10';
      //   dataProducts.query(query, (err, results) => {
      //     if (err) {
      //       console.error('Error executing SQL query:', err);
      //       res.status(500).json({ error: 'Internal server error' });
      //       return;
      //     }
      //     res.json(results);
      //   });
      // }

module.exports = {addProduct , editProduct , deleteProduct ,getProduct , getProductById  }