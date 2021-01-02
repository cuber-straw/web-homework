let verifyCode = new GVerify('v_container')

function register() {
    let res = verifyCode.validate(document.getElementById('code_input').value)
    if (!res) {
        alert('验证码错误')
        verifyCode.refresh()
        return
    }
    
    let name = document.getElementById('username').value
    let pwd = document.getElementById('pwd').value
    let url = 'http://localhost:8080/reg'
    let str = 'name=' + name + '&pwd=' + pwd
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            let json = JSON.parse(xhr.responseText)
            if (json.ok) {
                location.replace('index.html')
                alert('注册成功！')
            } else {
                alert('注册失败: ' + json.msg)
            }
        }
    }
    xhr.open('post', url, true)
    xhr.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
    xhr.send(str)
}


let registerButton = document.getElementById('signup-btn')
registerButton.disabled = true
registerButton.addEventListener('click', register)

let usernameInput = document.getElementById('username')
let pwdInput = document.getElementById('pwd')
let repwdInput = document.getElementById('repwd')

let usernameValid = false
let pwdValid = false
let repwdValid = false

function activeButton() {
    if (usernameValid && pwdValid && repwdValid) {
        registerButton.disabled = false
    }
}

// 用户名支持4-18位数字、字母、下划线
usernameInput.addEventListener('input', function () {
    let currentName = usernameInput.value
    usernameValid = /^[\w]{4,18}$/.test(currentName)
    document.getElementById('username-warning').style.display = usernameValid ? 'none' : 'block'
    activeButton()
})

// 密码支持6-20位数字、字母、任意字符
pwdInput.addEventListener('input', function () {
    let currentPwd = pwdInput.value
    pwdValid = /^[\W\da-zA-Z_]{6,20}$/.test(currentPwd)
    document.getElementById('pwd-warning').style.display = pwdValid ? 'none' : 'block'
    activeButton()
})

// 检查两次密码输入是否一致
repwdInput.addEventListener('input', function () {
    let currentRepwd = repwdInput.value
    repwdValid = currentRepwd === pwdInput.value
    document.getElementById('repwd-warning').style.display = repwdValid ? 'none' : 'block'
    activeButton()
})


