const mongoose = require("mongoose")
const MONGO_URI = 'mongodb://localhost:27017/prueba'

const connect = () => {
     mongoose
      .connect(MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
     })
     .then(()=> console.log("mongoDB Connected"))
     .catch ((err)=>{
        console.log(err)
        process.exit(1)
     });
}


module.exports = {connect}