const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

router.get('/', (req, res)=>{
    res.send('we are on posts');
});

router.post('/', (req, res) => {
    
})




module.exports = router;