var express = require('express');
var fs = require("fs");

var app = express.createServer();
app.set('views', __dirname + '/views');
app.register('.html', require('ejs'));
app.set('view engine', 'html');

app.use(express.bodyParser());
app.use(express.cookieParser());
  
app.use(express.session({ secret: 'milfont' }));

app.use(app.router);

app.get('/', function(req, res) {
  res.send("Javascript Fundamental");
});


var oportunidades = [
  {
    id:1
    , data: "2011-08-01"
    , expira: "2011-12-31"
    , descricao: "Teste"
    , empresa: {
      nome: "Milfont Consulting"
    }
    , produto: {
      nome: "Treinamento Javascript Fundamental"
    }
  }
];
app.get('/oportunidades:format', function(req, res){ 
  res.send(JSON.stringify({data: oportunidades}));
});

app.get('/widgets.js', function(req, res){
	var file = fs.readFileSync("../lib/widgets.dialog.js").toString();
    res.send(file);
});


app.use(express.errorHandler({ showStack: true }));
app.use(express.static(__dirname));
app.listen(8001);

