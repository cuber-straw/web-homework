const express = require('express')
const expressStatic = require('express-static')
const bodyParser = require('body-parser')
const bcrptyjs = require('bcryptjs')
const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qiao0917',
    port: '3306',
    database: 'User',
})

connection.connect((err) => {
    if (err) {
        console.log('连接失败')
        console.log(err)
    } else {
        console.log('连接成功')
    }
})
// 查询数据库
function select(name) {
    let p = new Promise(function (resolve, reject) {
        let sql =
            'SELECT username, password, salt FROM UserInfo where username=?'
        let f = []
        f.push(name)
        connection.query(sql, f, function (err, result) {
            if (err) {
                console.log('select error')
            } else {
                let dataString = JSON.stringify(result)
                let data = JSON.parse(dataString)
                resolve(data[0])
            }
        })
    })
    return p
}

// 向数据库中插入
function insert(arr) {
    let sql =
        'INSERT INTO UserInfo(id, username, password, salt) VALUES (0, ?, ?, ?)'
    connection.query(sql, arr, function (err, result) {
        if (err) {
            console.log('insert error')
        } else {
            console.log('insert successfully')
        }
    })
}

let server = express()
server.use(bodyParser.urlencoded({ extended: false }))
server.use('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    )
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DEletE,OPTIONS')
    res.header('Access-Control-Allow-Credentials', true)
    next()
})

server.use('/reg', function (req, res) {
    let POST = req.body
    let test = select(POST.name)
    let user
    test.then(function (data) {
        user = data
        if (user === undefined) {
            if (POST.pwd !== POST.repwd) {
                res.send({ ok: false, msg: '两次密码输入不一致' })
            } else {
                const salt = bcrptyjs.genSaltSync(10)
                const password = bcrptyjs.hashSync(POST.pwd, salt)
                let arr = []
                arr.push(POST.name)
                arr.push(password)
                arr.push(salt)
                insert(arr)
                res.send({ ok: true, msg: '注册成功' })
            }
        } else {
            res.send({ ok: false, msg: '用户名已存在' })
        }
    })
})

server.use('/login', function (req, res) {
    let name = req.query['name']
    let pwd = req.query['pwd']
    let test = select(name)
    let users
    test.then(function (data) {
        users = data
        console.log('用户登录信息为：', users)
        if (users === undefined) {
            res.send({ ok: false, msg: '该用户不存在' })
        } else {
            const calculatedPwd = bcrptyjs.hashSync(pwd, users['salt'])
            const flag = calculatedPwd === users['password']
            console.log('计算出的密码：' + calculatedPwd)
            console.log('数据库存储的密码：' + users['password'])
            if (!flag) {
                res.send({ ok: false, msg: '用户名或密码错误' })
            } else {
                res.send({ ok: true, msg: '登录成功' })
            }
        }
    })
})

server.use('./favicon.ico', function (req, res) {
    res.send('404')
})
server.use(expressStatic('./www'))
server.listen(8080)
