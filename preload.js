const { contextBridge } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  // Tampermonkey-Skript einfügen
  const script1 = document.createElement("script"); // Ads breaker
  script1.innerHTML = `
    const { log, debug, warn, error } = console;

    // block ads
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

  const CLANS_URL    = '/clans';
  const VIDEOS_URL   = '/center/videos';
  const EU_API       = 'https://eu.cryzen.io/matchmake/lobby';
  const US_API       = 'https://us.cryzen.io/matchmake/lobby';
  const UPDATE_INT   = 60_000;

  let euDiv, usDiv;
  let lastPath = location.pathname;

  function waitFor(selector, timeout = 5000) {
    return new Promise((res, rej) => {
      const interval = 100;
      let elapsed = 0;
      const h = setInterval(() => {
        const el = document.querySelector(selector);
        if (el) {
          clearInterval(h);
          res(el);
        } else if ((elapsed += interval) >= timeout) {
          clearInterval(h);
          rej(\`Timeout waiting for \${selector}\`);
        }
      }, interval);
    });
  }

  function addTabs() {
    const nav = document.querySelector('div.navigation');
    if (!nav) return;
    const make = (text, href) => {
      if (![...nav.children].some(el => el.textContent.trim() === text)) {
        const a = document.createElement('a');
        a.setAttribute('data-v-4eef0edf','');
        a.className = 'nav-el';
        a.href = href;
        a.textContent = text;
        a.style.textDecoration = 'none';
        a.addEventListener('click', e => {
          e.preventDefault();
          window.history.pushState({}, '', href);
          window.dispatchEvent(new Event('locationchange'));
        });
        nav.appendChild(a);
      }
    };
    make('VIDEOS', VIDEOS_URL);
    make('CLANS',  CLANS_URL);
  }

  async function setupPlayerCounts() {
    try {
      const container = await waitFor('div.twitch-youtube');
      if ([...container.children].some(el => el.textContent.startsWith('EU Players'))) {
        const divs = container.querySelectorAll('.empty');
        euDiv = Array.from(divs).find(d => d.textContent.startsWith('EU Players'));
        usDiv = Array.from(divs).find(d => d.textContent.startsWith('US Players'));
        return;
      }
      euDiv = document.createElement('div');
      euDiv.setAttribute('data-v-72672670','');
      euDiv.className = 'empty';
      euDiv.textContent = 'EU Players: …';

      usDiv = document.createElement('div');
      usDiv.setAttribute('data-v-72672670','');
      usDiv.className = 'empty';
      usDiv.textContent = 'US Players: …';

      container.appendChild(euDiv);
      container.appendChild(usDiv);
    } catch (err) {
      console.error('setupPlayerCounts:', err);
    }
  }

  async function updatePlayerCounts() {
    if (!euDiv || !usDiv) return;
    try {
      const [eu, us] = await Promise.all(
        [EU_API, US_API].map(u => fetch(u).then(r => r.json()))
      );
      const sum = arr => arr.reduce((s,e) => s + (e.clients||0), 0);
      euDiv.textContent = \`EU Players: \${sum(eu)}\`;
      usDiv.textContent = \`US Players: \${sum(us)}\`;
    } catch (err) {
      console.error('updatePlayerCounts:', err);
    }
  }

  function injectCss() {
    const s = document.createElement('style');
    s.textContent = \`
      a.nav-el, a.nav-el:visited {
        color: white !important;
        text-decoration: none !important;
      }
    \`;
    document.head.appendChild(s);
  }

  function startUrlWatcher() {
    setInterval(() => {
      if (location.pathname !== lastPath) {
        lastPath = location.pathname;
        if (lastPath === '/' || lastPath === '/play') {
          addTabs();
          setupPlayerCounts().then(updatePlayerCounts);
        }
      }
    }, 300);
  }

  window.addEventListener('load', async () => {
    injectCss();
    await waitFor('div.navigation');
    addTabs();
    await setupPlayerCounts();
    await updatePlayerCounts();
    setInterval(updatePlayerCounts, UPDATE_INT);
    startUrlWatcher();
    window.addEventListener('popstate', () => {
      if (location.pathname === '/' || location.pathname === '/play') {
        addTabs();
        setupPlayerCounts().then(updatePlayerCounts);
      }
    });
  });



    ///////////////// paint world
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
                value = getGradientDataURL(256, 256, ['#FFBFF6', '#AC8EFF']);  // purple - idk what that was :skull:
            }
            if (value.includes('lightMap-')) {
                value = getGradientDataURL(256, 256, ['#FFFFFF', '#000000']);  // change lightMap
            }
            if (value.includes('bulletTracer-')) {
                value = getGradientDataURL(256, 256, ['#B200FF', '#FF00DC']); // change bullet tracers
            }
                if (value.includes('blood') || value.includes('smoke') || value.includes('scope')) {     // remove scope
                value = getSqareDataURL(1, 1, '#00000000');
            }

            srcset.call(this, value);
        },
        get() { return this._src; }
    });

  `;

  const script3 = document.createElement("script"); // Faster box and card response
  script3.innerHTML = `
    

        Object.defineProperty(window, 'IS_PROD', {
            set() {},
            get() {
                return false;
            }
        });
            

    `;

  document.head.appendChild(script1);
  document.head.appendChild(script2);
  document.head.appendChild(script3);
});
