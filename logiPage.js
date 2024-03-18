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
let signUp1 = document.getElementById('signUp');
let picUpload = document.getElementById('picUpload');
let userPhoto = document.getElementById('userPhoto');
let photoUrlBff;
let users = [];


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
    const object = new user(uName.value, uPwd.value, photoUrlBff);
    users.push(object);
}

const toastTrigger = document.getElementById('signUp')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

function checkCredentials()
{
    console.log(uName.value);
    if (uName.value in user)
    {
        console.log(uName.value);
    }
    else
    {
        alert("Invalid Username/Password!!!");
    }

}




// class userData{
//     constructor(uNameD){
//         this.uNameD = uNameD;
//     }
// }

// const users = [];

// const object = new userData('Kanjibhai');
// users.push(object);
 
// for (var i = 0; i < users.length; i++){
//   console.log(users[i].uNameD);
// }