(function(){"use strict";async function d(){return new Promise(t=>{document.readyState=="loading"?document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}):t()})}function u(t,e,n){const i=new MutationObserver((o,p)=>{for(const S of o)e(S,p)});return i.observe(t,{childList:!0,subtree:!0,...n}),i}function m(t,e=document.documentElement){return new Promise(n=>{function i(){const o=e.querySelector(t);o&&n(o)}u(e,(o,p)=>{i(),p.disconnect()})})}function h(){const t={platform:{desktop:!0,os:"win32",version:"10.0.0",arch:"x64",uuid:"",hostApp:"pi-node"},bundleData:{versionNumber:"1.6.1",buildNumber:"21"},nativeSupport:{requestPermissions:!0,inlineMediaPlayback:!0}};localStorage.setItem("@pi:webview_ui_behaviors",JSON.stringify(t)),window.location.reload()}function w(t){var e;(e=t.parentElement)==null||e.children[0].remove(),t.style.paddingLeft="0px"}const r=/^(?:pi|https?):\/\/app-cdn\.minepi\.com\/mobile-app-ui\/app\/(.*?)(?:$|\/)/,c={brainstorm:"pi://brainstorm.pi",kyc:"pi://kyc.pi",devportal:"pi://develop.pi",translate:"pi://translate.pi","platform-demo-app":"pi://demo.pi",ecosystem:"pi://testnetecosystem.pi",chat:"pi://chat.pi"},s=/^(?:pi|https?):\/\/app-cdn\.minepi\.com\/mobile-app-ui\/(.*?)(?:\?.*|$|\/)/,a={welcome:"pi://welcome.pi",chat:"pi://_LEGACY_chat.pi",wallet:"pi://wallet.pi",feed:"pi://mine.pi","":"pi://mine.pi",error:"pi://error.pi"};function f(t){const e=t.replace("https://","pi://");if(r.test(e)){const[,n]=r.exec(e)??[];return n in c?c[n]:e}if(s.test(e)){const[,n]=s.exec(e)??[];return n in a?a[n]:e}return e.startsWith("https://minepi.com/blockexplorer")?"pi://blockchain.pi":e}function b(){const t=new URL(window.location.href).searchParams.get("url");return t?.replace("pi://","https://")??a.welcome}async function v(t){const e=localStorage.getItem("mobile-app-webview-ui_access-token");if(!e)return t;const n=new URL(t).hostname,i=await(await fetch(`https://socialchain.app/api/mobile_app/resolved_url?q=${n}`,{headers:{Authorization:e}}).catch()).json();return i.redirect_url?i.redirect_url.replace("http://","https://")+new URL(t).pathname:t}function l(t){const e=f(t);window.history.replaceState({},"",`/browser?url=${e}`)}function g(t){const{body:e}=new DOMParser().parseFromString(t,"text/html"),n=[...e.children];return n.length===1?n[0]:n}function y(t){t.addEventListener("load",()=>{var e;(e=t.contentWindow)==null||e.postMessage({type:"@pi:browser:init_navigation"})}),window.addEventListener("message",e=>{e.data.type==="@pi:browser:navigation_change"&&l(e.data.payload.url)})}function _(t,e){const n=g(`<iframe src="${e}" allow="clipboard-read; clipboard-write; camera" style="width: 100vw; height: 100vh; border: none;"></iframe>`);y(n),t.append(n)}async function L(){const t=await m("main");w(t);const e=b(),n=await v(e);_(t,n);const i=r.test(n)?e:n;l(i)}d().then(()=>{localStorage.getItem("@pi:webview_ui_behaviors")||h(),window.location.href==="https://app-cdn.minepi.com/mobile-app-ui/close.html"&&(window.location.href="https://app-cdn.minepi.com/mobile-app-ui/node-signin"),window.location.href.startsWith("https://app-cdn.minepi.com/browser")&&L()})})();
