let signUpBtn = document.getElementById('signUpBtn');
let userBlk = document.getElementById('userCredentials');
let userProfile = document.getElementById('userProfile');
let userTag = document.getElementById('userName');
let helpPara = document.getElementById('helpPara');
let loginLink = document.getElementById('loginLink');
let creatAccount1 = document.getElementById('creatAccount1');
let creatAccount2 = document.getElementById('creatAccount2');
let loginBtn = document.getElementById('loginBtn');
let uName = document.getElementById('uName');
let uPwd = document.getElementById('uPwd');
let user = {
    Nkg : "123456",
    Krg : 'abcdef',
    Hkg : 'wxyz'
};

signUpBtn.addEventListener('click', signUp);
loginLink.addEventListener('click', loginPage);
loginBtn.addEventListener('click', checkCredentials);

function signUp()
{
    userProfile.innerHTML =`
        <div class="d-flex justify-content-evenly align-items-center mb-3" id="user">
            <img src="./user.svg" alt="User Photo" class="userPhoto">
            <input type="file" class="form-control w-50 mt-3" id="picUpload">
        </div>
    `;
    userCredentials.innerHTML += `
        <div class="uConfPwdBlk">
            <i class="fa-solid fa-lock cPwdIcon"></i>
            <input type="password" name="cPwd" id="uconfPwd" class="form-control mt-3" placeholder="Confirm Password">
        </div>
    `;
    helpPara.style.display = 'none';
    creatAccount1.style.display = 'none';
    creatAccount2.style.display = 'block';
}

function loginPage()
{
    userProfile.innerHTML =`
        <div class="d-flex justify-content-center mb-3" id="user">
            <img src="./user.svg" alt="User Photo" class="userPhoto">
        </div>
        <h4 class="text-center text-white" id="userName">User Name</h4>
    `;
    userCredentials.innerHTML = `
    <div class="uNameBlk">
        <i class="fa-solid fa-user userIcon"></i>
        <input type="text" name="uName" class="form-control mb-3" id="uName" placeholder="Username">
    </div>
    <div class="uPwdBlk">
        <i class="fa-solid fa-lock pwdIcon"></i>
        <input type="password" name="pwd" id="uPwd" class="form-control" placeholder="Password">
    </div>
    `;
    helpPara.style.display = 'block';
    creatAccount1.style.display = 'block';
    creatAccount2.style.display = 'none';
}

function checkCredentials()
{
    console.log(uName.value);
    if (uName.value in user)
    {
        alert('Yeah User exists.');
    }
    else
    {
        alert("Invalid Username/Password!!!");
    }

}