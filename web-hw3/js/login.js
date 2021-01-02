let verifyCode = new GVerify('v_container')

function login() {
    let res = verifyCode.validate(document.getElementById('code_input').value)
    if (!res) {
        alert('验证码错误')
        verifyCode.refresh()
        return
    }
    let username = document.getElementById('username').value
    let pwd = document.getElementById('password').value
    let url =
        'http://localhost:8080/login' + '?name=' + username + '&pwd=' + pwd
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            let json = JSON.parse(xhr.responseText)
            if (json.ok) {
                // 页面跳转
                alert('登录成功')
                location.replace('index.html')
            } else {
                alert('登录失败: ' + json.msg)
            }
        }
    }
    xhr.open('get', url, true)
    xhr.withCredentials = true
    xhr.send(null)
}

let loginButton = document.getElementById('login-btn')
loginButton.addEventListener('click', login)