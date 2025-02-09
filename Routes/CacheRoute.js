const express = require("express");
const mongoose = require("mongoose");
const Cache = require("../models/CacheSchema");
const router = express.Router();
const MAX_CACHE_SIZE = 10;


router.post("/cache", async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key || !value) {
      return res.status(400).json({ message: "Key and value are required" });
    }

    const cacheCount = await Cache.countDocuments();
    if (cacheCount >= MAX_CACHE_SIZE) {
      return res.status(403).json({ message: "Cache limit reached" });
    }

    const cacheItem = new Cache({ key, value });
    await cacheItem.save();

    res.status(201).json({ message: "Cached successfully", key, value });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Key already exists" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.get("/cache/:key", async (req, res) => {
  try {
    const cacheItem = await Cache.findOne({ key: req.params.key });

    if (!cacheItem) {
      return res.status(404).json({ message: "Key not found" });
    }

    res.status(200).json({ key: cacheItem.key, value: cacheItem.value });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/cache/:key", async (req, res) => {
  try {
    const deletedItem = await Cache.findOneAndDelete({ key: req.params.key });

    if (!deletedItem) {
      return res.status(404).json({ message: "Key not found" });
    }
    res.status(200).json({ message: "Deleted successfully", key: req.params.key });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
