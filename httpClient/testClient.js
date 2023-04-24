const axios = require('axios')


const url = "http://localhost:8080/api/productos";

const getProducts = async () => {
    const res = await axios.get(`${url}`);
    console.log(res.data);
};

const getProductById = async (id) => {
    const res = await axios.get(`${url}/${id}`);
    console.log(res.data);
};

const updateProduct = async (id, productToUpdate) => {
    await axios.put(`${url}/${id}`, productToUpdate);
};

const saveProduct = async (userToAdd) => {
    await axios.post(`${url}`, userToAdd);
};

const deleteProduct = async (id) => {
    await axios.delete(`${url}/${id}`);
};

getProducts();

saveProduct({
    timestamp: "testTimestamp",
    title: "testTitle",
    thumbnail: "testThumbnail",
    description: "testDescription",
    stock: 10,
    code: "testCode",
    price: 100,
});

getProductById("0");

updateProduct(0, {
    timestamp: "updateTimestamp",
    title: "updateTitle",
    thumbnail: "updateThumbnail",
    description: "updateDescription",
    stock: 100,
    code: "updateCode",
    price: 1000,
});

getProducts();

deleteProduct("0");

getProducts();
