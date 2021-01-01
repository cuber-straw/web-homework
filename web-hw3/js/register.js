function register() {
    let name = document.getElementById('username').value
    let pwd = document.getElementById('pwd').value
    let repwd = document.getElementById('repwd').value
    let url = 'http://localhost:8080/reg'
    let str = 'name=' + name + '&pwd=' + pwd + '&repwd=' + repwd
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            let json = JSON.parse(xhr.responseText)
            if (json.ok) {
                location.replace('index.html')
                alert('注册成功！')
            } else {
                alert('失败' + ',   ' + json.msg)
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
registerButton.addEventListener('click', register)

let usernameInput = document.getElementById('username')

usernameInput.addEventListener('input', function () {
    let currentvalue = usernameInput.value


}) 

usernameInput.onblur = function () {
    console.log('blur')
}
