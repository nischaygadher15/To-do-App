let taskList = [];
let taskRow = document.getElementsByClassName('taskRow');
let taskBlk = document.getElementById('taskListBlk');
let task = document.getElementsByClassName('task');
let taskChk = document.getElementsByClassName('taskChk');
let editBtn = document.getElementsByClassName('editBtn');
let addTaskBtn = document.getElementsByClassName('addTaskBtn')[0];
var taskName = document.getElementById('taskName'); 
let delBtn = document.getElementsByClassName('delBtn')[0];
var tsIdArr = [];
var tsId = 0;
var editFlags = {};
var taskStatus = {};

addTaskBtn.addEventListener("click",addTask);

window.addEventListener('load', () => 
{
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    preloader.addEventListener('transitionend', () => 
    {
        // document.body.removeChild('preloader');
        preloader.display = 'none';
    })

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    tstText.innerHTML = '<p class="text-success" mb-0"><i class="bi bi-check-circle-fill"></i>&nbsp;Welcom to To Do App, Successfully logged in.</p>';
    toastBootstrap.show();
})


function addTask()
{  
    if(taskName.value !== '')
    {
        taskName.classList.remove('is-invalid');
        taskName.classList.add('is-valid');
        document.getElementById('alertMsg').style.display = 'none';
        let j = 0;
        while(true)
        {
            if(!tsIdArr.includes(j))
            {
                tsId = j;
                break;
            }
            j++;
        }

        taskBlk.innerHTML += `
            <div class="mb-3 g-2 px-1 d-flex justify-content-center" id="ts-${tsId}">
                <div class="col-8 me-3">
                    <div class="taskNameBlk d-flex">
                        <input class="form-check-input fs-4 me-3 taskChk" type="checkbox" aria-label="Checkbox" id="ts-chk-${tsId}" onclick="tskChk('ts-chk-${tsId}','ts-tk-${tsId}')">
                        <div id="ts-tkw-${tsId}" class="rounded">
                            <input type="text" name="task" value="${taskName.value}" class="task form-control fs-4" id="ts-tk-${tsId}" disabled>
                        </div>
                    </div> 
                </div>
                <div class="tasksBtnBlk"> 
                    <button type="button" class="btn editBtn text-white me-2" id="ts-eBtn-${tsId}" onclick="editTask('ts-tkw-${tsId}','ts-chk-${tsId}','ts-tk-${tsId}','ts-eBtn-${tsId}')">
                        <i class="fas fa-edit fs-6"></i>
                    </button>
                    <button type="button" class="btn delBtn text-white" onclick="deleteTask('ts-${tsId}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            `; 
        
        tsIdArr.push(tsId);
        tsIdArr.sort();
        editFlags[`ts-eBtn-${tsId}`] = false;
        taskStatus[`ts-chk-${tsId}`] = false;
        tsId++;    
    }
    else
    {
        taskName.classList.remove('is-valid');
        taskName.classList.add('is-invalid');
        document.getElementById('alertMsg').style.display = 'block';
    }
}

function tskChk(chkId1, tkId1)
{
    if(taskStatus[chkId1] == false)
    {
        document.getElementById(`${chkId1}`).setAttribute('checked','');
        document.getElementById(`${chkId1}`).classList.add('chk');
        document.getElementById(`${tkId1}`).classList.add('lineThru');
        taskStatus[chkId1] = true;
    }
    else
    {
        document.getElementById(`${chkId1}`).removeAttribute('checked');
        document.getElementById(`${tkId1}`).classList.remove('lineThru');
        document.getElementById(`${chkId1}`).classList.remove('chk');
        taskStatus[chkId1] = false;
    }
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
    console.log(`before: ${tsIdArr}`);
    document.getElementById(`${delId}`).remove();
    let extId = '';
    for(let s of delId)
    {
        if(s == 't' || s == 's' || s == "-")
            continue;
        else
            extId += s;
    }
    tsIdArr.splice((tsIdArr.indexOf(parseInt(extId))),1);
    console.log(`after : ${tsIdArr}`);
}

