const {ipcRenderer} = require("electron");
const $ = require('jquery');

$('#homePageButton').on('click', ()=>{
    ipcRenderer.send('mainPage-GO',()=>{});
})

$('#signOutButton').on('click', ()=>{
    ipcRenderer.send('signOut-GO', ()=>{});
})

$('#exitButton').on('click', ()=>{
    ipcRenderer.send('exit-GO', ()=>{});
})