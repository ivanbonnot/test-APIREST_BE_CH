const factoryDAO = require('../DAO/factory')


const checkUserDTO = async( email ) => {
  const users = factoryDAO()
  const userCheck = await users.getUserBy( email )
  return userCheck
}

const addUserDTO = async( user) => {
  const users = factoryDAO()
  const newUser = await users.saveUser( user )
  return newUser
}


module.exports = { checkUserDTO, addUserDTO }

