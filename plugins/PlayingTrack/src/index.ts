import type { LunaUnload } from "@luna/core";
import { MediaItem, ipcRenderer } from "@luna/lib";
import "./trackWindow.native";
import { openTrackWindow as openWindowNative, closeWindow, sendIPC } from "./trackWindow.native";

export const openWindow = () => openWindowNative();
export { Settings } from "./Settings";

export const unloads = new Set<LunaUnload>();
unloads.add(() => {
    console.log("Unloading Playing Track");
});



ipcRenderer.on(unloads, "client.playback.playersignal", async (data) => {
    const mediaItem = await MediaItem.fromPlaybackContext();
    if (!mediaItem) return;

    let title = await mediaItem.title();
    let artist = await mediaItem.artist();
    let coverUrl = await mediaItem.coverUrl();
    let songLength = await mediaItem.duration;
    let songProgress = data.time;
    

    sendIPC("track.update", JSON.stringify({
        title: title || "Unknown Title",
        artist: artist || "Unknown Artist",
        coverUrl: coverUrl || "",
        songLength: songLength || 0,
        songProgress: songProgress || 0,
    }));
});

unloads.add(closeWindow);