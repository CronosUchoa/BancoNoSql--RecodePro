const express = require('express')
const app = express()

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bdcursorecodepro', {useNewUrlParser:true, useUnifiedTopology: true }).then(()=>{console.log("mongodb conectado ...")}).catch((err)=>{
    console.log("houve um erro ao se conectar" + err)
})



//model - Usuários
const userShema = mongoose.Schema({
    nome:{
        type:String,
       require:true
    },
    email:{
        type:String,
        require:false
    }
})

//conectando model
const gab = mongoose.model('usuario', userShema)



//salvar novo usuario
// new gab({
//     nome: "porFavorFunciona",
//     email: "deucerto@gmail.com"
// }).save().then(()=>{console.log("salvei.... user criado com sucesso")}).catch((err)=>{
//     console.log("houve um erro!" + err)
// })






app.get('/', function(req, res){
    res.sendFile(__dirname +"/index.html");
 })

 app.post('/resultado', function(req, res){
        //encontrar todos da tabela usuarios
        gab.find({}, function (err, docs) {
        // docs.forEach
        const p = JSON.stringify(docs);

        let json = JSON.parse(p);

        let a = req.body.nome;
        let b = req.body.email;


        new gab({
            nome: a,
            email: b
        }).save().then(()=>{console.log("salvei.... user criado com sucesso")}).catch((err)=>{
            console.log("houve um erro!" + err)
        })
     
        // console.log(json[1].nome);

    // console.log(json[i].nome);
    res.render("../resultado", {dados:json});
  
        });
 })

app.listen(3000)





// -- testes

// const profShema = mongoose.Schema({
//     nome:{
//         type:String,
       
//     },
//     sobrenome:{
//         type:String,
      
//     },
//     idade:{
//         type:String
//     }
// }) 

// const prof = mongoose.model('prof', profShema, "professor")  

// prof.find({}, function(err, docs){
//     console.log(docs)
// });


