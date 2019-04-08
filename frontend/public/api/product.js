// import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

function getProducts() {
    axios.get('/api/products')
        .then(function (response){
            console.log(response);
        })
        .catch(function(err) {
            console.log(err);
    })
}

// Passar Id do Objeto
function getProductId(productid) {
    axios.get(`/api/product/${productid}`)
    .then(function (response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
}

//Passar Categoria do Objeto
function getProductByCategory(category) {
    axios.get(`/api/productsByCategory/${category}`)
    .then(function (response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
}

// Passar Id do Objeto
function deleteProduct(productid) {
    axios.delete(`/api/deleteProduct/${productid}`)
    .then(function (response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
}

// Passar objeto, no caso do product image, ele só pega o endereço da imagem

// {
//     category: {type:String, require: true},
//     measure: String,
//     price: Number,
//     description: String,
//     productImage: {type: String, required: true}
// }

function addProduct(product) {
    axios.post(`/api/registerProduct`, product)
    .then(function (response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
    console.log(product);
}

// {
//     id: String
//     category: {type:String, require: true},
//     measure: String,
//     price: Number,
//     description: String,
//     productImage: {type: String, required: true}
// }

function updateProduct(product) {
    axios.put(`/api/product/${product.id}`, product)
    .then(function (response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
    console.log(product);
}

