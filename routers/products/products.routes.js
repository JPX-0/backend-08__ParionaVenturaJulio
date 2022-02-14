const express = require(`express`);
const Contenedor = require(`../../data/clase`);

const router = express.Router();

const products = new Contenedor();

router.get(`/`, (req, res) => {
  products.getAll(req, res)
});

router.get(`/:productId`, (req, res) => {
  products.getOne(req, res);
});

router.post(`/`, (req, res) => {
  products.save(req, res);
});

router.put(`/:productId`, (req, res) => {
  products.update(req, res);
});

router.delete(`/:productId`, (req, res) => {
  products.deleteOne(req, res);
});

module.exports = router;