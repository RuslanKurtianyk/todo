var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_db'
});

connection.connect(function (err) {
    if (err) console.log(err);
});

function createUser(_name, _email, _password, _hash, _secretcode, callback) {
    var user = {
        name: _name,
        password: _password,
        email: _email,
        hash: _hash,
        secret: _secretcode
    };
    var query = connection.query('INSERT INTO users SET ?', user, function (err, result) {
        if (err) throw err;
        else {
            console.log('Inserted ID: ' + result.insertId);
            callback.send('/');
        }
    });
    console.log(query.sql);
}

// insert todo
function saveTodo(user, text, done, todoDate) {
        var query = connection.query('INSERT INTO todos (user_id, text, done, date) VALUES ( ?, ?, ?, ?)', [user, text, done, todoDate], function (err, result) {

            if (err) throw err;
            else
                console.log('Inserted text: ' + text);

        });
        console.log(query.sql);
    }

// remove todo

function removeTodo(text) {

    var query = connection.query('DELETE FROM todos WHERE text = ?', [text], function (err, result) {
        if (err) throw err;
        else
            console.log('Deleted text: ' + text);

    });
    console.log(query.sql);
}
exports.saveTodo = saveTodo;
exports.removeTodo = removeTodo;
exports.createUser = createUser;
exports.connection = connection;

