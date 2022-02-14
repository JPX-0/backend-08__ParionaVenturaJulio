const { products } = require(`./data`);

class Contenedor {
  getAll = (req, res) => {
    const { maxPrice, search } = req.query;
    let productsResponse = [...products];
    if (Object.keys(req.query).length > 0) {
      if (maxPrice) {
        if (isNaN(+maxPrice)) return res.status(400).json({success: false, error: `maxPrice must be a valid number`});
        productsResponse = productsResponse.filter(product => product.price <= +maxPrice);
      }
      if (search)  productsResponse = productsResponse.filter(product => product.title.toLowerCase().startsWith(search.toLowerCase()));
      return res.json({success: true, result: productsResponse });
    }
    return res.json({success: true, result: productsResponse });
  }
  getOne = (req, res) => {
    const { productId } = req.params;
    const product = products.find(product => product.id === +productId);
    if (!product) return res.status(404).json({ success: false, error: `Producto no encontrado`});
    return res.json({ success: true, result: product });
  }
  save = (req, res) => {
    const { title, price, thumbnail } = req.body;
    if ( !title || !price || !thumbnail) return res.status(400).json({ success: false, error: `Wrong body format` });
    const findId = products.map(item => item.id); // Obtine todos los ID del array.
    let newId; // Guarda el nuevo ID
    if(findId.length == 0) newId = 1; // Se asegura en guardar un 1 si está vacío el array.
    else newId = Math.max.apply(null, findId) + 1; // Busca máximo ID y aumenta en 1.
    const newProduct = {
      id: newId,
      title,
      price,
      thumbnail
    };
    products.push(newProduct);
    return res.json({ success: true, result: newProduct }); // Devulve el nuevo producto con su nuevo ID.
  }
  update = (req, res) => {
    const { params: { productId }, body: { title, price, thumbnail} } = req;
    if ( !title || !price || !thumbnail) return res.status(400).json({ success: false, error: `Wrong body format` });
    const productIndex = products.findIndex(product => product.id === +productId);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Producto no encontrado`});
    const newProduct = {
      ...products[productIndex],
      title,
      price,
      thumbnail
    };
    products[productIndex] = newProduct;
    return res.json({ success: true, result: newProduct});
  }
  deleteOne = (req, res) => {
    const { productId } = req.params;
    const productIndex = products.findIndex(product => product.id === +productId);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Producto no encontrado`});
    products.splice(productIndex, 1);
    return res.json({ success: true, result: `Product correctly eliminated` });
  }
}

module.exports = Contenedor;