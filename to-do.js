let taskList = [];
let taskRow = document.getElementsByClassName('taskRow');
let taskBlk = document.getElementById('taskListBlk');
let task = document.getElementsByClassName('task');
let taskChk = document.getElementsByClassName('taskChk');
let editBtn = document.getElementsByClassName('editBtn');
let addTaskBtn = document.getElementsByClassName('addTaskBtn')[0];
var taskName = document.getElementById('taskName'); 
let delBtn = document.getElementsByClassName('delBtn')[0];
var tsId = 0;
var editFlags = {};
var taskStatus = {};
var users = [];
var activeUser = {};
let logOutBtn = document.getElementById('logOutBtn');
let userdpPic = document.getElementById('userdpPic');
let uNameTag = document.getElementById('uNameTag'); 
let usrTaskList = [];

// import {loadData, setData} from "./logiPage.js"
// loadData();

logOutBtn.addEventListener('click', logOut);
addTaskBtn.addEventListener("click",addTask);

function loader()
{
    preloader();
    loadData();
    whoIsActive();
    setTimeout(successfull, 1200);
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
        console.log(`loaded:`,users);
    }
}

function setData()
{
    users.every((usr) => 
    {
        if(activeUser.usrName == usr.usrName)
        {
            users[users.indexOf(usr)] = activeUser;
            console.log(users);
            return false;
        }
        return true;
    })
    localStorage.setItem(`ToDoData`, JSON.stringify(users));
}

function whoIsActive()
{
    users.every((usr) =>
    {
        if(usr.logStatus[0] == 'Logged in')
        {
            activeUser = usr;
            // console.log(`Active : ${activeUser.usrName}`);
            return false;
        }
        return true;
    })

    userdpPic.setAttribute('src', activeUser.photoUrl);
    uNameTag.innerText = activeUser.usrName;

    for (let i in activeUser.taskList)
    {
        addTaskRow( i, activeUser.taskList[i][3] );
        if(activeUser.taskList[i][1] == true)
        {
            addChk(activeUser.taskList[i][0], activeUser.taskList[i][2]);
        }
        usrTaskList.push(activeUser.taskList[i][3]);
    }

}

function logOut()
{
    users.every((usr) =>
    {
        if(usr.usrName == activeUser.usrName)
        {
            usr.logStatus[0] = 'Logged out';
            let dateObj2 = new Date();
            usr.logStatus[1] = dateObj2.toLocaleString();
            // console.log(`Logged out : ${activeUser.usrName}`);
            return false;
        }
        return true;
    })
    setData();
    window.location.href = './to-do-loginPage.html';
}

function successfull()
{
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    tstText.innerHTML = '<p class="text-success" mb-0"><i class="bi bi-check-circle-fill"></i>&nbsp;Welcom to To Do App, Successfully logged in.</p>';
    toastBootstrap.show();
}


function addTask()
{  
    if(taskName.value !== '')
    {
        loadData();
        if (!usrTaskList.includes(taskName.value))
        {
            taskName.classList.remove('is-invalid');
            taskName.classList.add('is-valid');
            document.getElementById('alertMsg').style.display = 'none';
            document.getElementById('alertMsg').innerText = 'Please Enter Task name';
            tsId = activeUser.taskList.length;
            // console.log(`tsId : ${tsId}`);
            addTaskRow(tsId, taskName.value);
            // editFlags[`ts-eBtn-${tsId}`] = false;
            // taskStatus[`ts-chk-${tsId}`] = false;
            let temp = [];
            let tempTaskVar = document.getElementById(`ts-tk-${tsId}`);
            temp = [`ts-chk-${tsId}`, false,`ts-tk-${tsId}`, tempTaskVar.value];
            activeUser.taskList.push(temp);
            console.log(`activeUser after push :`,activeUser);
            setData();
            tsId++; 
        }
        else
        {
            taskName.classList.remove('is-valid');
            taskName.classList.add('is-invalid');
            document.getElementById('alertMsg').style.display = 'block';
            document.getElementById('alertMsg').innerText = 'Task is already in list!!';
        }
    }
    else
    {
        taskName.classList.remove('is-valid');
        taskName.classList.add('is-invalid');
        document.getElementById('alertMsg').style.display = 'block';
    }
}


