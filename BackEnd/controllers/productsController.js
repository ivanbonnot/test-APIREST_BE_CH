const { getProductsDTO, getProductByIdDTO, deleteProductDTO, addNewProductDTO, updateProductDTO } = require('../DTO/productsDTO')


const newProductController = async (productToAdd) => {
  await addNewProductDTO(productToAdd)
  return
}

const getAllProductsController = async () => {
  const products = await getProductsDTO()
  return products
}

const getProductByIdController = async (id) => {
  const product = await getProductByIdDTO(id)
  return product
}

const updateProductController = async (id, productToUpdate) => {
  const prodToUpd = await updateProductDTO(id, productToUpdate)
  return prodToUpd
}

const delProductByIdController = async (id) => {
  await deleteProductDTO(id)
  return
}


module.exports = { newProductController, getAllProductsController, getProductByIdController, delProductByIdController, updateProductController }