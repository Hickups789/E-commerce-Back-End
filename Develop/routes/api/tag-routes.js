const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.finAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((dbTagdata) => res.status(200).json(dbTagdata))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagdata) => res.status(200).json(dbTagdata))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagdata) => res.json(dbTagdata))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    indivdualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagdata) => {
      if (!dbTagdata) {
        res.status(404).json({ message: "Tag does not exist" });
      }
      res.json(dbTagdata);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteResponse) => res.json(deleteResponse))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
