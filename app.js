var express = require('express');
var http = require('http');
var path = require('path');
var swig = require('swig');
var app = express();
var session = require('express-session');
var DB = require('./db');
var crypto = require('crypto');
var bodyParser = require('body-parser');
<<<<<<< HEAD
var port = 80;
=======
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331

app.use(session({
    secret: 'QWdfasf2342fDdww2',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(__dirname + '/public', {
    maxAge: 86400000
}));
app.engine('html', swig.renderFile);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.set('view engine', 'html');
app.set('views', __dirname + '/public');
app.set('view cache', false);
swig.setDefaults({
    cache: false
});

// go to '/'
app.get('/', function (req, res) {
    res.render('index', {});
});
// go to '/main'
app.get('/main', checkAuth, function (req, res) {
    res.render('page', {
        userName: req.session.user_name
    });
});
/*
 * Register confirmation
 */
app.get('/confirm/:id', function (req, res) {
    var query = DB.connection.query('SELECT * FROM users WHERE secret = ?', [req.params.id], function (err, rows, fields) {
        if (err) throw err;
        if (rows[0]) {
            var clear_confirmation_query = DB.connection.query('UPDATE users SET secret = ? WHERE id = ?', ["", rows[0].id], function (err, result) {
                if (err) throw err;
                else {
                    res.redirect('/');
                }
            })
        } else {
            console.log('error');
        }
    });
});
/*
 * showalltodo
 */
app.post('/showAllTodo', function (req, res) {
    var query = DB.connection.query('SELECT * FROM todos WHERE user_id = ?', [req.session.user_id], function (err, rows, fields) {
        if (err) throw err;
        if (rows[0]) {
<<<<<<< HEAD
            res.json(rows);
        } else {
            console.log('Current user haven\'t any todos');
=======
            var result = JSON.stringify(rows);
            res.json(rows);
        } else {
            console.log('error 111');
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
        }
    });
});
/*
 * Login
 */
app.post('/login', function (req, res) {
    var query = DB.connection.query('SELECT * FROM users WHERE name = ? AND password = ?', [req.body.login, req.body.password], function (err, rows, fields) {
        if (err) throw err;
<<<<<<< HEAD
=======
        console.log("inside 2 login 2");
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
        if (rows[0] && rows[0].secret == "") {
            req.session.user_id = rows[0].id;
            req.session.user_hash = rows[0].hash;
            req.session.user_name = rows[0].name;
            res.send('/main');
        } else {
<<<<<<< HEAD
			res.json({message: 'Wrong login or password'});
=======
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
            console.log('error');
        }
    });
});
/*
 * User register
 */
app.post('/register', function (req, res) {
    var name = req.body.login;
    var email = req.body.email;
    var pwd = req.body.password;
    var _hash = getMD5('secret-' + name + '-' + pwd);
    var secretcode = getMD5('qwedfa3' + name);
    var smtpTransport = require('nodemailer-smtp-transport');
    var nodemailer = require('nodemailer');
    var _error = '';
<<<<<<< HEAD
	
=======

    //checking if user exists
    var query = DB.connection.query('SELECT * FROM users WHERE name = ?', [name], function (err, rows, fields) {
        if (err) throw err;

        if (rows[0]) {
            console.log("user already exists");
        } else {
            DB.createUser(name, email, pwd, _hash, secretcode, res);
        };
    });
    // send mail
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
    var transport = nodemailer.createTransport(
        smtpTransport({
            service: 'Yandex',
            auth: {
                user: 'rus-kurtyanik@yandex.ru',
                pass: 'UponaM07'
            }
        })
    );
<<<<<<< HEAD
	
	var params = {
        from: 'rus-kurtyanik@yandex.ru',
        to: email,
        subject: 'Email confirmation',
        text: 'Welcome, ' + name + '!\n Please confirm your e-mail.\n To do this, go to\n http://localhost:'+port+'/confirm/' + secretcode + '\n Thanks for using Todo App!\nThe TodoApp Team'
    };
    //checking if user exists
    var query = DB.connection.query('SELECT * FROM users WHERE name = ?', [name], function (err, rows, fields) {
        if (err) throw err;

        if (rows[0]) {
            console.log("user already exists");
        } else {
            DB.createUser(name, email, pwd, _hash, secretcode, res);
				transport.sendMail(params, function (err, res) {
					if (err) {
						console.error(err);
						}
				});
        };
    });
    // send mail
   
=======
    var params = {
        from: 'rus-kurtyanik@yandex.ru',
        to: email,
        subject: 'Email confirmation',
        text: 'Welcome, ' + name + '!\n Please confirm your E-Mail.\n To do this, go to\n http://localhost/confirm/' + secretcode + '\n Thanks for using Todo App!\nThe TodoApp Team'
    };
    transport.sendMail(params, function (err, res) {
        if (err) {
            console.error(err);
        }
    });
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
});
/*
 * remove Todo from DB
 */
app.post('/removetodo', function (req, res) {
    var text = req.body.text;
    DB.removeTodo(text);
    console.log("remove =     " + text);
});
/*
 * Add Todo to DB
 */
app.post('/addtodo', function (req, res) {
    var text = req.body.text;
<<<<<<< HEAD
	var done = req.body.done;
	var todoDate = req.body.date;
    var currentUser = req.session.user_id;
    DB.saveTodo(currentUser, text, done, todoDate);
	console.log(req);
=======
    var date = new Date();
    var currentUser = req.session.user_id;
    DB.saveTodo(currentUser, text);
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
});
/*
 * Checking Authorization
 */
function checkAuth(req, res, next) {
        if (!req.session.user_id || !req.session.user_hash || !req.session.user_name) {
            res.redirect('/');
        } else {
            var query = DB.connection.query('SELECT * FROM users WHERE id = ? AND hash = ?', [req.session.user_id, req.session.user_hash], function (err, rows, fields) {
                if (err) throw err;
                if (rows[0]) {
                    next();
                } else {
                    console.log('authorization failed');
                }
            });
            console.log(query.sql);
        }
    }
    /*
     * Logout
     */
app.get('/logout', function (req, res) {
    delete req.session.user_id;
    delete req.session.user_hash;
    delete req.session.user_name;
<<<<<<< HEAD
    res.redirect('/');
=======

    res.redirect('/main');
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
});
/*
 * get MD5 Hash
 */
function getMD5(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
    /*
     * Start server
     */
<<<<<<< HEAD
http.createServer(app).listen(port, function () {
    console.log("Express server listening on port - "+port);
=======
http.createServer(app).listen(80, function () {
    console.log("Express server listening on port 80");
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
});