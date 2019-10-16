const {ipcRenderer} = require("electron");
const $ = require('jquery');

$('#loginButton').on('click',()=>{
    ipcRenderer.send('pass-login', ()=>{});
})

$('#loginHelp').on('click', ()=>{
    ipcRenderer.send('ContactIT-GO', ()=>{});
})