import { app, BrowserWindow } from "electron";
import trackHtml from "file://track.html?base64&minify";
import preloadCode from "file://trackWindow.preload.js";
import { writeFile } from "fs/promises";
import path from "path";

let win: BrowserWindow | null = null;

export const openTrackWindow = async () => {
	if (win && !win.isDestroyed()) return win.focus();
    const preloadPath = path.join(app.getPath("temp"), `${Math.random().toString()}.preload.js`);
    try {
        await writeFile(preloadPath, preloadCode, "utf-8");

        win = new BrowserWindow({
            width: 700,
            height: 380,
            transparent: true,
            frame: false,
            resizable: false,
			webPreferences: {
                preload: preloadPath,
                backgroundThrottling: false
			},
            
			autoHideMenuBar: true,
        });

        await win.loadURL(`data:text/html;base64,${trackHtml}`);
    } catch (error) {
        console.error("Failed to create Track window:", error);
        return null;
    }
}

export const closeWindow = async () => {
	if (win && !win.isDestroyed()) win.close();
};

export const sendIPC = (channel: string, data: any) => {
    if (win && !win.isDestroyed()) {
        win.webContents.send(channel, data);
    }
}