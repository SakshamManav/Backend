const mongoose = require("mongoose");
require('dotenv').config();


const mongoUri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBUSERPASSWORD}@cluster0.h0pto.mongodb.net/BackendTest?retryWrites=true&w=majority&appName=Cluster0`;

async function mongoConnection() {
    try {
      await mongoose.connect(mongoUri);
      if (mongoose.connection.readyState === 1) {
        console.log("MongoDB connected successfully");
      }
    } catch (error) {
      console.error("MongoDB connection failed", error);
      process.exit(1); 
    }
  }

  module.exports = mongoConnection;