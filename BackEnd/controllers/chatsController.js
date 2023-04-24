const { getAllChatsDTO, addChatDTO } = require('../DTO/chatDto')


const getAllChatsController = async() => {
  const allChats = await getAllChatsDTO()
  return allChats
}


const addChatController = async ( message ) => {
  addChatDTO( message )
  return 
}

module.exports = { getAllChatsController, addChatController }