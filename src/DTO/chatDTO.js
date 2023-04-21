const factoryDAO = require('../DAO/factory')


const getAllChatsDTO = async() => {
  const chats =  factoryDAO()
  const allChats = await chats.getAllChats()
  return allChats
}

const addChatDTO = async( message ) => {
  const chats = factoryDAO()
  await chats.saveChat( message )
  return 
}



module.exports = { getAllChatsDTO, addChatDTO }