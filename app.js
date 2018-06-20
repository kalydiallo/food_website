// requre express module
var express = require('express');
var bodyParser = require('body-parser');
const { Pool, Client } = require('pg')

var app = express();

//we'll need this bodypusrer to fatch the data
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//for ejs and its gonna diractly look into view engine/folder as defult behavior
app.set('view engine', 'ejs')

//middlewere to use css in our pages
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));

//added for databse
// const { Pool, Client } = require('pg')
app.use(express.static('public'));

// Add the database info here

const pool = new Pool({
  user: 'postgres', //env var: PGUSER
  host: 'localhost',  // Server hosting the postgres database
  database: 'postgres', //env var: PGDATABASE
  password: 'n3tw0rk', //env var: PGPASSWORD
  port: 5432, //PGPORT
});

var usersdata;
pool.query('select * from food', (err, res) => {
  usersdata = res.rows;
  // console.log(res.rows);
  
});

// sending ejs pages to server so we can access them
app.get('/', function(req, res){
	res.render('index');
});

app.get('/american', function(req, res){
	res.render('american');
});

app.get('/african', function(req, res){
	res.render('african');
});

app.get('/indian', function(req, res){
	res.render('indian');
});

app.get('/data', function(req, res){
	res.render('data');
});


app.get('/', function(req, res){ 
  var name = req.body.uname;
  var email = req.body.eamil;
  var subject = req.body.subject;
  //console.log(name, eamail);   
  res.render('contact',{

  })
});

app.get('/contact', function(req, res){
	res.render('contact');
});

//you will need this to get data from contact form
app.post('/contact', urlencodedParser, function(req, res) {
    // console.log(req.body.unname);
    // console.log(req.body.email);
    // console.log(req.body.comment);
    res.render('test-page', {data: req.body});
    
// saving data to database
    var insert = "insert into food (uname, email, subject) values('" + req.body.unname + "', '"+req.body.email+"','"+req.body.comment+"');";
    pool.query(insert);
    pool.end();
});

// });

app.listen(3000, function(){
    console.log("info",'Server is running at port : ' + 3000);
});