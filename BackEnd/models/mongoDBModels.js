const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose



const cartSchema = new Schema({
    timestamp: { type: Number, require: true },
    productos: { type: Array, required: true }
})



const chatSchema = new Schema({
    author: {
        email: { type: String, require: true },
        name: { type: String, require: true },
        lastname: { type: String, require: true },
        age: { type: Number, require: true },
        nickname: { type: String, require: true },
        avatar: { type: String, require: true },
    },
    text: { type: String, require: true },
    date: { type: Date, require: true },
});



const productoSchema = new Schema({
    timestamp: { type: Number, require: true },
    title: { type: String },
    thumbnail: { type: String },
    description: { type: String },
    stock: { type: Number },
    code: { type: String },
    price: { type: Number }
});



const userSchema = new Schema({
    timestamp: { type: Number, require: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: 'Buffer' },
    cartId: { type: Schema.Types.ObjectId, require: true }
});


userSchema.pre('save', function (next) {
    const user = this;

    // Si la contraseña no se ha modificado, sigue adelante
    if (!user.isModified('password')) {
        return next();
    }

    // Genera un hash para la contraseña
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});


const userModel = model('User', userSchema)
const productModel = model('Productos', productoSchema)
const chatModel = model('Chat', chatSchema);
const cartModel = model('Cart', cartSchema)


module.exports = {cartModel, chatModel, productModel, userModel}