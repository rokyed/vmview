require('dotenv').config();
const {
  app,
  BrowserWindow
} = require('electron')
const {
  VMVIEW_URL = ""
} = process.env;
const fs = require('fs')
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

app.on("ready", async () => {
  const browserWindow = new BrowserWindow();

  browserWindow.webContents.on("did-start-navigation", (event, url) => {
    console.log("did-start-navigation", {
      url
    });
  });

  browserWindow.webContents.on('did-finish-load', async (event, url) => {
    let css = encodeURIComponent(fs.readFileSync('./injectable/style.css', 'utf8'))
    let cssInjector = fs.readFileSync('./src/cssInject.js', 'utf8')
    let js = fs.readFileSync('./injectable/script.js', 'utf8')
		cssInjector = cssInjector.replace('{{{{{REPLACEME}}}}}', css)
    await wait(0.1)
    await browserWindow.webContents.executeJavaScript(js);
    await browserWindow.webContents.executeJavaScript(cssInjector)
  })

  try {
    await browserWindow.loadURL(VMVIEW_URL);
  } catch (e) {
    console.error(e);
  }
  browserWindow.onbeforeunload = (e) => {
    console.log('I do not want to be closed')

    // Unlike usual browsers that a message box will be prompted to users, returning
    // a non-void value will silently cancel the close.
    // It is recommended to use the dialog API to let the user confirm closing the
    // application.
    e.returnValue = false // equivalent to `return false` but not recommended
  }
});

const wait = (delay) => {
  return new Promise((res, rej) => {
    setTimeout(res, delay * 1000)
  })
}
