oSpP = false;
function oSendpulsePush() {
  var L = 'https://boil.cescoferraro.xyz';
  var j = 'https://boil.cescoferraro.xyz';
  var p = 'https://boil.cescoferraro.xyz';
  var k = 'https://boil.cescoferraro.xyz';
  var q = '7c977009d5861eebb711656eb7d87a74';
  var l = false;
  var w = false;
  var A = {};
  var a = '';
  var K = 'web.com.sendpulse.push';
  var n = 'https://pushdata.sendpulse.com:4434';
  var C = 'https://pushdata.sendpulse.com:4435';
  var b = 'https://android.googleapis.com/gcm/send/';
  var s = true;
  var i = '055571028b2970b1eb380ea4137f1a05';
  var z = '';
  var m = '';
  var e = '';
  var E = 'Allow  to send web push notifications to your desktop.';
  var B = null;
  var r = null;
  var H = false;
  var t = {};
  var c = {};
  var h = false;
  var J = 'https://updates.push.services.mozilla.com/push/';
  var u = 'https://updates.push.services.mozilla.com/wpush/v1/';
  var y = false;
  var f = 0;
  var o = false;
  var F = false;
  var x = false;
  var g = false;
  var I = true;
  var d = '1';
  var D = 'sendpulse.com';
  var G = {
    ru: 'Предоставлено SendPulse',
    en: 'Powered by SendPulse',
    ua: 'Надано SendPulse'
  };
  var v = '0';
  this.start = function() {
    if (!oSpP.detectSite()) {
      oSpP.log('Application allowed only for ' + L);
      return false;
    }
    if (oSpP.detectOs() == 'iOS') {
      oSpP.log('Application can not work on iOS');
      return false;
    }
    var M = oSpP.detectOs();
    if (!I) {
      if (M == 'iOS' || M == 'Android') {
        oSpP.log('Application disabled for your device');
        return false;
      }
    }
    oSpP.detectHttps();
    A = oSpP.detectBrowser();
    a = A.name.toLowerCase();
    if (a == 'firefox' && parseFloat(A.version) < 44) {
      oSpP.log(
        'Application can not work with Firefox browser version less then 44'
      );
      return false;
    }
    if (a == 'opera' && parseFloat(A.version) < 43) {
      oSpP.log(
        'Application can not work with Opera browser version less then 43'
      );
      return false;
    }
    if (a == 'firefox' && M == 'Android') {
      oSpP.log('Application can not work with Firefox on Android');
      return false;
    }
    if (a == 'firefox') {
      p = k;
    }
    if (w) {
      if (o) {
        x = true;
        g = true;
      }
      var O = setInterval(function() {
        if (F && x && g) {
          oSpP.sendToParent('closeme');
          clearInterval(O);
        }
      }, 50);
    }
    if (l) {
      if (s) {
        oSpP.startDelayedSubscription(function() {
          oSpP.startSubscription();
          if (a == 'safari' || a == 'chrome' || a == 'firefox') {
            oSpP.showhelpPromptText();
          }
        });
      } else {
        oSpP.getDbValue('SPIDs', 'PromptClosed', function(Q) {
          if (Q.target.result === undefined) {
            if (a == 'safari' || a == 'chrome' || a == 'firefox') {
              oSpP.startDelayedSubscription(function() {
                oSpP.showCustomPrompt();
              });
            }
          }
        });
        var P = document.querySelectorAll('.sp_notify_prompt');
        for (var N = 0; N < P.length; N++) {
          P[N].addEventListener('click', function() {
            oSpP.startSubscription();
          });
        }
      }
    }
    if (w) {
      window.addEventListener(
        'message',
        function(R) {
          if (oSpP.detectOrigin(R.origin)) {
            if (R.data == 'init') {
              r = R;
              r.source.postMessage('initend', r.origin);
            } else {
              if (R.data.indexOf('initpage') === 0) {
                var Q = R.data.split('|');
                if (Q.length == 2) {
                  H = Q[1];
                }
              } else {
                if (R.data.indexOf('initvariables') === 0) {
                  var Q = R.data.split('|');
                  t = JSON.parse(Q[1]);
                }
              }
            }
          }
        },
        false
      );
    }
  };
  this.startSubscription = function() {
    switch (a) {
      case 'safari':
        if (oSpP.isSafariNotificationSupported()) {
          var N = window.safari.pushNotification.permission(K);
          oSpP.checkSafariPermission(N);
        }
        break;
      case 'chrome':
      case 'firefox':
      case 'opera':
        if (l) {
          var M = document.createElement('link');
          M.rel = 'manifest';
          M.href = '/sp-push-manifest.json';
          document.head.insertBefore(M, document.head.firstChild);
        }
        if (oSpP.isServiceWorkerChromeSupported()) {
          oSpP.log('ASK for Permission');
          f = Date.now();
          Notification.requestPermission(oSpP.doActionsWithPermissions);
          oSpP.registerChrome();
        }
        break;
    }
  };
  this.clearDomain = function(M) {
    return M.replace('://www.', '://').replace('://www2.', '://');
  };
  this.detectSite = function() {
    var M = !(
      oSpP
        .clearDomain(window.location.href.toLowerCase())
        .indexOf(oSpP.clearDomain(L.toLowerCase())) === -1
    );
    if (!M) {
      M = !(
        oSpP
          .clearDomain(window.location.href.toLowerCase())
          .indexOf(oSpP.clearDomain(j.toLowerCase())) === -1
      );
    }
    return M;
  };
  this.detectOrigin = function(M) {
    return !(
      oSpP
        .clearDomain(M.toLowerCase())
        .indexOf(oSpP.clearDomain(p.toLowerCase())) === -1
    );
  };
  this.detectHttps = function() {
    l = window.location.href.indexOf('https://') === 0;
  };
  this.log = function(M) {};
  this.detectBrowser = function() {
    var O,
      N = navigator.userAgent,
      M =
        N.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    var P = N.match(/(edge(?=\/))\/?\s*(\d+)/i) || [];
    if ('Edge' === P[1]) {
      return { name: P[1], version: P[2] };
    }
    return /trident/i.test(M[1])
      ? (
          (O = /\brv[ :]+(\d+)/g.exec(N) || []),
          { name: 'IE', version: O[1] || '' }
        )
      : 'Chrome' === M[1] && ((O = N.match(/\bOPR\/(\d+)/)), null != O)
        ? { name: 'Opera', version: O[1] }
        : (
            (M = M[2]
              ? [M[1], M[2]]
              : [navigator.appName, navigator.appVersion, '-?']),
            null != (O = N.match(/version\/(\d+)/i)) && M.splice(1, 1, O[1]),
            { name: M[0], version: M[1] }
          );
  };
  this.isServiceWorkerChromeSupported = function() {
    return 'serviceWorker' in navigator;
  };
  this.isSafariNotificationSupported = function() {
    return 'safari' in window && 'pushNotification' in window.safari;
  };
  this.getBrowserlanguage = function() {
    return navigator.language.substring(0, 2);
  };
  this.setCookie = function(N, P, O) {
    var Q = new Date();
    Q.setTime(Q.getTime() + 24 * O * 60 * 60 * 1000);
    var M = 'expires=' + Q.toUTCString();
    document.cookie = N + '=' + P + '; ' + M;
  };
  this.checkCookie = function(N) {
    for (
      var P = N + '=', O = document.cookie.split(';'), Q = 0;
      Q < O.length;
      Q++
    ) {
      for (var M = O[Q]; ' ' == M.charAt(0); ) {
        M = M.substring(1);
      }
      if (0 == M.indexOf(P)) {
        return M.substring(P.length, M.length);
      }
    }
    return '';
  };
  this.doActionsWithPermissions = function(N) {
    var M = Date.now();
    var O = M - f;
    if (O < 50) {
      y = false;
    } else {
      y = true;
    }
    oSpP.log('[DD] Permissions: ' + N);
    oSpP.log('[DD] Time diff: ' + O);
    switch (N) {
      case 'granted':
        if (!o) {
          if (y) {
            oSpP.getDbValue('SPIDs', 'PromptShowed', function(P) {
              if (P.target.result === undefined) {
                oSpP.sendPromptStat('prompt_showed');
                oSpP.sendPromptStat('prompt_granted');
                oSpP.putValueToDb('SPIDs', { type: 'PromptShowed', value: 1 });
              } else {
                oSpP.sendPromptStat('prompt_showed_again');
                oSpP.sendPromptStat('prompt_granted');
              }
            });
          }
        }
        switch (a) {
          case 'chrome':
          case 'firefox':
          case 'opera':
            oSpP.subscribe();
            break;
        }
        break;
      case 'default':
        if (!o) {
          if (y) {
            oSpP.getDbValue('SPIDs', 'PromptShowed', function(P) {
              if (P.target.result === undefined) {
                oSpP.sendPromptStat('prompt_showed');
                oSpP.sendPromptStat('prompt_closed');
                oSpP.putValueToDb('SPIDs', { type: 'PromptShowed', value: 1 });
              } else {
                oSpP.sendPromptStat('prompt_showed_again');
                oSpP.sendPromptStat('prompt_closed');
              }
            });
          }
        }
        break;
      case 'denied':
        if (!o) {
          if (y) {
            oSpP.getDbValue('SPIDs', 'PromptShowed', function(P) {
              if (P.target.result === undefined) {
                oSpP.sendPromptStat('prompt_showed');
                oSpP.sendPromptStat('prompt_denied');
                oSpP.putValueToDb('SPIDs', { type: 'PromptShowed', value: 1 });
              } else {
                oSpP.sendPromptStat('prompt_showed_again');
                oSpP.sendPromptStat('prompt_denied');
              }
            });
          }
        }
        break;
    }
    if (!s) {
      if (N == 'default') {
        oSpP.closeCustomPrompt(false);
      } else {
        oSpP.closeCustomPrompt(true);
      }
    } else {
      if (N == 'default') {
        oSpP.closePromptHelpText(false);
      } else if (N == 'granted') {
        oSpP.closePromptHelpText(true);
      } else {
        oSpP.closePromptHelpText(true);
      }
    }
  };
  this.registerChrome = function() {
    navigator.serviceWorker.register('/sp-push-worker.js').then(function(M) {
      if (M.installing) {
        oSpP.log('Service worker installing');
      } else {
        if (M.waiting) {
          oSpP.log('Service worker installed');
        } else {
          if (M.active) {
            oSpP.log('Service worker active');
          }
        }
      }
    });
  };
  this.checkSafariPermission = function(M) {
    oSpP.log('[DD] Permissions: ' + M.permission);
    if (M.permission === 'default') {
      if (!s) {
        oSpP.closeCustomPrompt(false);
      } else {
        oSpP.closePromptHelpText(false);
      }
      y = true;
      oSpP.getDbValue('SPIDs', 'PromptShowed', function(N) {
        if (N.target.result === undefined) {
          oSpP.sendPromptStat('prompt_showed');
          oSpP.putValueToDb('SPIDs', { type: 'PromptShowed', value: 1 });
        } else {
          oSpP.sendPromptStat('prompt_showed_again');
        }
      });
      window.safari.pushNotification.requestPermission(
        n,
        K,
        { appkey: i },
        oSpP.checkSafariPermission
      );
    } else {
      if (M.permission === 'denied') {
        if (!s) {
          oSpP.closeCustomPrompt(true);
        } else {
          oSpP.closePromptHelpText(true);
        }
        if (y) {
          oSpP.sendPromptStat('prompt_denied');
        }
      } else {
        if (M.permission === 'granted') {
          oSpP.uns();
          if (!s) {
            oSpP.closeCustomPrompt(true);
          } else {
            oSpP.closePromptHelpText(true);
          }
          if (y) {
            oSpP.sendPromptStat('prompt_granted');
          }
          oSpP.subscribe();
        }
      }
    }
  };
  this.initialiseState = function(M) {
    if (!M.showNotification) {
      oSpP.log("Notifications aren't supported on service workers.");
    } else {
    }
    if (Notification.permission === 'denied') {
      oSpP.log('The user has blocked notifications.');
      return;
    }
    if (!('PushManager' in window)) {
      oSpP.log("Push messaging isn't supported.");
      return;
    }
  };
  this.endpointWorkaround = function(O) {
    switch (a) {
      case 'chrome':
      case 'opera':
        if ('subscriptionId' in O) {
          var M = O.subscriptionId;
        } else {
          var M = O.endpoint;
        }
        if (~M.indexOf(b)) {
          var N = M.split(b);
          return N[1];
        } else {
          return M;
        }
        break;
      case 'firefox':
        var M = O.endpoint;
        if (~M.indexOf(J)) {
          var N = M.split(J);
          return N[1];
        } else {
          if (~M.indexOf(u)) {
            var N = M.split(u);
            return N[1];
          } else {
            return M;
          }
        }
    }
  };
  this.subscribe = function() {
    switch (a) {
      case 'chrome':
      case 'firefox':
      case 'opera':
        navigator.serviceWorker.ready.then(function(O) {
          O.pushManager.subscribe({ userVisibleOnly: true }).then(function(U) {
            var Q = oSpP.endpointWorkaround(U);
            var P = U.getKey ? U.getKey('p256dh') : '';
            var S = P
              ? btoa(String.fromCharCode.apply(null, new Uint8Array(P)))
              : '';
            var R = U.getKey ? U.getKey('auth') : '';
            var T = R
              ? btoa(String.fromCharCode.apply(null, new Uint8Array(R)))
              : '';
            oSpP.checkLocalSubsctoption(Q, S, T);
            if (w) {
              oSpP.sendToParent(Q);
            }
          });
        });
        break;
      case 'safari':
        var N = window.safari.pushNotification.permission(K);
        if (N.permission === 'granted') {
          var M = N.deviceToken;
          oSpP.checkLocalSubsctoption(M);
          if (w) {
            oSpP.sendToParent(M);
          }
        }
        break;
    }
  };
  this.checkLocalSubsctoption = function(N, O, M) {
    oSpP.log('[DD] subscribe :: subscriptionId: ' + N);
    oSpP.getDbValue('SPIDs', 'SubscriptionId', function(P) {
      if (P.target.result === undefined) {
        oSpP.sendSubscribeDataToServer(N, 'subscribe', undefined, O, M);
        oSpP.putValueToDb('SPIDs', { type: 'SubscriptionId', value: N });
      } else {
        if (P.target.result.value !== N) {
          oSpP.sendSubscribeDataToServer(P.target.result.value, 'unsubscribe');
          oSpP.sendSubscribeDataToServer(N, 'subscribe', undefined, O, M);
          oSpP.putValueToDb('SPIDs', { type: 'SubscriptionId', value: N });
        }
      }
    });
  };
  this.unsubscribe = function() {
    switch (a) {
      case 'chrome':
      case 'firefox':
      case 'opera':
        navigator.serviceWorker.ready.then(function(O) {
          O.pushManager.getSubscription().then(function(Q) {
            var P = oSpP.endpointWorkaround(Q);
            if (!Q) {
              return;
            }
            Q.unsubscribe().then(function(R) {});
          });
        });
        break;
      case 'safari':
        var N = window.safari.pushNotification.permission(safariPushId);
        if (N.permission === 'granted') {
          var M = N.deviceToken;
        }
        break;
    }
  };
  this.getUserVariables = function() {
    var N = {};
    var M = document.querySelectorAll('input.sp_push_custom_data');
    for (var O = 0; O < M.length; O++) {
      switch (M[O].type) {
        case 'text':
        case 'hidden':
          N[M[O].name] = M[O].value;
          break;
        case 'checkbox':
          N[M[O].name] = M[O].checked ? 1 : 0;
          break;
        case 'radio':
          if (M[O].checked) {
            N[M[O].name] = M[O].value;
          }
          break;
      }
    }
    return N;
  };
  this.sendSubscribeDataToServer = function(U, S, T, M, N) {
    var R = new XMLHttpRequest();
    if (w && S == 'subscribe') {
      R.onreadystatechange = function() {
        if (R.readyState == 4 && R.status == 200) {
          F = true;
        }
      };
    }
    R.open('POST', n, true);
    R.setRequestHeader('Content-Type', 'application/json');
    if (T === undefined) {
      T = {};
      T.uname = oSpP.checkCookie('lgn');
      T.os = oSpP.detectOs();
    }
    if (M === undefined) {
      M = '';
    }
    if (w) {
      T.variables = t;
    } else {
      T.variables = oSpP.getUserVariables();
    }
    var V = new Date();
    var Q = -V.getTimezoneOffset() / 60;
    T.timezoneoffset = Q;
    var P = H ? H : window.location.href;
    var O = {
      action: 'subscription',
      subscriptionId: U,
      subscription_action: S,
      appkey: i,
      browser: A,
      lang: oSpP.getBrowserlanguage(),
      url: P,
      sPubKey: M,
      sAuthKey: N,
      sPushHostHash: q,
      custom_data: T
    };
    R.send(JSON.stringify(O));
  };
  this.initDb = function(O) {
    if (B) {
      return void O();
    }
    var N =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    var M = N.open('sendpulse_push_db', 2);
    M.onsuccess = function(P) {
      B = P.target.result;
      O();
    };
    M.onupgradeneeded = function(P) {
      var Q = P.target.result;
      Q.createObjectStore('SPIDs', { keyPath: 'type' });
    };
  };
  this.getDbValue = function(M, N, O) {
    oSpP.initDb(function() {
      B.transaction([M], 'readonly').objectStore(M).get(N).onsuccess = O;
    });
  };
  this.putValueToDb = function(M, N) {
    oSpP.initDb(function() {
      B.transaction([M], 'readwrite').objectStore(M).put(N);
    });
  };
  this.deleteDbValue = function(M, N) {
    oSpP.initDb(function() {
      B.transaction([M], 'readwrite').objectStore(M)['delete'](N);
    });
  };
  this.uns = function() {
    oSpP.deleteDbValue('SPIDs', 'SubscriptionId');
  };
  this.detectOs = function() {
    var M = '';
    if (navigator.userAgent.indexOf('Windows') != -1) {
      return 'Windows';
    }
    if (navigator.userAgent.indexOf('Android') != -1) {
      return 'Android';
    }
    if (navigator.userAgent.indexOf('Linux') != -1) {
      return 'Linux';
    }
    if (navigator.userAgent.indexOf('iPhone') != -1) {
      return 'iOS';
    }
    if (navigator.userAgent.indexOf('iPad') != -1) {
      return 'iOS';
    }
    if (navigator.userAgent.indexOf('Mac') != -1) {
      return 'Mac OS';
    }
    if (navigator.userAgent.indexOf('FreeBSD') != -1) {
      return 'FreeBSD';
    }
    return '';
  };
  this.sendToParent = function(N) {
    if (r === null) {
      var M = setInterval(function() {
        if (r !== null) {
          r.source.postMessage(N, r.origin);
          clearInterval(M);
        }
      }, 100);
    } else {
      r.source.postMessage(N, r.origin);
    }
  };
  this.push = function(M, N) {
    if (!oSpP.detectSite()) {
      oSpP.log('Application allowed only for ' + L);
      return false;
    }
    c[M] = N;
    oSpP.getDbValue('SPIDs', 'SubscriptionId', function(O) {
      if (O.target.result === undefined) {
        if (!h) {
          h = setInterval(function() {
            oSpP.getDbValue('SPIDs', 'SubscriptionId', function(P) {
              if (P.target.result !== undefined) {
                oSpP.sendUpdatesToServer(P.target.result.value);
                clearInterval(h);
                h = false;
              }
            });
          }, 1000);
        }
      } else {
        oSpP.sendUpdatesToServer(O.target.result.value);
      }
    });
  };
  this.sendUpdatesToServer = function(M) {
    var O = new XMLHttpRequest();
    O.open('POST', n, true);
    O.setRequestHeader('Content-Type', 'application/json');
    var N = {
      action: 'subscription',
      subscriptionId: M,
      subscription_action: 'update_variables',
      appkey: i,
      sPushHostHash: q,
      custom_data: { variables: c }
    };
    O.send(JSON.stringify(N));
  };
  this.sendPromptStat = function(M) {};
  this.showhelpPromptText = function() {
    if (E.length >= 0) {
      var P = document.getElementsByTagName('head')[0];
      var O = document.createElement('link');
      O.rel = 'stylesheet';
      O.type = 'text/css';
      O.href = 'https://cdn.sendpulse.com/css/push/sendpulse-prompt.min.css';
      O.media = 'all';
      P.appendChild(O);
      if (E == '-') {
        return;
      }
      var Q = document.createElement('div');
      Q.setAttribute('class', 'sendpulse-backdrop-info');
      Q.setAttribute('style', 'display:none;');
      var N = document.createElement('div');
      N.setAttribute('class', 'backdrop-close');
      N.innerHTML += '<big>×</big><br><small>ESC</small>';
      N.setAttribute(
        'onclick',
        'oSpP.closePromptHelpText(false); return false;'
      );
      Q.appendChild(N);
      var M = document.createElement('div');
      M.setAttribute('class', 'backdrop-message');
      M.innerHTML += E;
      Q.appendChild(M);
      document.body.insertBefore(Q, document.body.childNodes[0]);
      setTimeout(function() {
        oSpP.getDbValue('SPIDs', 'PromptClosed', function(R) {
          if (R.target.result === undefined) {
            Q.className += Q.className ? ' show-prompt' : 'show-prompt';
          }
        });
      }, 1000);
    }
  };
  this.showCustomPrompt = function() {
    oSpP.getDbValue('SPIDs', 'PromptShowed', function(ai) {
      if (ai.target.result === undefined) {
        oSpP.sendPromptStat('prompt_showed');
        oSpP.putValueToDb('SPIDs', { type: 'PromptShowed', value: 1 });
      } else {
        oSpP.sendPromptStat('prompt_showed_again');
      }
    });
    var T = document.getElementsByTagName('head')[0];
    var Q = document.createElement('link');
    Q.rel = 'stylesheet';
    Q.type = 'text/css';
    Q.href = 'https://cdn.sendpulse.com/css/push/sendpulse-prompt.min.css';
    Q.media = 'all';
    T.appendChild(Q);
    var ab;
    var X = 'sendpulse-popover';
    var ad = 'display:none;';
    var U = true;
    if (typeof d != 'undefined') {
      if (d == 0) {
        U = false;
      }
    }
    var R = oSpP.getMessageLang(oSpP.getBrowserlanguage());
    if (z.length > 0) {
      var aa =
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAk1BMVEUNkaAmtrIltLEMj58Mj58mtrIks7EfrK0MkKD///8Pk6EmtrIisK8cp6oTmaQRlqIZoqkVnKaz4OL7/v7t+PhjvsT4/P3l9vbY8PDM6uy74+Ww3uGc2dt3ysx1xMoyrLLx+fro9vat4+Kj2t2NztOB0dF/yc5myMhevsNMwL8/u7pMsLlDr7cyuLY9sbY7p7IkpazkILODAAAABnRSTlPn5ubmSkmZnvKZAAAAiElEQVQI10XHVRbCQBBE0SJGeoCxuONu+18dpDPn5P7UK4SL1WwRwovYnl7jeIgmBd14sWZ3ogsHlqwjOnG4b8uknf6G7dqi5oAevelalXo4ZBqaiIYu+Vr622oYY9K+qcwzy865NZBS2iY9ypGREkqpPqGHciCE+FAuhQPEsUjr2AECP575wQ+doQxkp1hUBQAAAABJRU5ErkJggg==">';
      var P =
        '<svg style="display: none;"><symbol id="sp_bell_icon"><path d="M139.165 51.42L103.39 15.558C43.412 61.202 3.74 132.185 0 212.402h50.174c3.742-66.41 37.877-124.636 88.99-160.98zM474.98 212.403h50.173c-3.742-80.217-43.413-151.2-103.586-196.845L385.704 51.42c51.398 36.346 85.533 94.572 89.275 160.982zm-49.388 12.582c0-77-53.39-141.463-125.424-158.487v-17.09c0-20.786-16.76-37.613-37.592-37.613s-37.592 16.827-37.592 37.614v17.09C152.95 83.52 99.56 148.004 99.56 224.983v137.918L49.408 413.01v25.076h426.336V413.01l-50.152-50.108V224.984zM262.576 513.358c3.523 0 6.76-.22 10.065-1.007 16.237-3.237 29.825-14.528 36.06-29.626 2.517-5.952 4.05-12.494 4.05-19.54H212.4c0 27.593 22.582 50.174 50.174 50.174z" /></symbol></svg>';
      ab = JSON.parse(z);
      X = ab.style;
      var S = document.createElement('div');
      S.setAttribute('class', 'sendpulse-prompt ' + X);
      if (ab.backgroundcolor.length > 0) {
        ad = ad + 'background-color: ' + ab.backgroundcolor + ';';
      }
      S.setAttribute('style', ad);
      var ag = document.createElement('div');
      ag.setAttribute('class', 'sendpulse-prompt-message');
      var af = document.createElement('img');
      af.setAttribute('class', 'sendpulse-bell-icon');
      af.setAttribute('width', '14');
      af.setAttribute('height', '14');
      af.setAttribute(
        'src',
        'https://cdn.sendpulse.com/img/push/icon-ring.svg'
      );
      if (U) {
        var Z = document.createElement('span');
        Z.setAttribute('class', 'sp-link-wrapper');
        var ac = document.createElement('a');
        ac.setAttribute('class', 'sp-link');
        ac.setAttribute('href', 'https://' + D + '/webpush');
        ac.setAttribute('target', '_blank');
        var V = document.createElement('span');
        V.innerHTML = G[R];
        if (X != 'sendpulse-bar') {
          ac.innerHTML = aa;
        }
        ac.appendChild(V);
        Z.appendChild(ac);
      }
      if (X == 'sendpulse-bar') {
        var W = document.createElement('div');
        W.setAttribute(
          'class',
          'sendpulse-prompt-info sendpulse-prompt-message-text'
        );
        W.setAttribute('style', 'color: ' + ab.textcolor + ' !important;');
        W.innerHTML += e;
        var Y = document.createElement('span');
        ag.innerHTML +=
          P +
          '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon"><use class="sendpulse-bell-path" style="fill: ' +
          ab.textcolor +
          ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>';
      } else {
        if (X == 'sendpulse-fab') {
          var W = document.createElement('div');
          W.setAttribute(
            'class',
            'sendpulse-prompt-title sendpulse-prompt-message-text'
          );
          if (ab.textcolor.length > 0) {
            W.setAttribute('style', 'color: ' + ab.textcolor + ' !important;');
          }
          W.innerHTML = m;
          var Y = document.createElement('div');
          Y.setAttribute(
            'class',
            'sendpulse-prompt-info sendpulse-prompt-message-text'
          );
          if (ab.textcolor.length > 0) {
            Y.setAttribute('style', 'color: ' + ab.textcolor + ' !important;');
          }
          Y.innerHTML += e;
          var ae = document.createElement('div');
          ae.setAttribute('class', 'sendpulse-prompt-fab sp_notify_prompt');
          ae.setAttribute('onclick', 'oSpP.startSubscription(); return false;');
          if (ab.btncolor.length > 0) {
            ae.setAttribute(
              'style',
              'background-color: ' + ab.btncolor + ' !important;'
            );
          }
          ae.innerHTML +=
            P +
            '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon" ><use class="sendpulse-bell-path bell-prompt-fab" style="fill: ' +
            ab.iconcolor +
            ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" /></svg>';
        }
      }
      if (X == 'sendpulse-bar') {
        var M = document.createElement('div');
        M.setAttribute('class', 'sendpulse-prompt-buttons');
        var ah = document.createElement('button');
        ah.setAttribute(
          'class',
          'sendpulse-prompt-btn sendpulse-accept-btn sp_notify_prompt'
        );
        ah.setAttribute('type', 'button');
        ah.setAttribute(
          'onclick',
          'oSpP.startSubscription();oSpP.closeCustomPrompt(false); return false;'
        );
        var O = document.createElement('button');
        O.setAttribute('class', 'sendpulse-prompt-btn sendpulse-disallow-btn');
        O.setAttribute('type', 'button');
        O.setAttribute(
          'onclick',
          "oSpP.sendPromptStat('prompt_denied');oSpP.closeCustomPrompt(true); return false;"
        );
        ah.innerHTML = ab.allowbtntext;
        O.innerHTML = ab.disallowbtntext;
        ah.setAttribute(
          'style',
          'background-color:' +
            ab.buttoncolor +
            ' !important;border-color:' +
            ab.buttoncolor +
            ' !important;'
        );
        O.setAttribute('style', 'color:' + ab.buttoncolor + ' !important;');
        M.appendChild(O);
        M.appendChild(ah);
      }
      ag.appendChild(W);
      ag.appendChild(Y);
      if (X != 'sendpulse-fab') {
        ag.appendChild(M);
        if (U && typeof Z != 'undefined') {
          S.appendChild(Z);
        }
        S.appendChild(ag);
      } else {
        if (U && typeof Z != 'undefined') {
          ag.appendChild(Z);
        }
        S.appendChild(ag);
        S.appendChild(ae);
      }
      if (X == 'sendpulse-bar') {
        var N = document.createElement('button');
        N.setAttribute('class', 'sendpulse-prompt-close');
        N.setAttribute(
          'onclick',
          'oSpP.closeCustomPrompt(false); return false;'
        );
        N.setAttribute('style', 'color:' + ab.textcolor + ' !important;');
        N.innerHTML = '&times;';
        S.appendChild(N);
      }
      document.body.insertBefore(S, document.body.childNodes[0]);
      setTimeout(function() {
        S.className += S.className ? ' show-prompt' : 'show-prompt';
      }, 1000);
    }
  };
  this.closeCustomPrompt = function(M) {
    oSpP.sendPromptStat('prompt_closed');
    if (document.querySelector('.sendpulse-prompt') !== null) {
      document.body.removeChild(document.querySelector('.sendpulse-prompt'));
    }
    if (M) {
      oSpP.putValueToDb('SPIDs', { type: 'PromptClosed', value: 1 });
    }
  };
  this.closePromptHelpText = function(M) {
    if (document.querySelector('.sendpulse-backdrop-info') !== null) {
      document.body.removeChild(
        document.querySelector('.sendpulse-backdrop-info')
      );
    }
    if (M) {
      oSpP.sendPromptStat('prompt_closed');
      oSpP.putValueToDb('SPIDs', { type: 'PromptClosed', value: 1 });
    }
  };
  this.getMessageLang = function(M) {
    M = M.substring(0, 2).toLowerCase();
    if (M == 'ua' || M == 'uk') {
      return 'ua';
    } else {
      if (M == 'ru') {
        return 'ru';
      } else {
        return 'en';
      }
    }
  };
  this.getPromptDelay = function() {
    return parseInt(v);
  };
  this.startDelayedSubscription = function(N) {
    if (parseInt(v) > 0) {
      var M = setInterval(function() {
        oSpP.getDbValue('SPIDs', 'PromptDelay', function(O) {
          if (O.target.result !== undefined) {
            if (new Date().getTime() >= O.target.result.value) {
              clearInterval(M);
              N();
            }
          } else {
            N();
          }
        });
      }, 1000);
    } else {
      N();
    }
  };
  this.getAuthEmailFromUrl = function() {
    var O = window.location.href;
    var N = 'spush';
    var Q = new RegExp('[?&]' + N + '(=([^&#]*)|&|#|$)'),
      P = Q.exec(O);
    if (!P) {
      return;
    }
    if (!P[2]) {
      return;
    }
    var M = atob(decodeURIComponent(P[2].replace(/\+/g, ' ')));
    if (typeof M != 'undefined' && M.length > 0) {
      oSpP.push('email', M);
    }
  };
}
window.addEventListener('load', function() {
  if (oSpP.getPromptDelay() > 0) {
    oSpP.getDbValue('SPIDs', 'PromptDelay', function(a) {
      if (a.target.result === undefined) {
        oSpP.putValueToDb('SPIDs', {
          type: 'PromptDelay',
          value: new Date().getTime() + oSpP.getPromptDelay() * 1000
        });
        oSpP.start();
      } else {
        oSpP.start();
      }
    });
  } else {
    oSpP.start();
  }
  oSpP.getAuthEmailFromUrl();
});
var oSpP = new oSendpulsePush();
document.onkeyup = function(a) {
  a = a || window.event;
  if (a.keyCode === 27) {
    oSpP.closePromptHelpText(false);
  }
};
