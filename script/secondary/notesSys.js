const {ipcRenderer} = require("electron");
const $ = require('jquery');
const fs = require('fs');
const crypto = require('crypto')

const filename = 'localSchedule'

const algorithm = 'aes-192-cbc';
const password = 'for key generation here'
const key = crypto.scryptSync(password, 'salt', 24);
const iv = 'aaaabbbbccccdddd'
const cipher = crypto.createCipheriv(algorithm, key, iv);


$('#homePageButton').on('click', ()=>{
    ipcRenderer.send('mainPage-GO',()=>{});
})

$('#signOutButton').on('click', ()=>{
    ipcRenderer.send('signOut-GO', ()=>{});
})

$('#exitButton').on('click', ()=>{
    ipcRenderer.send('exit-GO', ()=>{});
})

//Date functionality
let currentDate;
let dateFinder = new Date();
currentDate = (dateFinder.getMonth()+1) + "/" + dateFinder.getDate() + "/" + dateFinder.getFullYear()
console.log(currentDate);

$("#showCurrentDate").text("Today is " + currentDate)

//Encryption functionality
function encrypt(stringTo){
    cipher.on('readable', ()=>{
        let chunk;
        while(null!== (chunk = cipher.read())){
            stringTo += chunk.toString('hex');
            stringTo += '\n'
        }
    })

    cipher.end();
    console.log(stringTo)


}

//Task functionality
$("#addTaskButton").on('click', ()=>{
   let task = $('#taskString').val();

    addEntry(task);
    $('#taskString').val("");


    encrypt(task);

    fs.appendFile(filename, task +'\n', function(err){
        if (err) throw err;
    })
})

function addEntry(task){
    let updateString = '<tr><td>' + currentDate + '</td><td></td><td>' + task + '</td>';
    $('#taskTable').append(updateString);
}

function loadSchedule(){
    //Check if file exists
    if(fs.existsSync(filename)){
        let data = fs.readFileSync(filename, 'utf8').split('\n');

        data.forEach((readEncrypted, index)=>{
            //let readText = decrypt(readEncrypted);
            if(readEncrypted) 
            addEntry(readEncrypted);

        })
    }else {
        console.log("error");
        fs.writeFile(filename, "", (err)=>{
            if(err)
            console.log(err)
        })
    }
}

loadSchedule();