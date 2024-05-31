const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

const user = [
    {username: "test", nama: "testing", hobi: "Menyanyi"},
    {username: "toni", nama: "Toni Ton", hobi: "Makan"}
];

// HTTP Verb: Post, Get, Update, Delete
// Post  : menginsert data
// Get   : mengambil data
// Update: mengubah data
// Delete: menghapus data

//Status Code
// 200 OK
// 201 Created
// 400 Bad Request
// 403 Forbidden
// 404 Not Found
// 500 Internal Server Error

//Cara menjalankan node
//node index.js
//npx nodemon index.js

//endpoint untuk test
app.get("/test", function(req, res){
    return res.status(200).send("Test Sukses!");
});

//endpoint add new user
app.post("/api/user", function(req, res){
    let {username, nama, hobi} = req.body;

    if(username && nama && hobi){
        let newUser = {username: username, nama: nama, hobi: hobi};
        user.push(newUser);
        return res.status(201).send(newUser);
    }else{
        return res.status(400).send({message: "Semua Field Harus Diisi"});
    }
});

//endpoint get all user
app.get("/api/user", function(req, res){
    return res.status(200).send(user);
});

//endpoint get user by username
app.get("/api/user/:username", function(req, res){
    let {username} = req.params;

    let hasil = user.find((u)=> u.username == username);
    if(hasil){
        return res.status(200).send(hasil);
    }else{
        return res.status(404).send({message: "User not found"});
    }
});

//endpoint edit user
app.put("/api/user/:username", function(req, res){
    let {username} = req.params;
    let {nama, hobi} = req.body;

    if(nama && hobi){
        for (let i = 0; i < user.length; i++) {
            if(user[i].username == username){
                user[i].nama = nama;
                user[i].hobi = hobi;
                return res.status(200).send({
                    message: "Data user telah diupdate",
                    result: user[i] 
                });
            }
        }
        return res.status(404).send({message: "User not found"});
    }else{
        return res.status(400).send({message: "Semua Field Harus Diisi"});
    }
});

//endpoint delete user
app.delete("/api/user/:username", function(req, res){
    let {username} = req.params;
    
    for (let i = 0; i < user.length; i++) {
        if(user[i].username == username){
            let temp = user.splice(i, 1)[0];
            return res.status(200).send(temp);
        }        
    }
    return res.status(404).send({message: "User not found"});
});


const port = 5001;
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});
