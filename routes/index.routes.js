const router = require("express").Router();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Post = require('../models/Post.model');
const fileUploader = require("../config/cloudinary.config");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/posts", (req, res, next) => {
  Post.find()
    .then(postsFromDB => res.status(200).json(postsFromDB))
    .catch(err => next(err));
});

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }  res.json({ secure_url: req.file.path });
});

router.post('/posts', (req, res, next) => {
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method
 
  Post.create(req.body)
    .then(createdPost => {
       console.log('Created new movie: ', createdPost);
      res.status(200).json(createdPost);
    })
    .catch(err => next(err));
});



module.exports = router;
