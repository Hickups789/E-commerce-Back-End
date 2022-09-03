const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    username: req.body.username,
  
  })
    .then((dbCatagoryData) => res.json(dbCatagoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCatagoryData) => {
      if (!dbCatagoryData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbCatagoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((dbCatagoryData) => {
    if (!dbCatagoryData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(dbCatagoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
