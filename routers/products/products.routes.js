const express = require(`express`);
const Contenedor = require(`../../data/clase`);

const router = express.Router();

const products = new Contenedor();

router.get(`/`, (req, res) => {
  products.getAll(req, res); // Obtine todos los productos.
});

router.get(`/:productId`, (req, res) => {
  products.getOne(req, res); // Obtine el producto que coincida su ID.
});

router.post(`/`, (req, res) => {
  products.save(req, res); // Agrega un nuevo producto.
});

router.put(`/:productId`, (req, res) => {
  products.update(req, res); // Actualiza un producto existente.
});

router.delete(`/:productId`, (req, res) => {
  products.deleteOne(req, res); // Elimina el producto que coincida su ID
});

module.exports = router;