function addTaskRow(arg1, arg2)
{

    taskBlk.innerHTML += `
            <div class="mb-3 g-2 px-1 d-flex justify-content-center" id="ts-${arg1}">
                <div class="col-8 me-3">
                    <div class="taskNameBlk d-flex">
                        <input class="form-check-input fs-4 me-3 taskChk" type="checkbox" aria-label="Checkbox" id="ts-chk-${arg1}" onclick="tskChk('ts-${arg1}','ts-chk-${arg1}','ts-tk-${arg1}')">
                        <div id="ts-tkw-${arg1}" class="rounded">
                            <input type="text" name="task" value="${arg2}" class="task form-control fs-4" id="ts-tk-${arg1}" disabled>
                        </div>
                    </div> 
                </div>
                <div class="tasksBtnBlk"> 
                    <button type="button" class="btn editBtn text-white me-2" id="ts-eBtn-${arg1}" onclick="editTask('ts-tkw-${arg1}','ts-chk-${arg1}','ts-tk-${arg1}','ts-eBtn-${arg1}')">
                        <i class="fas fa-edit fs-6"></i>
                    </button>
                    <button type="button" class="btn delBtn text-white" onclick="deleteTask('ts-${arg1}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            `;
}

function tskChk(tsIDCh, chkId1, tkId1)
{
    if(!document.getElementById(chkId1).classList.contains('chk'))
    {
        addChk(chkId1, tkId1);
        let extID = parseInt(extractId(tsIDCh));
        activeUser.taskList[extID][1] = taskStatus[chkId1];
        setData();
    }
    else
    {
        removeChk(chkId1,tkId1);
        let extID = parseInt(extractId(tsIDCh));
        activeUser.taskList[extID][1] = taskStatus[chkId1];
        setData();
    }
}

function addChk(chkArg1, chkArg2)
{
    document.getElementById(`${chkArg1}`).setAttribute('checked','');
    document.getElementById(`${chkArg1}`).classList.add('chk');
    document.getElementById(`${chkArg2}`).classList.add('lineThru');
    taskStatus[chkArg1] = true;
}

function removeChk(chkArg3, chkArg4)
{
    document.getElementById(`${chkArg3}`).removeAttribute('checked');
    document.getElementById(`${chkArg4}`).classList.remove('lineThru');
    document.getElementById(`${chkArg3}`).classList.remove('chk');
    taskStatus[chkArg3] = false;
}


function editTask(tkwId,chkId2,tkId,eId)
{
    let temp = document.getElementById(`${chkId2}`).classList;

    if(editFlags[`${eId}`] == false)
    {
        if(temp.contains('chk'))
        {
            document.getElementById(`${tkId}`).classList.remove('lineThru');
        }
        document.getElementById(`${eId}`).innerHTML = `<i class="fa-solid fa-check fs-6"></i>`;
        document.getElementById(`${tkwId}`).classList.add('tkwBorder');
        document.getElementById(`${tkId}`).removeAttribute('disabled');
        editFlags[eId] =  true;
    }
    else
    {
        if(temp.contains('chk'))
        {
            document.getElementById(`${tkId}`).classList.add('lineThru');
        }
        document.getElementById(`${eId}`).innerHTML = `<i class="fas fa-edit fs-6"></i>`;
        document.getElementById(`${tkwId}`).classList.remove('tkwBorder');
        document.getElementById(`${tkId}`).setAttribute('disabled','');
        editFlags[eId] =  false; 
    }
}

function deleteTask(delId)
{
    // console.log(`before: ${tsIdArr}`);
    document.getElementById(`${delId}`).remove();
    let extId = parseInt(extractId(delId));
    activeUser.taskList.splice(extId,1);
    console.log('after Deletion : ', activeUser); 
    setData();
}

function extractId(id1)
{
    let id2 = '';
    for(let s of id1)
    {
        if(s == 't' || s == 's' || s == "-")
            continue;
        else
            id2 += s;
    }
    return id2;
}
