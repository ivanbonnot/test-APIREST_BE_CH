const factoryDAO = require('../DAO/factory')

const addNewProductDTO = async( prod ) => {
  console.log( prod )
  const products = factoryDAO()
  await products.saveProduct( prod )
  return 
}

const getProductsDTO = async() => {
  const products = factoryDAO()
  const allProducts = await products.getProducts()
  return allProducts
}

const getProductByIdDTO = async( id ) => {
  const products = factoryDAO()
  const productById = await products.getProductById( id )
  return productById
}

const updateProductDTO = async( id, prodToUpdate ) => {
  const products = factoryDAO()
  const productUpd = await products.updateProduct( id, prodToUpdate )
  return productUpd
}

const deleteProductDTO = async( id ) => {
  const products = factoryDAO()
  await products.deleteProduct( id )
  return 
}

const deleteAllProductsDTO = async() => {
  const products = factoryDAO()
  await products.deleteAllProducts()
  return 
}


module.exports = { getProductsDTO, getProductByIdDTO, deleteProductDTO, deleteAllProductsDTO, addNewProductDTO, updateProductDTO }

