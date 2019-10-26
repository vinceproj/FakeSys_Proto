const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow, contactITWindow;

//Listen for launch

app.on('ready', ()=>{

    //Create new Window
    mainWindow = new BrowserWindow({width: 800, minWidth: 800, height: 660, minHeight:660, webPreferences:{nodeIntegration:true}});

    //Load index.html into window
    mainWindow.loadFile('src/index.html');

    //Quit app when closed
    mainWindow.on('closed', ()=>{
        app.quit();
    })

    //Set main menu
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

Menu.setApplicationMenu(mainMenu);

})//End of launch function

//Create menu template
const mainMenuTemplate = [
    {
        label: 'Help',
        submenu:[

            //Create window with contact information
            {
                label:'Contact IT',
                click(){
                    createContactITWindow();
                }    
            },

            //Restart the program
            {
                label: 'Sign Out',
                accelerator:process.platform =='darwin' ? 'Command+R':'Ctrl+R',//Keep shortcut while developing
                click(){
                    app.relaunch();
                    app.quit();
                }
            },
            //Divisor
            {type: 'separator'},

            //Exit the program
            {label:'Exit',
        click(){
            app.quit();
        }}
                    ]
                },//End of Help menu
        {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        },

    {label: 'DevTools',
    submenu:[
        {label: 'Toggle DevTools',
    click(item, focusedWindow){
        focusedWindow.toggleDevTools();
    }}
    ]}//End of DevTools
];//End of menu template

//Handle Contact IT window
function createContactITWindow(){

    //Create new window
    contactITWindow = new BrowserWindow({width:400, height:400, title:'Contact IT'});
    
    //Load html into window
    contactITWindow.loadFile('src/contactITWindow.html')
    
    //Garbage collection handle
    contactITWindow.on('closed', function(){
        addWindow = null;
    })
    
    }

//Handle Page Navigation
ipcMain.on('pass-login', ()=>{
    mainWindow.loadFile('src/secondary/mainPage.html');
})

ipcMain.on('ContactIT-GO', ()=>{
    createContactITWindow();
})

ipcMain.on('mainPage-GO', ()=>{
    mainWindow.loadFile('src/secondary/mainPage.html');
})

ipcMain.on('fileSharing-GO', ()=>{
    mainWindow.loadFile('src/secondary/fileSharingSys.html');
})

ipcMain.on('messaging-GO', ()=>{
    mainWindow.loadFile('src/secondary/messagingSys.html');
})

ipcMain.on('notes-GO', ()=>{
    mainWindow.loadFile('src/secondary/notesSys.html');
})

ipcMain.on('signOut-GO', ()=>{
    app.relaunch();
    app.quit();
})

ipcMain.on('exit-GO', ()=>{
    app.quit();
})