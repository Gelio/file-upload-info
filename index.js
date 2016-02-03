var express = require('express'),
    multer = require('multer'),
    app = express(),
    port = process.argv[2] || 3000;



app.use('/', express.static(__dirname + '/public'));

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});