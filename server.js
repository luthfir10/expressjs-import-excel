let express = require('express');
let server = express();
let upload = require('express-fileupload');
let importExcel = require('convert-excel-to-json');
let del = require('del');

server.use(upload());

server.get('/', (req, res) =>{
    res.sendFile(__dirname+'/index.html');
})

server.post('/', (req, res) =>{
    let file = req.files.filename;
    let filename = file.name;
    let siswa = [];
    file.mv('./excel/'+filename,(err)=>{
        if(err){
            res.send('Maaf gagal upload');
        }else{
            let result = importExcel({
                sourceFile : './excel/'+filename,
                header : {rows:1},
                columnToKey : {H: 'nopes', K: 'nm_pes'},
                sheets : ['Sheet1']
            });
            for (var i = 0; result.Sheet1.length > i; i++) {
                siswa.push(result.Sheet1[i].nopes);
                siswa.push(result.Sheet1[i].nm_pes);
                
            }
            res.send(siswa);
            console.log(siswa+ ' Jumlah data '+siswa.length);
            del(['excel/'+filename]).then(paths=>{console.log('file '+filename+' sudah di hapus!!')})
        }
    });
});

server.listen(3000, ()=>{console.log('server runs on port 3000')});