const express = require("express");
const Db = require('../data/db')

const router = express.Router();

router.get("/", (req,res) => {
    Db.find(req.query)
    .then(db => {
        res.status(200).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message : "Error retrieving data"
        })
    })
})

router.get("/:id", (req,res)=> {
    Db.findById(req.params.id)
    .then(db => {
        if(db.length !== 0)
        res.status(200).json(db)
        else
        res.status(404).json({ message: "The post with the specified ID does not exist." })


        
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get("/:id/comments", (req, res) => {
    Db.findCommentById(req.params.id)
    .then(db => {
        if(db.length !== 0)
        res.status(200).json(db)
        else
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.post("/", (req,res)=> {
    if(req.body.contents === undefined || req.body.title === undefined)
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

    Db.insert(req.body)
    .then(db => {
        res.status(201).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "error adding to hub"
        })
    })
})

router.post("/:id/comments", (req,res)=> {
    if(req.body.text === undefined)
    res.status(400).json({ errorMessage: "Please provide text for the comment." })
     
    const post = {...req.body, post_id: req.params.id}
    console.log(post)
    Db.insertComment(post)
    .then(db => {
           

                res.status(201).json(db)
            
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "error adding to hub"
        })
    })
})

router.delete("/:id", (req, res) => {
    Db.remove(req.params.id)
    .then(count => {
        if(count > 0){

            res.status(200).json({ message: "The post was deleted" })
        }
        else{

            res.status(404).json({ message: "The post could not be found" })
        }

    })
    .catch(error => {

        res.status(500).json({ error: "The post could not be removed" })
    }
    )
})

router.put("/:id", (req, res) => {
    if(req.body.title === undefined || req.body.contents === undefined)
    res.status(404).json({ message: "Please include title and contents." })
    Db.update(req.params.id, req.body)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "The post was updated successfully" })
        }
        else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})


module.exports = router;

// {
//     title: "The post title", // String, required
//     contents: "The post contents", // String, required
//     created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//     updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   }

