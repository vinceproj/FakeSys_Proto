const {ipcRenderer} = require("electron");
const $ = require('jquery');

//Navigation
$('#homePageButton').on('click', ()=>{
    ipcRenderer.send('mainPage-GO',()=>{});
})

$('#signOutButton').on('click', ()=>{
    ipcRenderer.send('signOut-GO', ()=>{});
})

$('#exitButton').on('click', ()=>{
    ipcRenderer.send('exit-GO', ()=>{});
})

//File Encryption Handling
$('#encryptButton').on('click', ()=>{
    let encryptItem = $('#encryptInput').val();
    console.log(encryptItem);
    
})

$('decryptButton').on('click', ()=>{
    
})
