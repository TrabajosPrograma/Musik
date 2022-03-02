const express = require("express");
const app = express();

//conexión mongodb
const mongoose = require("mongoose");
const dotenv = require ("dotenv")
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const listRoute = require ("./routes/lists");
const songRoute = require ("./routes/songs");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =>console.log("DB conectado"))
.catch(err =>console.log(err));


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/songs", songRoute);
app.use("/api/lists", listRoute);
//servidor conectado
app.listen(8000,()=>{
    console.log("backend server")
})