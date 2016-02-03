var express = require('express'),
    multer = require('multer'),
    fs = require('fs'),
    app = express(),
    port = process.argv[2] || 3000,
    upload = multer({dest: 'uploads/'});

app.post('/upload', upload.single('file'), function(req, res, next) {
    if(req.file) {
        res.json({name: req.file.originalname, mimetype: req.file.mimetype, size: req.file.size});
        fs.unlink(req.file.path);
    }
    else
        res.json({error: 'file cannot be uploaded or processed'});
});

app.use('/', express.static(__dirname + '/public'));

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});