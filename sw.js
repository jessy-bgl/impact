if(!self.define){let e,i={};const t=(t,r)=>(t=new URL(t+".js",r).href,i[t]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=i,document.head.appendChild(e)}else e=t,importScripts(t),i()})).then((()=>{let e=i[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(r,s)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let o={};const d=e=>t(e,n),f={module:{uri:n},exports:o,require:d};i[n]=Promise.all(r.map((e=>f[e]||d(e)))).then((e=>(s(...e),o)))}}define(["./workbox-88575b92"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_expo/static/js/web/AppEntry-17d4bdd9b48175144747f336623f715d.js",revision:"7487a655e40536680a69daedf4f636a1"},{url:"favicon.ico",revision:"188c8dbfd2c96f089db412c0f53ed435"},{url:"index.html",revision:"22ae91af285e54f568a12259f0978b09"},{url:"manifest.json",revision:"ced0a70d95a251774348358d893f1a84"},{url:"metadata.json",revision:"37cb2e8fcdd3b2523b9bd2f4b09087db"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
