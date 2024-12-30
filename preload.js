const { contextBridge } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const script1 = document.createElement("script"); // Ads breaker
  script1.innerHTML = `
    const { log, debug, warn, error } = console;

    // Ad stuff (Makes Poki SDK work with most adblockers, the ad will be skipped but the rewards will still be granted)
    function skipRewardedBreak() {
        return new Promise(resolve => {
            resolve(true);
        });
    }

    Object.defineProperties(Object.prototype, {
        'rewardedBreak': {
            get() {
                return skipRewardedBreak.bind(this);
            },
            set() {},
            enumerable: false,
        },
        'gameanalytics': {
            get() {
                return {
                    GameAnalytics: {
                        addAdEvent: () => {},
                    },
                    "EGAErrorSeverity": {
                        "0": "Undefined",
                        "1": "Debug",
                        "2": "Info",
                        "3": "Warning",
                        "4": "Error",
                        "5": "Critical",
                        "Undefined": 0,
                        "Debug": 1,
                        "Info": 2,
                        "Warning": 3,
                        "Error": 4,
                        "Critical": 5
                    },
                    "EGAProgressionStatus": {
                        "0": "Undefined",
                        "1": "Start",
                        "2": "Complete",
                        "3": "Fail",
                        "Undefined": 0,
                        "Start": 1,
                        "Complete": 2,
                        "Fail": 3
                    },
                    "EGAResourceFlowType": {
                        "0": "Undefined",
                        "1": "Source",
                        "2": "Sink",
                        "Undefined": 0,
                        "Source": 1,
                        "Sink": 2
                    },
                    "EGAAdAction": {
                        "0": "Undefined",
                        "1": "Clicked",
                        "2": "Show",
                        "3": "FailedShow",
                        "4": "RewardReceived",
                        "Undefined": 0,
                        "Clicked": 1,
                        "Show": 2,
                        "FailedShow": 3,
                        "RewardReceived": 4
                    },
                    "EGAAdError": {
                        "0": "Undefined",
                        "1": "Unknown",
                        "2": "Offline",
                        "3": "NoFill",
                        "4": "InternalError",
                        "5": "InvalidRequest",
                        "6": "UnableToPrecache",
                        "Undefined": 0,
                        "Unknown": 1,
                        "Offline": 2,
                        "NoFill": 3,
                        "InternalError": 4,
                        "InvalidRequest": 5,
                        "UnableToPrecache": 6
                    },
                    "EGAAdType": {
                        "0": "Undefined",
                        "1": "Video",
                        "2": "RewardedVideo",
                        "3": "Playable",
                        "4": "Interstitial",
                        "5": "OfferWall",
                        "6": "Banner",
                        "Undefined": 0,
                        "Video": 1,
                        "RewardedVideo": 2,
                        "Playable": 3,
                        "Interstitial": 4,
                        "OfferWall": 5,
                        "Banner": 6
                    },
                    "http": {
                        "EGAHTTPApiResponse": {
                            "0": "NoResponse",
                            "1": "BadResponse",
                            "2": "RequestTimeout",
                            "3": "JsonEncodeFailed",
                            "4": "JsonDecodeFailed",
                            "5": "InternalServerError",
                            "6": "BadRequest",
                            "7": "Unauthorized",
                            "8": "UnknownResponseCode",
                            "9": "Ok",
                            "10": "Created",
                            "NoResponse": 0,
                            "BadResponse": 1,
                            "RequestTimeout": 2,
                            "JsonEncodeFailed": 3,
                            "JsonDecodeFailed": 4,
                            "InternalServerError": 5,
                            "BadRequest": 6,
                            "Unauthorized": 7,
                            "UnknownResponseCode": 8,
                            "Ok": 9,
                            "Created": 10
                        }
                    },
                    "events": {
                        "EGASdkErrorCategory": {
                            "0": "Undefined",
                            "1": "EventValidation",
                            "2": "Database",
                            "3": "Init",
                            "4": "Http",
                            "5": "Json",
                            "Undefined": 0,
                            "EventValidation": 1,
                            "Database": 2,
                            "Init": 3,
                            "Http": 4,
                            "Json": 5
                        },
                        "EGASdkErrorArea": {
                            "0": "Undefined",
                            "1": "BusinessEvent",
                            "2": "ResourceEvent",
                            "3": "ProgressionEvent",
                            "4": "DesignEvent",
                            "5": "ErrorEvent",
                            "9": "InitHttp",
                            "10": "EventsHttp",
                            "11": "ProcessEvents",
                            "12": "AddEventsToStore",
                            "20": "AdEvent",
                            "Undefined": 0,
                            "BusinessEvent": 1,
                            "ResourceEvent": 2,
                            "ProgressionEvent": 3,
                            "DesignEvent": 4,
                            "ErrorEvent": 5,
                            "InitHttp": 9,
                            "EventsHttp": 10,
                            "ProcessEvents": 11,
                            "AddEventsToStore": 12,
                            "AdEvent": 20
                        },
                        "EGASdkErrorAction": {
                            "0": "Undefined",
                            "1": "InvalidCurrency",
                            "2": "InvalidShortString",
                            "3": "InvalidEventPartLength",
                            "4": "InvalidEventPartCharacters",
                            "5": "InvalidStore",
                            "6": "InvalidFlowType",
                            "7": "StringEmptyOrNull",
                            "8": "NotFoundInAvailableCurrencies",
                            "9": "InvalidAmount",
                            "10": "NotFoundInAvailableItemTypes",
                            "11": "WrongProgressionOrder",
                            "12": "InvalidEventIdLength",
                            "13": "InvalidEventIdCharacters",
                            "15": "InvalidProgressionStatus",
                            "16": "InvalidSeverity",
                            "17": "InvalidLongString",
                            "18": "DatabaseTooLarge",
                            "19": "DatabaseOpenOrCreate",
                            "25": "JsonError",
                            "29": "FailHttpJsonDecode",
                            "30": "FailHttpJsonEncode",
                            "31": "InvalidAdAction",
                            "32": "InvalidAdType",
                            "33": "InvalidString",
                            "Undefined": 0,
                            "InvalidCurrency": 1,
                            "InvalidShortString": 2,
                            "InvalidEventPartLength": 3,
                            "InvalidEventPartCharacters": 4,
                            "InvalidStore": 5,
                            "InvalidFlowType": 6,
                            "StringEmptyOrNull": 7,
                            "NotFoundInAvailableCurrencies": 8,
                            "InvalidAmount": 9,
                            "NotFoundInAvailableItemTypes": 10,
                            "WrongProgressionOrder": 11,
                            "InvalidEventIdLength": 12,
                            "InvalidEventIdCharacters": 13,
                            "InvalidProgressionStatus": 15,
                            "InvalidSeverity": 16,
                            "InvalidLongString": 17,
                            "DatabaseTooLarge": 18,
                            "DatabaseOpenOrCreate": 19,
                            "JsonError": 25,
                            "FailHttpJsonDecode": 29,
                            "FailHttpJsonEncode": 30,
                            "InvalidAdAction": 31,
                            "InvalidAdType": 32,
                            "InvalidString": 33
                        },
                        "EGASdkErrorParameter": {
                            "0": "Undefined",
                            "1": "Currency",
                            "2": "CartType",
                            "3": "ItemType",
                            "4": "ItemId",
                            "5": "Store",
                            "6": "FlowType",
                            "7": "Amount",
                            "8": "Progression01",
                            "9": "Progression02",
                            "10": "Progression03",
                            "11": "EventId",
                            "12": "ProgressionStatus",
                            "13": "Severity",
                            "14": "Message",
                            "15": "AdAction",
                            "16": "AdType",
                            "17": "AdSdkName",
                            "18": "AdPlacement",
                            "Undefined": 0,
                            "Currency": 1,
                            "CartType": 2,
                            "ItemType": 3,
                            "ItemId": 4,
                            "Store": 5,
                            "FlowType": 6,
                            "Amount": 7,
                            "Progression01": 8,
                            "Progression02": 9,
                            "Progression03": 10,
                            "EventId": 11,
                            "ProgressionStatus": 12,
                            "Severity": 13,
                            "Message": 14,
                            "AdAction": 15,
                            "AdType": 16,
                            "AdSdkName": 17,
                            "AdPlacement": 18
                        }
                    },
                    "logging": {},
                    "utilities": {},
                    "validators": {},
                    "device": {},
                    "threading": {},
                    "store": {
                        "EGAStoreArgsOperator": {
                            "0": "Equal",
                            "1": "LessOrEqual",
                            "2": "NotEqual",
                            "Equal": 0,
                            "LessOrEqual": 1,
                            "NotEqual": 2
                        },
                        "EGAStore": {
                            "0": "Events",
                            "1": "Sessions",
                            "2": "Progression",
                            "Events": 0,
                            "Sessions": 1,
                            "Progression": 2
                        }
                    },
                    "state": {},
                    "tasks": {},
                };
            },
            set(v) {},
            enumerable: false,
        },
    });
  `;

  const script2 = document.createElement("script"); //settings panel
  script2.innerHTML = `

    Object.defineProperty(window, 'IS_PROD', {
        set() {},
        get() {
            return false;
        }
    });


    (function () {
                'use strict';

                const fontLink = document.createElement('link');
                fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
                fontLink.rel = 'stylesheet';
                document.head.appendChild(fontLink);

                const globalStyle = document.createElement('style');
                globalStyle.innerHTML = \`
                    * {
                        font-family: 'Roboto', sans-serif !important;
                        user-select: none;
                    }
                \`;
                document.head.appendChild(globalStyle);

                const settingsButton = document.createElement('div');
                settingsButton.id = 'settingsButton';
                settingsButton.textContent = '⚙';
                settingsButton.style.position = 'fixed';
                settingsButton.style.top = '400px';
                settingsButton.style.right = '10px';
                settingsButton.style.width = '45px';
                settingsButton.style.height = '45px';
                settingsButton.style.background = '#333';
                settingsButton.style.color = '#fff';
                settingsButton.style.display = 'none';
                settingsButton.style.alignItems = 'center';
                settingsButton.style.justifyContent = 'center';
                settingsButton.style.borderRadius = '50%';
                settingsButton.style.cursor = 'pointer';
                settingsButton.style.zIndex = '1001';
                settingsButton.style.fontSize = '24px';
                settingsButton.style.fontWeight = 'bold';
                settingsButton.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
                settingsButton.style.transition = 'background-color 0.5s';
                settingsButton.style.display = 'flex';
                document.body.appendChild(settingsButton);

                settingsButton.addEventListener('mouseenter', () => {
                    settingsButton.style.background = 'linear-gradient(45deg, #d400ff, #6600ff)';
                });

                settingsButton.addEventListener('mouseleave', () => {
                    settingsButton.style.background = '#333';
                });

                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Insert') {
                    settingsButton.style.display = settingsButton.style.display === 'none' ? 'flex' : 'none';
                    }
                });

                const settingsPanel = document.createElement('div');
                settingsPanel.id = 'settingsPanel';
                settingsPanel.style.display = 'none';
                settingsPanel.style.position = 'fixed';
                settingsPanel.style.top = '10%';
                settingsPanel.style.right = '10px';
                settingsPanel.style.minWidth = '18vw';
                settingsPanel.style.width = 'auto';
                settingsPanel.style.height = 'auto';
                settingsPanel.style.background = 'rgba(0, 0, 0, 0.8)';
                settingsPanel.style.borderRadius = '15px';
                settingsPanel.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                settingsPanel.style.zIndex = '1000';
                settingsPanel.style.padding = '20px';
                settingsPanel.style.overflowY = 'auto';
                settingsPanel.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
                settingsPanel.style.transform = 'translateX(100%)';
                settingsPanel.style.opacity = '0';

                document.body.appendChild(settingsPanel);

                const style = document.createElement('style');
                style.innerHTML = \`
                    .switch {
                        position: relative;
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;
                        padding: 10px;
                        box-sizing: border-box;
                        width: 300px;
                        background: #222;
                        border-radius: 10px;
                        margin-left: 30px;
                    }

                    .switchLabel {
                        color: white;
                        font-size: 16px;
                        margin-right: 10px;
                        flex: 1;
                    }

                    .switch input {
                        opacity: 0;
                        width: 0;
                        height: 0;
                    }

                    .slider {
                        position: relative;
                        cursor: pointer;
                        width: 50px;
                        height: 24px;
                        background-color: #ccc;
                        border-radius: 24px;
                        transition: .4s;
                        border: 2px solid #888;
                    }

                    .slider:before {
                        position: absolute;
                        content: "";
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        left: 2px;
                        bottom: 2px;
                        background-color: white;
                        transition: .4s;
                    }

                    input:checked + .slider {
                        background-color: #6617FD;
                        border-color: #9912FD;
                    }

                    input:checked + .slider:before {
                        transform: translateX(23px);
                    }

                    .slider.off {
                        background-color: #0e1111;
                        border-color: #000000;
                    }

                    .slider.off:before {
                        transform: translateX(0);
                    }

                    .tooltip {
                        position: absolute;
                        background-color: rgba(0, 0, 0, 0.9);
                        color: white;
                        padding: 15px 20px;
                        border-radius: 10px;
                        font-size: 14px;
                        white-space: nowrap;
                        z-index: 1002;
                        opacity: 0;
                        transition: opacity 0.2s ease-in-out;
                        pointer-events: none;
                        transform: translateX(-20%);
                    }
                \`;
                document.head.appendChild(style);

                const createTooltip = (text) => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = text;
                    document.body.appendChild(tooltip);
                    return tooltip;
                };

                const showTooltip = (tooltip, element) => {
                    const rect = element.getBoundingClientRect();
                    tooltip.style.top = \`\${rect.top + 40}px\`;
                    tooltip.style.left = \`\${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px\`;
                    tooltip.style.opacity = '1';
                };

                const hideTooltip = (tooltip) => {
                    tooltip.style.opacity = '0';
                };

                const createSwitchWithFunction = (labelText, tooltipText, onChangeFunction) => {
                    const switchContainer = document.createElement('label');
                    switchContainer.className = 'switch';

                    const switchLabel = document.createElement('span');
                    switchLabel.className = 'switchLabel';
                    switchLabel.textContent = labelText;
                    switchContainer.appendChild(switchLabel);

                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    switchContainer.appendChild(input);

                    const slider = document.createElement('span');
                    slider.className = 'slider off';
                    switchContainer.appendChild(slider);

                    input.addEventListener('change', () => {
                        slider.className = input.checked ? 'slider' : 'slider off';
                        onChangeFunction(input.checked);
                    });

                    const tooltip = createTooltip(tooltipText);

                    switchContainer.addEventListener('mouseenter', () => showTooltip(tooltip, switchContainer));
                    switchContainer.addEventListener('mouseleave', () => hideTooltip(tooltip));

                    return switchContainer;
                };

            ////////////////////////////////////////////////// RAVE MODE
            let colorChangeInterval;

            const switchFunction1 = async (isChecked) => {
                if (isChecked) {
                    startColorChange();
                } else {
                    stopColorChange();
                }
            };

            const startColorChange = () => {
                if (!colorChangeInterval) {
                    colorChangeInterval = setInterval(changeColorsToRainbow, 1000);
                }
            };

            const stopColorChange = () => {
                clearInterval(colorChangeInterval);
                colorChangeInterval = null;
                resetColors();
            };

            const changeColorsToRainbow = () => {
                const divElements = document.querySelectorAll('div');
                
                divElements.forEach((el) => {
                    const excludedTags = ['feColorMatrix', 'path', 'defs', 'clipPath', 'filter', 
                                        'feOffset', 'feComposite', 'feGaussianBlur', 'symbol', 
                                        'g', 'svg', 'link', 'script', 'head', 'meta'];

                    if (excludedTags.includes(el.tagName.toLowerCase())) {
                        return;
                    }

                    el.style.transition = 'color 0.5s, background-color 0.5s';
                    let hue = Math.random() * 360;
                    el.style.color = \`hsl(\${hue}, 100%, 50%)\`;
                });
            };

            const resetColors = () => {
                const divElements = document.querySelectorAll('div');
                divElements.forEach((el) => {
                    const excludedTags = ['feColorMatrix', 'path', 'defs', 'clipPath', 'filter', 
                                        'feOffset', 'feComposite', 'feGaussianBlur', 'symbol', 
                                        'g', 'svg', 'link', 'script', 'head', 'meta'];

                    if (excludedTags.includes(el.tagName.toLowerCase())) {
                        return;
                    }

                    el.style.color = '';
                    el.style.backgroundColor = '';
                });
            };



            //////////////////////////////////////////////////////////////////// show future clans page
            const switchFunction2 = async (isChecked) => {
                    if (isChecked) {
                        window.location.href = 'https://cryzen.io/clans/warfare';
                    }
                    else {
                        window.location.href = 'https://cryzen.io/';
                    }
                };

                //////////////////////////////////////////////////////// crosshair

                const addCrosshair = () => {
                const style = document.createElement('style');
                style.id = 'crosshairStyle';
                style.textContent = \`
                    @keyframes smoothColorChange {
                        0% { background-color: #FF02D4; }
                        50% { background-color: #8C0AFF; }
                        100% { background-color: #FF02D4; }
                    }
                \`;
                document.head.appendChild(style);

                const verticalLine = document.createElement('div');
                verticalLine.id = 'verticalLine';
                verticalLine.style.cssText = \`
                    width: 2px;
                    height: 14px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 200;
                    animation: smoothColorChange 2s infinite;
                \`;

                const horizontalLine = document.createElement('div');
                horizontalLine.id = 'horizontalLine';
                horizontalLine.style.cssText = \`
                    width: 14px;
                    height: 2px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 200;
                    animation: smoothColorChange 2s infinite;
                \`;

                const verticalOutline = document.createElement('div');
                verticalOutline.id = 'verticalOutline';
                verticalOutline.style.cssText = \`
                    width: 6px;
                    height: 18px;
                    background-color: #000000;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 200;
                \`;

                const horizontalOutline = document.createElement('div');
                horizontalOutline.id = 'horizontalOutline';
                horizontalOutline.style.cssText = \`
                    width: 18px;
                    height: 6px;
                    background-color: #000000;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 200;
                \`;

                document.body.appendChild(verticalOutline);
                document.body.appendChild(horizontalOutline);
                document.body.appendChild(verticalLine);
                document.body.appendChild(horizontalLine);
            };

            const removeCrosshair = () => {
                const ids = ['crosshairStyle', 'verticalLine', 'horizontalLine', 'verticalOutline', 'horizontalOutline'];
                ids.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.remove();
                    }
                });
            };

            const switchFunction3 = async (isChecked) => {
                if (isChecked) {
                    addCrosshair();
                } else {
                    removeCrosshair();
                }
            };

            //////////////////////////////////////////////////////// "Touch grass" will close the client only in the lobby to prevent missclicks
              const switchFunction4 = (isChecked) => {
                  window.close();
              };

              const switchElement1 = createSwitchWithFunction('RAVE Mode', 'Color is key', switchFunction1);
              const switchElement2 = createSwitchWithFunction('Clans Page', 'See the future clans page', switchFunction2);
              const switchElement3 = createSwitchWithFunction('Crosshair Overlay', 'No crosshair? No problem!', switchFunction3);
              const switchElement4 = createSwitchWithFunction('Touch Grass', 'Close the game and go outside!', switchFunction4);
              settingsPanel.appendChild(switchElement1);
              settingsPanel.appendChild(switchElement2);
              settingsPanel.appendChild(switchElement3);
              settingsPanel.appendChild(switchElement4);

              settingsButton.addEventListener('click', () => {
                  const isPanelVisible = settingsPanel.style.display === 'block';
                  if (isPanelVisible) {
                      settingsPanel.style.transform = 'translateX(100%)';
                      settingsPanel.style.opacity = '0';
                      setTimeout(() => {
                          settingsPanel.style.display = 'none';
                      }, 300);
                  } else {
                      settingsPanel.style.display = 'block';
                      setTimeout(() => {
                          settingsPanel.style.transform = 'translateX(0)';
                          settingsPanel.style.opacity = '1';
                      }, 10);
                  }
              });

              ////////// Show player count
              const updatePlayerCount = () => {
              const euPlayersElement = document.createElement('div');
              const usPlayersElement = document.createElement('div');
              euPlayersElement.style.marginTop = '20px';
              euPlayersElement.style.marginLeft = '40px';
              euPlayersElement.style.fontWeight = 'bold';
              euPlayersElement.style.color = 'gray';

              usPlayersElement.style.marginTop = '10px';
              usPlayersElement.style.marginLeft = '40px';
              usPlayersElement.style.fontWeight = 'bold';
              usPlayersElement.style.color = 'gray';

              fetch("https://fra1-2.cryzen.io/matchmake/lobby")
                  .then(r => r.json())
                  .then(data => {
                      const euCount = data.reduce((acc, el) => acc + el.clients, 0);
                      euPlayersElement.textContent = \`EU Players: \${euCount}\`;
                  })

              fetch("https://usa-1.cryzen.io/matchmake/lobby")
                  .then(r => r.json())
                  .then(data => {
                      const usCount = data.reduce((acc, el) => acc + el.clients, 0);
                      usPlayersElement.textContent = \`US Players: \${usCount}\`;
                  })

              settingsPanel.appendChild(euPlayersElement);
              settingsPanel.appendChild(usPlayersElement);
          };

          updatePlayerCount();



              ///////////////// paint the sky
              const srcset = Object.getOwnPropertyDescriptor(Image.prototype, 'src').set;

              function getGradientDataURL(width, height, colors) {
                  const canvas = document.createElement('canvas');
                  canvas.width = width;
                  canvas.height = height;
                  const context = canvas.getContext('2d');

                  const gradient = context.createLinearGradient(0, 0, width, 0);

                  const colorStops = colors.length - 1;
                  colors.forEach((color, index) => {
                      gradient.addColorStop(index / colorStops, color);
                  });

                  context.fillStyle = gradient;
                  context.fillRect(0, 0, width, height);

                  return canvas.toDataURL();
              }

              Object.defineProperty(Image.prototype, 'src', {
                  set(value) {
                      this._src = value;
                      if (typeof value != 'string') { return srcset.call(this, value); }

                      if (value.includes('madap-')) {
                          value = getGradientDataURL(256, 256, ['#FFBFF6', '#AC8EFF']);  // purple
                      }
                      if (value.includes('lightMap-')) {
                          value = getGradientDataURL(256, 256, ['#FFFFFF', '#000000']);  // lightMap
                      }
                      if (value.includes('bulletTracer-')) {
                          value = getGradientDataURL(256, 256, ['#B200FF', '#FF00DC']);
                      }
                          if (value.includes('blood') || value.includes('smoke') || value.includes('scope')) {
                          value = getSqareDataURL(1, 1, '#00000000');
                      }

                      if (value.includes('2048-') || value.includes('3072-') || value.includes('1024-')) {
                          value = getGradientDataURL(256, 256, [
                              '#FF0000',  // red
                              '#FF7F00',  // Orange
                              '#FFFF00',  // yellow
                              '#00FF00',  // Green
                              '#0000FF',  // Blue
                              '#4B0082',  // Indigo
                              '#8B00FF',  // Violet
                              '#4B0082',  // Indigo
                              '#0000FF',  // Blue
                              '#00FF00',  // Green
                              '#FFFF00',  // yellow
                              '#FF7F00',  // Orange
                              '#FF0000'   // Red
                          ]);
                      }

                      srcset.call(this, value);
                  },
                  get() { return this._src; }
              });

          })();

  `;

  const script3 = document.createElement("script"); // Faster box and card response (reload the site to skip animation)
  script3.innerHTML = `

            function showToast(content, rarity) {
                let toastContainer = document.getElementById('toast-container');
                if (!toastContainer) {
                    toastContainer = document.createElement('div');
                    toastContainer.id = 'toast-container';
                    toastContainer.style.position = 'fixed';
                    toastContainer.style.top = '10px';
                    toastContainer.style.left = '50%';
                    toastContainer.style.transform = 'translateX(-50%)';
                    toastContainer.style.zIndex = '9999';
                    document.body.appendChild(toastContainer);
                }

                const toast = document.createElement('div');
                toast.textContent = content;

                let gradient;
                switch (rarity?.toUpperCase()) {
                    case 'LEGENDARY': gradient = 'linear-gradient(to bottom, #FFAD36, #FF8243)'; break;
                    case 'EPIC': gradient = 'linear-gradient(to bottom, #C936FF, #8736FF)'; break;
                    case 'COMMON': gradient = 'linear-gradient(to bottom, #83FD90, #25EA67)'; break;
                    case 'RARE': gradient = 'linear-gradient(to bottom, #3578FE, #2144EB)'; break;
                    default: gradient = 'linear-gradient(to bottom, #777, #444)';
                }
                toast.style.background = gradient;
                toast.style.color = 'white';
                toast.style.padding = '10px 20px';
                toast.style.marginTop = '5px';
                toast.style.borderRadius = '5px';
                toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
                toast.style.fontSize = '16px';
                toast.style.fontFamily = 'Arial, sans-serif';
                toast.style.fontWeight = 'bold';
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.5s ease';

                toastContainer.appendChild(toast);

                setTimeout(() => {
                    toast.style.opacity = '1';
                }, 10);

                setTimeout(() => {
                    toast.style.opacity = '0';
                    setTimeout(() => {
                        toast.remove();
                    }, 500);
                }, 3000);
            }

            const originalXhrOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url) {
                this.addEventListener('load', function() {
                    if (url.includes('openBox') || url.includes('openCard')) {
                        const data = JSON.parse(this.responseText);

                        if (url.includes('openBox')) {
                            const content = \`\${data.name} (\${data.weaponName})\`;
                            showToast(content, data.rarity);
                        } else if (url.includes('openCard')) {
                            if (data.type === 'item') {
                                showToast('NEW WEAPON :D');
                            } else {
                                const content = \`\${data.value} x \${data.type.toUpperCase()}\`;
                                showToast(content, data.rarity);
                            }
                        }
                    }
                });
                originalXhrOpen.apply(this, arguments);
            };

            const originalFetch = window.fetch;
            window.fetch = function(...args) {
                const [url] = args;

                if (typeof url === 'string' && (url.includes('openBox') || url.includes('openCard'))) {
                    return originalFetch(...args).then(response => {
                        response.clone().json().then(data => {
                            if (url.includes('openBox')) {
                                const content = \`\${data.name} (\${data.weaponName})\`;
                                showToast(content, data.rarity);
                            } else if (url.includes('openCard')) {
                                if (data.type === 'item') {
                                    showToast('NEW WEAPON :D');
                                } else {
                                    const content = \`\${data.value} x \${data.type.toUpperCase()}\`;
                                    showToast(content, data.rarity);
                                }
                            }
                        });
                        return response;
                    });
                } else {
                    return originalFetch(...args);
                }
            };

    `;

  document.head.appendChild(script1);
  document.head.appendChild(script2);
  document.head.appendChild(script3);
});
