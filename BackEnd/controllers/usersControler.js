const { checkUserDTO, addUserDTO } = require('../DTO/usersDTO')

const checkUserController = async( email ) => {
  const checkUser = await checkUserDTO( email )
  return checkUser
}

const newUserController = async ( user ) => {
    await addUserDTO ( user )
}

module.exports = { checkUserController, newUserController }