(()=>{"use strict";var e={9142:(e,t,r)=>{r.r(t),r.d(t,{default:()=>xe});var n={};r.r(n),r.d(n,{common:()=>he,emissions:()=>ge});var o,i=r(4942),a=r(925),s=r(5705),c=r(7146),l=r.n(c),u=r(4178),f=r(7602),d=r(6792),p=r(9385),h=r(4659),g=r(6029),m=r(7204),y=r(4439),v=r(566),b=r(9497),j=r(5004),O=r(3224),x=r(1849),w=r(4953),P=r(1072),S=r(2629),T=function(e){var t=e.footprintByCategory,r=(0,b.useTranslation)(["emissions","common"]).t,n=(0,P.useTheme)().colors;return(0,S.jsxs)(x.default,{children:[(0,S.jsxs)(x.default.Header,{children:[(0,S.jsx)(x.default.Title,{children:r("category")}),(0,S.jsx)(x.default.Title,{numeric:!0,children:r("annualFootprint")}),(0,S.jsx)(x.default.Title,{numeric:!0,children:r("part")})]}),t.sort((function(e,t){return t.value-e.value})).map((function(e){return(0,S.jsxs)(x.default.Row,{children:[(0,S.jsx)(x.default.Cell,{style:{alignItems:"center"},children:r(`categories.${e.category}`)}),(0,S.jsxs)(x.default.Cell,{numeric:!0,children:[e.value," ",r("common:footprintKg")]}),(0,S.jsx)(x.default.Cell,{numeric:!0,children:(0,S.jsx)(p.default,{style:{flex:1,width:30,height:30,borderRadius:15,backgroundColor:e.color,flexDirection:"row",alignItems:"center",justifyContent:"center"},children:(0,S.jsxs)(w.default,{style:{color:n.background,fontSize:12},children:[e.part,"%"]})})})]},e.category)}))]})},C=r(6326),k=r(9220),D=function(e){var t=e.footprintByCategory,r=(0,b.useTranslation)("emissions").t,n=(0,P.useTheme)().colors,o=t.reduce((function(e,t){return e+t.value}),0);return(0,S.jsxs)("svg",{viewBox:"0 0 250 250",children:[(0,S.jsx)(C.default,{colorScale:t.map((function(e){return e.color})),standalone:!1,width:250,height:250,radius:110,innerRadius:60,labelRadius:75,style:{labels:{fontSize:17}},data:t.map((function(e){return{x:e.icon,y:e.value}}))}),(0,S.jsx)(k.VictoryLabel,{textAnchor:"middle",style:{fontSize:20,fill:n.onBackground},x:125,y:125,text:`${(o/1e3).toFixed(2)}\ntCO2/${r("year")}`})]})},R=r(1318),B=r(5729),E=function(){var e=(0,b.useTranslation)("emissions").t,t=(0,P.useTheme)().colors,r=(0,R.useNavigation)().navigate;return(0,S.jsx)(B.default,{icon:"grass",mode:"contained",textColor:"white",contentStyle:{height:45},labelStyle:{color:t.onPrimary},onPress:function(){return r("Profile")},children:e("estimate")})},F=r(6077),N=function(){var e=(0,b.useTranslation)("emissions").t,t=(0,P.useTheme)().colors;return(0,S.jsx)(F.default,{mode:"flat",style:{width:"100%",justifyContent:"center",alignItems:"center",padding:10,borderRadius:5,borderColor:t.primary,borderStyle:"solid",borderWidth:1},children:(0,S.jsx)(w.default,{children:e("2030goal")})})},I=function(){var e=(0,b.useTranslation)("emissions").t;return(0,S.jsx)(w.default,{variant:"titleLarge",style:{paddingTop:10,textAlign:"center"},children:e("impactDistributionTitle")})},W=r(5671),A=r(3144),_=r(519),H=r(6538),z=r(3042),M=function(e){return e.TRANSPORT="transport",e.HOUSING="housing",e.FOOD="food",e.GOODS="goods",e.OTHER="other",e}({}),$=(0,A.default)((function e(t,r,n){switch((0,W.default)(this,e),this.category=t,this.value=r,this.part=n,this.color="",this.icon="",this.part=Math.floor(n),t){case M.TRANSPORT:this.color="sandybrown",this.icon="\ud83d\ude97";break;case M.FOOD:this.color="plum",this.icon="\ud83c\udf72";break;case M.HOUSING:this.color="cadetblue",this.icon="\ud83c\udfe0";break;case M.GOODS:this.color="khaki",this.icon="\ud83d\udecd\ufe0f";break;case M.OTHER:this.color="mediumslateblue",this.icon="\ud83c\udf43"}})),G=7800,L=[new $(M.GOODS,1e3,12.82051282051282),new $(M.TRANSPORT,2500,32.05128205128205),new $(M.OTHER,500,6.41025641025641),new $(M.FOOD,2e3,25.64102564102564),new $(M.HOUSING,2500,32.05128205128205)],U=(0,H.create)((o=function(){return{totalFootprintPerYear:G,footprintPerCategory:L}},(0,z.devtools)((0,z.persist)(o,{name:"app-storage",storage:(0,z.createJSONStorage)((function(){return _.default}))}))));var K=function(){return U.getState().footprintPerCategory},J=function(){function e(){(0,W.default)(this,e)}return(0,A.default)(e,[{key:"fetchFootprintByCategory",value:function(){return K()}}]),e}(),Y=function(e){return{useFetchFootprintByCategory:(t=e.emissionsRepository,function(){return t.fetchFootprintByCategory()})};var t}({emissionsRepository:new J}),V=(0,j.createContext)(Y),q=function(){var e=(0,(0,j.useContext)(V).useFetchFootprintByCategory)();return(0,S.jsxs)(O.default,{contentContainerStyle:{justifyContent:"center",alignItems:"center"},children:[(0,S.jsx)(p.default,{children:(0,S.jsx)(I,{})}),(0,S.jsx)(p.default,{style:{width:300},children:(0,S.jsx)(D,{footprintByCategory:e})}),(0,S.jsx)(p.default,{style:{width:"90%"},children:(0,S.jsx)(N,{})}),(0,S.jsx)(p.default,{style:{width:"90%"},children:(0,S.jsx)(T,{footprintByCategory:e})}),(0,S.jsx)(p.default,{style:{width:"90%",marginTop:10,marginBottom:10},children:(0,S.jsx)(E,{})})]})},Q=r(9094),X=r(4207),Z=r(2481);function ee(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function te(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ee(Object(r),!0).forEach((function(t){(0,i.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ee(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var re=function(e){var t=e.footprint,r=e.icon,n=e.imageSource,o=(0,b.useTranslation)("common").t;return(0,S.jsxs)(Z.default,{style:ne.card,onPress:function(){},children:[(0,S.jsx)(Z.default.Title,{title:o("transport"),subtitle:`${t.value} ${o("footprintKgPerYear")}`,left:function(e){return(0,S.jsx)(Q.default,te(te({},e),{},{icon:r,style:{backgroundColor:t.color}}))},right:function(e){return(0,S.jsx)(X.default,te(te({},e),{},{label:`${t.part} %`,color:t.color,style:{backgroundColor:null,borderWidth:2,borderColor:t.color,width:40,height:40}}))},style:{paddingRight:16}}),(0,S.jsx)(Z.default.Cover,{resizeMode:"contain",source:{uri:n},style:ne.image})]})},ne=d.default.create({card:{width:"100%"},image:{height:150}});const oe=r.p+"static/media/transport.2ccdc38740713599f760.svg";var ie=function(){var e={transportFootprint:(0,(0,j.useContext)(V).useFetchFootprintByCategory)().find((function(e){return e.category===M.TRANSPORT}))}.transportFootprint;return(0,S.jsx)(p.default,{style:ae.container,children:(0,S.jsx)(re,{icon:"car",footprint:e,imageSource:oe})})},ae=d.default.create({container:{flex:1,alignItems:"center",padding:10}}),se=(0,v.default)(),ce=(0,y.default)(),le=function(){var e=(0,b.useTranslation)("common").t;return(0,S.jsxs)(se.Navigator,{initialRouteName:"Home",children:[(0,S.jsx)(se.Screen,{name:"Home",component:ue,options:{headerShown:!1}}),(0,S.jsx)(se.Screen,{name:"Profile",component:ie,options:{title:e("screens.Profile")}})]})},ue=function(){var e=(0,b.useTranslation)("common").t;return(0,S.jsxs)(ce.Navigator,{initialRouteName:"Emissions",screenOptions:{tabBarLabelPosition:"below-icon",tabBarStyle:{height:50,paddingBottom:5}},children:[(0,S.jsx)(ce.Screen,{name:"Emissions",component:q,options:{title:e("screens.Emissions"),tabBarIcon:function(e){var t=e.focused,r=e.color;return(0,S.jsx)(m.default,{name:t?"home":"home-outline",size:24,color:r})}}}),(0,S.jsx)(ce.Screen,{name:"TODO",component:q,options:{tabBarIcon:function(e){var t=e.color;return(0,S.jsx)(m.default,{name:"tools",size:24,color:t})}}}),(0,S.jsx)(ce.Screen,{name:"TODO2",component:q,options:{tabBarIcon:function(e){var t=e.color;return(0,S.jsx)(m.default,{name:"tools",size:24,color:t})}}}),(0,S.jsx)(ce.Screen,{name:"TODO3",component:q,options:{tabBarIcon:function(e){var t=e.color;return(0,S.jsx)(m.default,{name:"tools",size:24,color:t})}}})]})},fe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function de(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var r=e.installing;null!=r&&(r.onstatechange=function(){"installed"===r.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var pe=r(3152);const he=JSON.parse('{"emissions":"Emissions","transport":"Transports","footprintKg":"kgCO2e","footprintKgPerYear":"kgCO2e/an","screens":{"Emissions":"Emissions","Profile":"Profil"}}'),ge=JSON.parse('{"impactDistributionTitle":"R\xe9partition de mon impact par cat\xe9gorie","2030goal":"Objectif : 2 tCO2/an en 2030","estimate":"Estimer mon impact carbone","year":"an","category":"Cat\xe9gorie","annualFootprint":"Emissions annuelles","part":"Proportion","categories":{"transport":"Transports","housing":"Logement","food":"Alimentation","goods":"Biens","other":"Divers"}}');var me={fr:n};pe.default.use(b.initReactI18next).init({resources:me,lng:"fr",interpolation:{escapeValue:!1}});pe.default;function ye(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ve(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ye(Object(r),!0).forEach((function(t){(0,i.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ye(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var be=ve(ve({},g.MD3DarkTheme),{},{colors:ve(ve({},g.MD3DarkTheme.colors),{},{primary:"#59B158",onPrimary:"#111",inversePrimary:"#fff"})}),je=l()(a.default,be),Oe=d.default.create({container:{flex:1,alignItems:"center"},content:{flex:1,width:"100%",maxWidth:550}});const xe=(0,u.default)((function(){return(0,S.jsx)(h.default,{theme:je,children:(0,S.jsx)(s.default,{theme:je,children:(0,S.jsx)(f.default,{style:Oe.container,children:(0,S.jsx)(p.default,{style:Oe.content,children:(0,S.jsx)(le,{})})})})})}));!function(e){if("serviceWorker"in navigator){if(new URL("/impact",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="/impact/service-worker.js";fe?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(r){var n=r.headers.get("content-type");404===r.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):de(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):de(t,e)}))}}()}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}r.m=e,(()=>{var e=[];r.O=(t,n,o,i)=>{if(!n){var a=1/0;for(u=0;u<e.length;u++){for(var[n,o,i]=e[u],s=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(r.O).every((e=>r.O[e](n[c])))?n.splice(c--,1):(s=!1,i<a&&(a=i));if(s){e.splice(u--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,o,i]}})(),r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(n,o){if(1&o&&(n=this(n)),8&o)return n;if("object"===typeof n&&n){if(4&o&&n.__esModule)return n;if(16&o&&"function"===typeof n.then)return n}var i=Object.create(null);r.r(i);var a={};e=e||[null,t({}),t([]),t(t)];for(var s=2&o&&n;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>a[e]=()=>n[e]));return a.default=()=>n,r.d(i,a),i}})(),r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),r.p="/impact/",(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,i,[a,s,c]=n,l=0;if(a.some((t=>0!==e[t]))){for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(c)var u=c(r)}for(t&&t(n);l<a.length;l++)i=a[l],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(u)},n=self.webpackChunkweb=self.webpackChunkweb||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[834],(()=>r(1559)));n=r.O(n)})();
//# sourceMappingURL=main.855baa62.js.map