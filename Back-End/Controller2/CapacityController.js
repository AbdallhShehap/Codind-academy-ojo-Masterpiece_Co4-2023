const dataCategory = require("../Module/allData"); 



addCapacity = async (req, res) => {
    const {capacity	} = req.body;
  
    dataCategory.query(
        'INSERT INTO capacity (capacity) VALUES (?)',
        [capacity ],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('model added successfully');
                // You can access the inserted ID using results.insertId
                res.status(200).json({ message: 'Category added successfully' });
            }
        }
    );
  }



editCapacity = async (req, res) => {
    const itemId = req.params.id;
    const { capacity } = req.body;
    console.log(itemId);

      if (!capacity ) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataCategory.query(
        'UPDATE  capacity SET capacity = ? WHERE capacity_id = ?',
        [capacity , itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('capacity updated successfully');
                res.status(200).json({ message: 'category updated successfully' });
            }
        }
    );
}





deleteCapacity = async (req, res) => {
    const itemId = req.params.id;
        console.log(itemId);

        dataCategory.query(
        'DELETE FROM capacity WHERE capacity_id  = ?',
        [itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Category deleted successfully');
                res.status(200).json({ message: 'Category deleted successfully' });
            }
        }
    );
}



const getCapacity  = (req, res) => {

    const query = 'SELECT * FROM capacity';
    dataCategory.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  }
  


  const getCapacityById = (req, res) => {
    const itemId =  req.params.id ;
  
    const query = 'SELECT * FROM capacity  WHERE category_id  = ?'
  
    dataCategory.query(query ,
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


module.exports = { addCapacity,editCapacity, deleteCapacity , getCapacity , getCapacityById };