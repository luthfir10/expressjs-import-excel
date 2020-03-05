const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");
let upload = require("express-fileupload");
let importExcel = require("convert-excel-to-json");
let del = require("del");

//GET back all the posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ messafe: err });
  }
});

//Submit a posts
router.post("/", async (req, res) => {
  let file = req.files.filename;
  let filename = file.name;
  const post = {};

  file.mv("./excel/" + filename, err => {
    if (err) {
      res.send("Maaf gagal upload");
    } else {
      let result = importExcel({
        sourceFile: "./excel/" + filename,
        header: { rows: 1 },
        columnToKey: { H: "nopes", K: "nm_pes" },
        sheets: ["Sheet1"]
      });
      for (var i = 0; result.Sheet1.length > i; i++) {
        Post({
          nopes: result.Sheet1[i].nopes,
          nm_pes: result.Sheet1[i].nm_pes
        }).save();
        
      }
      
      del(["excel/" + filename]).then(paths => {
        console.log("file " + filename + " sudah di hapus!!");
      });
      res.send("Upload Sukses..!!");
    }
  });


});

module.exports = router;
