if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let a={};const c=e=>n(e,d),o={module:{uri:d},exports:a,require:c};i[d]=Promise.all(r.map((e=>o[e]||c(e)))).then((e=>(s(...e),a)))}}define(["./workbox-f407626e"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-B-XIqzjP.js",revision:null},{url:"assets/index-BukEDWt9.css",revision:null},{url:"img/android-chrome-192x192.png",revision:"a7238625ab9d476dfdde26479d0f5036"},{url:"img/android-chrome-512x512.png",revision:"20bfca65e352406a198c34f593ebc511"},{url:"img/apple-touch-icon.png",revision:"a7353a3523abc35394c5ad02674d77c1"},{url:"img/favicon-16x16.png",revision:"8b567b6e7106251c0056b0f8d4778ee3"},{url:"img/favicon-32x32.png",revision:"05eaebe9d6afd70a97184e1548cbba68"},{url:"img/mstile-144x144.png",revision:"aa88ce5199ea797fabf5e06dcd72f8f3"},{url:"img/mstile-150x150.png",revision:"a988ed11bec6f1c8121241935324f38b"},{url:"img/mstile-310x150.png",revision:"d2405deb861ea2d047b4dbead27042d8"},{url:"img/mstile-310x310.png",revision:"6ac5c022e5400208f2ab248663081980"},{url:"img/mstile-70x70.png",revision:"43948fd769b8864082104561c69aec20"},{url:"img/safari-pinned-tab.svg",revision:"1182fd9dd3f71c58ed0497c0cbdc407a"},{url:"index.html",revision:"c3e245fa9a9675eefb0b93c2101a9abb"},{url:"registerSW.js",revision:"0b0ab81b23fef82c892dcd6a0838dea2"},{url:"img/android-chrome-192x192.png",revision:"a7238625ab9d476dfdde26479d0f5036"},{url:"img/android-chrome-512x512.png",revision:"20bfca65e352406a198c34f593ebc511"},{url:"manifest.webmanifest",revision:"8a76fce78ba9289ea2e20da7490d5285"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/cdnjs\.cloudflare\.com\/.*/i,new e.CacheFirst({cacheName:"font-awesome-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
