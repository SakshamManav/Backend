const express = require("express");
const app = express();
require('dotenv').config();
const mongoConnection = require("./db");


const PORT = process.env.PORT || 3000;
app.use(express.json());
  
mongoConnection();

app.get("/", (req, res) => {
  res.send("Hello and welcome to the Backend API!");
});
app.use("/", require("./Routes/CacheRoute") )


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})



