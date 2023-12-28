var userName = document.getElementById('nameInput');
var email = document.getElementById('emailInput');
var password = document.getElementById('passwordInput');
var massage = document.getElementById('massage');
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');
var loginMassage = document.getElementById('loginMassage');

var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);

var theName = localStorage.getItem('userNameLogin')
if (theName) {
  document.getElementById('theName').innerHTML = "Welcome " + theName
}


var container = [];
if (localStorage.getItem('users') == null) {
  container = []
} else {
  container = JSON.parse(localStorage.getItem('users'))
}

function signup () {
  var signup = {
    userName : userName.value,
    email : email.value,
    password : password.value
  }

  if (empty() == false) {
    massage.innerHTML = `<span class="text-danger m-3">All inputs is required</span>`
  }

  if (container.length == 0){
    container.push(signup);
    localStorage.setItem('users' , JSON.stringify(container));
    massage.innerHTML = `<span class="text-success m-3">Success</span>`
    return true;
  }

  if (emailExist() == false) {
    massage.innerHTML = `<span class="text-danger m-3">email already exists</span>`
  }else{
    container.push(signup);
    localStorage.setItem('users' , JSON.stringify(container));
    massage.innerHTML = `<span class="text-success m-3">Success</span>`
  }
}

function empty () {
  if (userName.value == '' || email.value == '' || password.value == '') {
    return false;
  }else {
    return true;
  }
}

function emailExist() {
  for ( var i = 0 ; i < container.length ; i++) {
    if (container[i].email.toLowerCase() == email.value.toLowerCase()) {
      return false;
    }
  }
}

// ================> login <===================

function login() {

  if (loginEmpty() == false) {
    loginMassage.innerHTML = `<span class="text-danger m-3">All inputs is required</span>`
    return false;
  }

  var password = loginPassword.value
  var email = loginEmail.value
  for ( var i = 0 ; i < container.length ; i++) {
    if (container[i].email.toLowerCase() == email.toLowerCase() && container[i].password.toLowerCase() == password.toLowerCase()) {
      localStorage.setItem('userNameLogin', container[i].userName)
      location.replace('ahmedehabwebdev.github.io/Login/home.html')
  } else {
    loginMassage.innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
    }
  }
}

function loginEmpty(){
  if (loginEmail.value == '' || loginPassword.value == '') {
    return false;
  }else {
    return true;
  }
}

function logout() {
  localStorage.removeItem('userNameLogin')
}