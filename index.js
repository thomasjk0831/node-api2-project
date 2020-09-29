const express = require("express")

const server = express();
server.use(express.json());

const postsRouter = require('./posts/posts-router');
server.use('/api/posts', postsRouter)

server.get("/", (req,res) => {
    res.status(200).send("hello from express")
})

server.listen(8000, ()=> {
    console.log("Server Running on port 8000")
})