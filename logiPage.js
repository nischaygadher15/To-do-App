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
let photoUrlBff = picUpload.value;
var users = [];
let tstText = document.getElementById('tstText');
let err = ['Password Do not Match'];
let dateObj = new Date();
let pageFlag =  true;
var userNameData = {};
var userPhotos = [];
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
    // console.log('yes it is triggered.')
    fr.readAsDataURL(picUpload.files[0]);

    fr.addEventListener('load', () => {
        photoUrlBff = fr.result; 
        // console.log(photoUrlBff);
        userPhoto.setAttribute('src', photoUrlBff); 
    })
})

function loader()
{
    preloader();
    loadData();
}

function preloader()
{
    const preloader = document.getElementById('preloader');
    preloader.classList.add('show-preloader');
    preloader.addEventListener('transitionend', () => 
    {
        // document.body.removeChild('preloader');
        preloader.classList.remove('show-preloader');
        preloader.display = 'none';
    })
    return true;
}


function loadData()
{
    let temp = JSON.parse(localStorage.getItem('ToDoData'));
    if ( temp !== null)
    {
        users = temp;
        // console.log(users);
    }
}

function setDATA()
{
    localStorage.setItem(`ToDoData`, JSON.stringify(users));
}

function clearUserData()
{
    uName.value = '';
    uPwd.value = '';
    uconfPwd.value = '';
    userPhoto.setAttribute('src', "./Images/user.svg");
} 

function signUpPage()
{
    const preloader = document.getElementById('preloader');
    preloader.classList.add('show-preloader');
    preloader.addEventListener('transitionend', () => 
    {
        // document.body.removeChild('preloader');
        preloader.classList.remove('show-preloader');
        preloader.display = 'none';
        clearUserData();
        pageFlag =  false;
        picUpload.style.display = 'block';
        uConfPwdBlk.style.display = 'block';
        loginBtn.style.display = 'none';
        signUp1.style.display = 'block';
        helpPara.style.display = 'none';
        creatAccount1.style.display = 'none';
        creatAccount2.style.display = 'block';
    })
}


function loginPage()
{
    const preloader = document.getElementById('preloader');
    preloader.classList.add('show-preloader');
    preloader.addEventListener('transitionend', () => 
    {
        // document.body.removeChild('preloader');
        preloader.classList.remove('show-preloader');
        preloader.display = 'none';
        pageFlag =  true;
        clearUserData();
        picUpload.style.display = 'none';
        uConfPwdBlk.style.display = 'none';
        loginBtn.style.display = 'block';
        signUp1.style.display = 'none';
        helpPara.style.display = 'block';
        creatAccount1.style.display = 'block';
        creatAccount2.style.display = 'none';
    })

}

function signUp()
{
    if(uPwd.value == uconfPwd.value)
    {
        if(usrAlreadyExist())
        {
            uPwd.classList.remove('is-invalid');
            uconfPwd.classList.remove('is-invalid');
            // console.log(picUpload.files[0]);
            const object = new user(uName.value, uPwd.value, photoUrlBff, 'Signed Up');
            users.push(object);
            setDATA();
            uName.value = '';
            uPwd.value = '';
            uconfPwd.value = '';
            loginPage();
            
            tstText.innerHTML = '<p class="text-success mb-0"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;You have successfully Signed Up..</p>'
            toast();
        }
        else
        {
            tstText.innerHTML = '<p class="text-danger mb-0"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;User is already exist, please try different user name.</p>'
            toast();
        }
    }
    else
    {
        tstText.innerHTML = '<p class="text-danger mb-0"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;Password do not match.</p>'
        toast();
        uPwd.classList.add('is-invalid');
        uconfPwd.classList.add('is-invalid');
    }
}

function usrAlreadyExist()
{
    loadData();
    let userFlag = users.every((usr) =>
        {
            if(usr.usrName == uName.value) 
            {
                // console.log(usr.usrName);
                // console.log(uName.value);
                return false
            }
            return true;
        });
    return userFlag? true : false
}

function nameData()
{
    loadData();
    users.forEach((usr) =>
    {
        userNameData[usr.usrName] = usr.photoUrl;
    })
    
}


let udPhotoFlag = true;
function updatePhoto()
{
    if(pageFlag)
    {
        if(udPhotoFlag == true)
        {
            loadData();
            nameData();
            udPhotoFlag = false;
        }
    
        if(uName.value !== '')
        {
            if(uName.value in userNameData)
            {
                console.log('updatePhoto is running : user found!!');
                userPhoto.setAttribute('src', userNameData[uName.value]);
            }
            else
            {
                console.log('updatePhoto is running : user not found!!');
                userPhoto.setAttribute('src', './Images/user.svg');
            }
        }
        else
        {
            console.log('updatePhoto is running : empty')
            userPhoto.setAttribute('src', './Images/user.svg');
        }
    }
    else
    {
        console.log('We are on Sign Up Page.');
    }
    setTimeout(updatePhoto, 500);
}

updatePhoto();

const toastLiveExample = document.getElementById('liveToast')

function toast(arg)
{
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
}

function checkCredentials()
{
    // Authentication

    loadData();
    users.every((usr) => {
        if(usr.usrName == uName.value)
        {
            if((usr.usrPwd == uPwd.value))
            {
                usr.logStatus[0] = 'Logged in';
                let dateObj1 = new Date();
                usr.logStatus[1] = dateObj1.toLocaleString();
                setDATA();
                window.location.href = './to-do.html';
                return false;
            }
            else
            {
              return false;  
            }
        }
        return true;
    })

    tstText.innerText = `Invalid User/Password!!!.`;
    tstText.innerHTML = '<p class="text-danger mb-0"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;Invalid User/Password</p>'
    toast();

}


