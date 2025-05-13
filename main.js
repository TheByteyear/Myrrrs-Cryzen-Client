const { app, BrowserWindow } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "Myrrr's Cryzen Client",
    fullscreen: true,
    titleBarStyle: "default",
    backgroundColor: "#000000",
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      preload: __dirname + "/preload.js",
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: true,
      webSecurity: true,
    },
  });

  const flags = [
    ["disable-frame-rate-limit", null, true], //disable maybe
    ["autoplay-policy", "no-user-gesture-required", true],
    ["disable-features", "NetworkService=1", true],
    ["enable-webgl", null, true],
    ["enable-highres-timer", null, true],
    ["disable-background-timer-throttling", null, true],
    ["enable-javascript-harmony", null, true],
    ["enable-future-v8-vm-features", null, true],
    ["disable-renderer-backgrounding", null, true],
    ["enable-gpu-rasterization", null, true],
    ["enable-oop-rasterization", null, true],
    ["disable-zero-copy", null, true],
    ["max-active-webgl-contexts", "100", true],
    ["webrtc-max-cpu-consumption-percentage", "100", true],
    ["renderer-process-limit", "100", true],
    ["enable-accelerated-2d-canvas", null, true],
    ["enable-quic", null, true],
    ["enable-native-gpu-memory-buffers", null, true],
    ["high-dpi-support", "1", true],
    ["no-pings", null, false],
    ["disable-low-end-device-mode", null, true],
    ["enable-accelerated-video-decode", null, true],
    ["no-proxy-server", null, true],
    ["enable-raw-mouse-input", null, true],
    ["disable-gpu-vsync", null, true], //disable maybe
    ["ignore-gpu-blacklist", null, true],
  ];

  flags.forEach(([flag, value, appendValue]) => {
    if (appendValue === true) {
      app.commandLine.appendSwitch(flag, value);
    } else {
      app.commandLine.appendSwitch(flag);
    }
  });

  mainWindow.webContents.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
  );

  mainWindow.loadURL("https://cryzen.io");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
