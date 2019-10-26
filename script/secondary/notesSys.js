const {ipcRenderer} = require("electron");
const $ = require('jquery');
const fs = require('fs');
const crypto = require('crypto')

const filename = 'localSchedule'

const algorithm = 'aes-192-cbc';
const password = 'FakeSysKey'
const key = 'aaaabbbbccccddddeeeeffff';
const iv = 'aaaabbbbccccdddd'


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

$("#showCurrentDate").text("Today is " + currentDate)

//Encryption functionality
function encrypt(stringTo){
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted;
    
    encrypted = cipher.update(stringTo, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
    }

function decrypt(stringTo){
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted;

    decrypted = decipher.update(stringTo, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

//Task functionality
$("#addTaskButton").on('click', ()=>{
   let task = $('#taskString').val();

    addEntry(task);
    $('#taskString').val("");

    let encryptedString = encrypt(task);

    fs.appendFile(filename, encryptedString +'\n', function(err){
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
            if(readEncrypted){
                readEncrypted = decrypt(readEncrypted);
                addEntry(readEncrypted);
            } 

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