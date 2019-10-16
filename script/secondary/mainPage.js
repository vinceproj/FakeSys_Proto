const {ipcRenderer} = require("electron");
const $ = require('jquery');

$('#fileSharingButton').on('click',()=>{
    ipcRenderer.send('fileSharing-GO', ()=>{});
})

$('#messagingButton').on('click',()=>{
    ipcRenderer.send('messaging-GO', ()=>{});
})

$('#notesButton').on('click',()=>{
    ipcRenderer.send('notes-GO', ()=>{});
})

$('#homePageButton').on('click', ()=>{
    ipcRenderer.send('mainPage-GO',()=>{});
})

$('#signOutButton').on('click', ()=>{
    ipcRenderer.send('signOut-GO', ()=>{});
})

$('#exitButton').on('click', ()=>{
    ipcRenderer.send('exit-GO', ()=>{});
})