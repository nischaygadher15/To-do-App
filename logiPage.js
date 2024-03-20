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
let dateObj = new Date();

class user
{
    constructor(userName, userPwd, photoUrl, status)
    {
        this.usrName = userName;
        this.usrPwd = userPwd;
        this.photoUrl = photoUrl;
        this.logStatus = [];
        this.logStatus.push(status);
        this.logStatus.push(dateObj.toLocaleString());
        this.logStatus.push(Date.now());
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
    // userPhoto.setAttribute('src', "./Images/user.svg");
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
        userPhoto.setAttribute('src', "./Images/user.svg");
        uPwd.classList.remove('is-invalid');
        uconfPwd.classList.remove('is-invalid');
        const object = new user(uName.value, uPwd.value, photoUrlBff, 'Signed Up');
        // console.log(object);
        localStorage.setItem(`${object.usrName}`, JSON.stringify(object));
        loginPage();
        uName.value = '';
        uPwd.value = '';
        uconfPwd.value = '';
        // userPhoto.setAttribute('src', object.photoUrl);
        // userTag.innerText = object.usrName;
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
    // Authentication
    var userData = JSON.parse(localStorage.getItem(uName.value));
    if( (userData !== null) && (userData.usrName == uName.value) && (userData.usrPwd == uPwd.value) )
    { 
        console.log(userData);
        userData.logStatus[0] = 'Logged in';
        let dateObj1 = new Date();
        userData.logStatus[1] = dateObj1.toLocaleString();
        localStorage.setItem(userData.usrName, JSON.stringify(userData));
        console.log(localStorage);
        // window.location.href = './to-do.html';
        // location.replace('./to-do.html');
    }
    else
    {
        tstText.innerText = `Invalid User/Password!!!.`;
        tstText.innerHTML = '<p class="text-danger mb-0"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;Invalid User/Password</p>'
        toast();
    }
}

