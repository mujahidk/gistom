const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

// Main window reference.
let win

// Declare global variables.
global.sharedObject = {
  gistUrl: 'https://api.github.com/gists'
}

function loadSettings(){
  const userDataPath = app.getPath('userData')
  const settingsPath = path.join(userDataPath, 'settings.json')
  if(fs.existsSync(settingsPath)){
    const buf = fs.readFileSync(settingsPath, 'utf8')
    const settings = JSON.parse(buf.toString())
    global.sharedObject.gistUrl = settings.gistUrl
    console.info('Setting gistUrl: ' + global.sharedObject.gistUrl)
  } else {
    console.warn('Settings file does not exist.')
  }
}
function createWindow () {
  // Load settings first.
  loadSettings()
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600, backgroundColor: '#efefef'})

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
  })
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
