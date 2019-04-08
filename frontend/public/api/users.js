// import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';


function getUsers() {
    axios.get('/api/users')
        .then(function (response){
            console.log(response);
        })
        .catch(function(err) {
            console.log(err);
    })
}

// Passar Id do Objeto
function getUserbyid(userid) {
    axios.get(`/api/User/${userid}`)
    .then(function (response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
}

// Passar Id do Objeto
function deleteProduct(userid) {
    axios.delete(`/api/user/${userid}`)
    .then(function (response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
}

// Passar objeto user
// {
//     email: { type: String, unique: true, require: true },
//     name: String,
//     phone: String,
//     obs: String,
//     productList: [
//         {
//             productId:{ type: String, required: true},
//             quantity: Number,
//         }
//     ],
// }

function addUser(user) {
    axios.post(`/api/registerUser`, user)
    .then(function (response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
    console.log(product);
}
