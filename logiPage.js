let signUpBtn = document.getElementById('signUpBtn');
let userBlk = document.getElementById('userCredentials');
let userProfile = document.getElementById('userProfile');
let userTag = document.getElementById('userName');
let helpPara = document.getElementById('helpPara');
let loginLink = document.getElementById('loginLink');
let creatAccount1 = document.getElementById('creatAccount1');
let creatAccount2 = document.getElementById('creatAccount2');
let uConfPwdBlk = document.getElementById('uConfPwdBlk');
let loginBtn = document.getElementById('loginBtn');
let uName = document.getElementById('uName');
let uPwd = document.getElementById('uPwd');
let uconfPwd = document.getElementById('uconfPwd');
let signUp1 = document.getElementById('signUp');
let picUpload = document.getElementById('picUpload');
let userPhoto = document.getElementById('userPhoto');
let photoUrlBff;
let users = [];
let tstText = document.getElementById('tstText');
let err = ['Password Do not Match'];
class user
{
    constructor(userName, userPwd, photoUrl)
    {
        this.usrName = userName;
        this.usrPwd = userPwd;
        this.photoUrl = photoUrl;
    }
}


signUpBtn.addEventListener('click', signUpPage);
loginLink.addEventListener('click', loginPage);
loginBtn.addEventListener('click', checkCredentials);
signUp1.addEventListener('click', signUp);
picUpload.addEventListener('change' , () => {
    const fr = new FileReader();
    fr.readAsDataURL(picUpload.files[0]);

    fr.addEventListener('load', () => {
        photoUrlBff = fr.result; 
    })
})


function signUpPage()
{
    picUpload.style.display = 'block';
    uConfPwdBlk.style.display = 'block';
    loginBtn.style.display = 'none';
    signUp1.style.display = 'block';
    helpPara.style.display = 'none';
    creatAccount1.style.display = 'none';
    creatAccount2.style.display = 'block';
}

function loginPage()
{
    picUpload.style.display = 'none';
    uConfPwdBlk.style.display = 'none';
    loginBtn.style.display = 'block';
    signUp1.style.display = 'none';
    helpPara.style.display = 'block';
    creatAccount1.style.display = 'block';
    creatAccount2.style.display = 'none';
}

function signUp()
{
    if(uPwd.value == uconfPwd.value)
    {
        uPwd.classList.remove('is-invalid');
        uconfPwd.classList.remove('is-invalid');
        const object = new user(uName.value, uPwd.value, photoUrlBff);
        users.push(object);
        console.log(users);
        loginPage();
        uName.value = '';
        uPwd.value = '';
        userPhoto.setAttribute('src', users[0].photoUrl);
        userTag.innerText = users[0].usrName;
        tstText.innerText = 'You have successfully Signed Up.'
        toast();
    }
    else
    {
        tstText.innerHTML = '<p class="text-danger mb-0"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;Password do not match.</p>'
        toast();
        uPwd.classList.add('is-invalid');
        uconfPwd.classList.add('is-invalid');
    }
}

const toastLiveExample = document.getElementById('liveToast')

function toast(arg)
{
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
}

function checkCredentials()
{
    // Authentication Code here
}
