// ==UserScript==
// @name        pi-browser-extension-iframe
// @description Script to recreate the Pi Browser app within a browser
// @version     1.1.0
// @namespace   https://github.com/pinetwork-js/pi-browser-extension
// @author      B-Derouet <brewal_derouet@hotmail.fr>
// @license     MIT
// @icon64      https://www.google.com/s2/favicons?sz=64&domain=minepi.com
// @match       https://app-cdn.minepi.com/*
// @match       https://*.piappengine.com/*
// @run-at      document-start
// @unwrap      
// ==/UserScript==

(function(){"use strict";function i(){const n={get:()=>"Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.153 Mobile Safari/537.36 PiBrowser/1.6.1"},e={get:()=>"Google Inc."};try{Object.defineProperty(window.navigator,"userAgent",n),Object.defineProperty(window.navigator,"vendor",e)}catch{window.navigator=Object.create(navigator,{userAgent:n,vendor:e})}}function o(n,e){if(!(e in n))return;const t=n[e];if(typeof t=="function"){const w=this[e]??t;return(...u)=>w.apply(n,u)}return t}function r(n){var e;if(!n||typeof n!="string"){this.send(n);return}try{const t=JSON.parse(n);(e=t?.name)!=null&&e.startsWith("Navigate to")&&window.parent.postMessage({type:"@pi:browser:navigation_change",payload:{url:window.location.href.replace(t.data.fromRoute,t.data.toRoute)}})}catch{}this.send(n)}function a(n,e,t){return e in n&&(n[e]=t),!0}const s={get:o,send:r,set:a};function c(){window.addEventListener("message",n=>{if(n.data.type==="@pi:browser:init_navigation"){const e=window.XMLHttpRequest;window.XMLHttpRequest=function(){return new Proxy(new e,s)}}})}function d(){if(window.self!==window.top){if(window.parent!==window.top){i();return}c()}}d()})();
