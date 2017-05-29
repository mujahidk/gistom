const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const Config = require('electron-config');
const config = new Config();

// Main window reference.
let win

// Declare global variables.
global.sharedObject = {
  gistUser: null
}

function loadSettings(){
  const userDataPath = app.getPath('userData');
  console.info('Settings file path: ', userDataPath);
  global.sharedObject.gistUser = config.get('gistuser');
  console.info('Setting gistUser: ', global.sharedObject.gistUser)
}
function createWindow () {
  // Load settings first.
  loadSettings()
  let { width, height } = config.get('windowBounds') || { width: 800, height: 600 };
  // Create the browser window.
  win = new BrowserWindow({ width, height });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools if command like parameter has --dev-tools argument.
  if(process.argv.indexOf("--dev-tools")>=0){
    win.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  });
  // On window resize save the window dimensions.
  win.on('resize', () => {
    let { width, height } = win.getBounds();
    config.set('windowBounds', { width, height });
  });
}

// When electron is ready, create window.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
