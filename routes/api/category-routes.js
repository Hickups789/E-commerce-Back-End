const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
 Category.findAll({
   include: [
     {
       model: Product
     }
   ]
 }).then ((dbcategoryData) => res.status(200).json(dbcategoryData))
 .catch((err) => {
   console.log(err);
   res.status(400).json(err);
 });
});

router.get('/:id', (req, res) => {
Category.findOne({
  include: [
    {
      model: Product
    }
  ],
  where: {
    id:req.params.id
  }
})
.then((dbcategoryData) => res.status(200).json(dbcategoryData))
.catch((err) => {
  console.log(err);
  res.status(400).json(err);

});
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
