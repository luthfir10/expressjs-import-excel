const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');


//GET back all the posts
router.get('/', async (req, res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({messafe: err});
    }
});


//SUBMIT  a posts
router.post('/', async (req, res) => {
    const post = new Post({
        nopes : req.body.nopes,
        nm_pes : req.body.nm_pes
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){

        res.json({message: err});
    }

});




module.exports = router;