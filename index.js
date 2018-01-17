const {app, BrowserWindow} = require("electron")
const path = require('path')
const url = require('url')

let win

function create_window() {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname,'index.html'),
    protocol: 'file',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', create_window)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win == null) {
    create_window()
  }
})
