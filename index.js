require('dotenv').config();
const { app, BrowserWindow } = require('electron')
const {VMVIEW_URL = ""} = process.env;
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.on("ready", async () => {
    const browserWindow = new BrowserWindow();

    browserWindow.webContents.on("did-start-navigation", (event, url) => {
        console.log("did-start-navigation", {url});
    });

    try {
        await browserWindow.loadURL(VMVIEW_URL);
    } catch (e) {
        console.error(e);
    }
});
