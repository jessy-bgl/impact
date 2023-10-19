(()=>{"use strict";var e={4500:(e,t,r)=>{r.r(t),r.d(t,{default:()=>kt});var n={};r.r(n),r.d(n,{common:()=>Ot,emissions:()=>xt,transport:()=>Pt});var o=r(5861),i=r(885),a=r(519),s=r(5705),l=r(4178),u=r(5004),c=r(5722),f=r(2152),d=r(7602),p=r(6792),g=r(9385),h=r(7775),m=r(4659),y=r(4942),j=r(925),b=r(7146),v=r.n(b),O=r(6029);function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w,T=P(P({},O.MD3DarkTheme),{},{colors:P(P({},O.MD3DarkTheme.colors),{},{primary:"#59B158",onPrimary:"#111",inversePrimary:"#fff"})}),S=v()(j.default,T),k=r(7204),C=r(4439),D=r(566),F=r(9497),E=r(3224),U=r(5853),z=r(4953),R=r(1072),N=r(2629),A=function(e){var t=e.footprints,r=(0,F.useTranslation)(["emissions","common"]).t,n=(0,R.useTheme)().colors;return(0,N.jsxs)(U.default,{children:[(0,N.jsxs)(U.default.Header,{children:[(0,N.jsx)(U.default.Title,{children:r("category")}),(0,N.jsx)(U.default.Title,{numeric:!0,children:r("annualFootprint")}),(0,N.jsx)(U.default.Title,{numeric:!0,children:r("part")})]}),Object.values(t).sort((function(e,t){return t.footprint-e.footprint})).map((function(e){return(0,N.jsxs)(U.default.Row,{children:[(0,N.jsx)(U.default.Cell,{style:{alignItems:"center"},children:r(`categories.${e.category}`)}),(0,N.jsxs)(U.default.Cell,{numeric:!0,children:[e.footprint," ",r("common:footprintKg")]}),(0,N.jsx)(U.default.Cell,{numeric:!0,children:(0,N.jsx)(g.default,{style:{width:30,height:30,borderRadius:15,backgroundColor:e.color,flexDirection:"row",alignItems:"center",justifyContent:"center"},children:(0,N.jsxs)(z.default,{style:{color:n.background,fontSize:12},children:[e.part,"%"]})})})]},e.category)}))]})},B=r(6326),I=r(9220),V=function(e){var t=e.footprints,r=e.totalFootprint,n=(0,F.useTranslation)("emissions").t,o=(0,R.useTheme)().colors,i=Object.values(t);return(0,N.jsxs)("svg",{viewBox:"0 0 250 250",children:[(0,N.jsx)(B.default,{colorScale:i.map((function(e){return e.color})),standalone:!1,width:250,height:250,radius:110,innerRadius:60,labelRadius:75,style:{labels:{fontSize:17}},data:i.map((function(e){return{x:e.icon,y:e.footprint}}))}),(0,N.jsx)(I.VictoryLabel,{textAnchor:"middle",style:{fontSize:20,fill:o.onBackground},x:125,y:125,text:`${(r/1e3).toFixed(2)}\ntCO2/${n("year")}`})]})},L=r(1318),M=r(6267),W=function(){var e=(0,F.useTranslation)("emissions").t,t=(0,R.useTheme)().colors,r=(0,L.useNavigation)().navigate;return(0,N.jsx)(M.default,{icon:"grass",mode:"contained",textColor:"white",contentStyle:{height:45},labelStyle:{color:t.onPrimary},onPress:function(){return r("Profile")},children:e("estimate")})},Y=r(6077),_=function(){var e=(0,F.useTranslation)("emissions").t,t=(0,R.useTheme)().colors;return(0,N.jsx)(Y.default,{mode:"flat",style:{width:"100%",justifyContent:"center",alignItems:"center",padding:10,borderRadius:5,borderColor:t.primary,borderStyle:"solid",borderWidth:1},children:(0,N.jsx)(z.default,{children:e("2030goal")})})},$=function(){var e=(0,F.useTranslation)("emissions").t;return(0,N.jsx)(z.default,{variant:"titleLarge",style:{paddingTop:10,textAlign:"center"},children:e("impactDistributionTitle")})},H=r(3144),G=r(5671),K=function(e){return e.TRANSPORT="transport",e.HOUSING="housing",e.FOOD="food",e.GOODS="goods",e.OTHER="other",e}({}),J=(0,H.default)((function e(t,r,n){var o=this;switch((0,G.default)(this,e),this.category=t,this.footprint=r,this.color="",this.icon="",this.computePart=function(e){return Math.floor(o.footprint/e*100)},this.part=this.computePart(n),t){case K.TRANSPORT:this.color="sandybrown",this.icon="\ud83d\ude97";break;case K.FOOD:this.color="plum",this.icon="\ud83c\udf72";break;case K.HOUSING:this.color="cadetblue",this.icon="\ud83c\udfe0";break;case K.GOODS:this.color="khaki",this.icon="\ud83d\udecd\ufe0f";break;case K.OTHER:this.color="mediumslateblue",this.icon="\ud83c\udf43"}})),q="medium",Q="thermal",X="gasoline",Z={small:5,medium:6,vul:6,sedan:7,suv:8},ee={diesel:3.1,gasoline:2.7,biofuels:1.11},te=12200,re=8.032813050760726e-10,ne={small:6700,medium:6700,vul:7600,sedan:7600,suv:7600},oe={small:9600,medium:9600,vul:6900,sedan:6900,suv:6900},ie={small:10200,medium:10200,vul:20200,sedan:20200,suv:20200},ae=["small","medium","vul","sedan","suv"],se=["thermal","hybrid","electric"],le=["diesel","gasoline","biofuels"],ue=function(){function e(t){var r=t.regularUser,n=void 0===r||r,o=t.kmPerYear,i=void 0===o?te:o,a=t.age,s=void 0===a?5:a,l=t.size,u=void 0===l?q:l,c=t.engine,f=void 0===c?Q:c,d=t.fuelType,p=void 0===d?X:d,g=t.averageFuelConsumption,h=void 0===g?Z.medium:g,m=t.averagePassengers,y=void 0===m?1.2:m;(0,G.default)(this,e),this.lifetime=10,this.regularUser=n,this.kmPerYear=i,this.size=u,this.engine=f,this.fuelType=p,this.age=s,this.averageFuelConsumption=h,this.averagePassengers=y}return(0,H.default)(e,[{key:"initValuesForNonRegularUser",value:function(){this.size=q,this.engine=Q,this.fuelType=X,this.averageFuelConsumption=Z[this.size]}},{key:"annualFootprint",get:function(){return 0===this.kmPerYear?0:this.regularUser?Math.floor(this.regularUserFootprint):Math.floor(this.nonRegularUserFootprint)}},{key:"regularUserFootprint",get:function(){return(this.carUseFootprint+this.amortizedManufacturingFootprint)/this.averagePassengers}},{key:"nonRegularUserFootprint",get:function(){return(this.manufacturingFootprint/this.lifetime*this.rentalFactor+this.carUseFootprint)/this.averagePassengers}},{key:"carUseFootprint",get:function(){return this.kmPerYear*(this.footprintPerKm+this.footprintBasePerKm)}},{key:"footprintPerKm",get:function(){if("electric"===this.engine)return"small"===this.size?.0159:"medium"===this.size?.0198:.0273;var e=this.averageFuelConsumption/100*ee[this.fuelType];return"hybrid"===this.engine?.85*e:e}},{key:"footprintBasePerKm",get:function(){return this.weightedMaintenanceFootprint+this.airConditionerFootprint}},{key:"weightedMaintenanceFootprint",get:function(){return"hybrid"===this.engine?7.229531745684653e-10:"electric"===this.engine?6.024609788070544e-10:re}},{key:"airConditionerFootprint",get:function(){return.0025679583833748804}},{key:"amortizedManufacturingFootprint",get:function(){return this.manufacturingFootprint*this.amortization}},{key:"manufacturingFootprint",get:function(){return"hybrid"===this.engine?oe[this.size]:"electric"===this.engine?ie[this.size]:ne[this.size]}},{key:"amortization",get:function(){return this.age<10?.1:0}},{key:"rentalFactor",get:function(){return this.kmPerYear/15130}}]),e}(),ce=(function(e){e.CAR="car"}({}),function(){function e(t){var r=t.car;(0,G.default)(this,e),this.car=new ue(null!=r?r:{})}return(0,H.default)(e,[{key:"annualFootprint",get:function(){return this.car.annualFootprint}}]),e}()),fe=(function(){function e(){(0,G.default)(this,e),this.transport=new ce({})}(0,H.default)(e,[{key:"fetchTransport",value:function(){return this.transport}},{key:"updateTransport",value:function(e){this.transport=new ce(e)}},{key:"injectData",value:function(e){this.transport=new ce(e)}}])}(),r(6538)),de=r(3042),pe=new ce({}),ge=(0,fe.create)((w=function(){return{transport:pe}},(0,de.devtools)((0,de.persist)(w,{name:"app-storage",storage:(0,de.createJSONStorage)((function(){return a.default}))}))));function he(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function me(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?he(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):he(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ye=function(){return ge.getState().transport},je=function(e){return ge.setState((function(t){return me(me({},t),{},{transport:e})}))},be=function(){function e(){(0,G.default)(this,e)}return(0,H.default)(e,[{key:"fetchTransport",value:function(){var e=ye();return new ce({car:e.car})}},{key:"updateTransport",value:function(e){return je(e)}}]),e}(),ve=function(e){return function(){return{computeTotalAnnualFootprint:function(){return e.fetchTransport().annualFootprint}}}},Oe=function(e){return function(){return{fetchTransport:function(){return e.fetchTransport()}}}},xe=function(e){return function(){return{updateCar:function(t){var r=new ue(t);r.regularUser||r.initValuesForNonRegularUser();var n=e.fetchTransport();n.car=r,e.updateTransport(n)}}}},Pe=function(e){var t=e.emissionsRepository;return{useFetchTransport:Oe(t),useUpdateTransport:xe(t),useComputeTotalAnnualFootprint:ve(t)}}({emissionsRepository:new be}),we=(0,u.createContext)(Pe),Te=function(){var e=ge((function(e){return e})),t=(0,u.useContext)(we),r=t.useFetchTransport,n=(0,t.useComputeTotalAnnualFootprint)().computeTotalAnnualFootprint,o=r().fetchTransport,i=(0,u.useMemo)((function(){return o()}),[e]),a=(0,u.useMemo)((function(){return n()}),[e]);return{footprints:{transport:new J(K.TRANSPORT,i.annualFootprint,a),food:new J(K.FOOD,i.annualFootprint,a),goods:new J(K.GOODS,i.annualFootprint,a),housing:new J(K.HOUSING,i.annualFootprint,a),other:new J(K.OTHER,i.annualFootprint,a)},totalAnnualFootprint:a}},Se=function(){var e=Te(),t=e.footprints,r=e.totalAnnualFootprint;return(0,N.jsxs)(E.default,{contentContainerStyle:{justifyContent:"center",alignItems:"center"},children:[(0,N.jsx)(g.default,{children:(0,N.jsx)($,{})}),(0,N.jsx)(g.default,{style:{width:300},children:(0,N.jsx)(V,{footprints:t,totalFootprint:r})}),(0,N.jsx)(g.default,{style:{width:"90%"},children:(0,N.jsx)(_,{})}),(0,N.jsx)(g.default,{style:{width:"90%"},children:(0,N.jsx)(A,{footprints:t})}),(0,N.jsx)(g.default,{style:{width:"90%",marginTop:10,marginBottom:10},children:(0,N.jsx)(W,{})})]})},ke=r(9094),Ce=r(39),De=r(2481);function Fe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ee(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Fe(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Fe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ue=function(e){var t=e.footprint,r=e.icon,n=e.imageSource,o=e.onClick,i=(0,F.useTranslation)("common").t;return(0,N.jsxs)(De.default,{style:ze.card,onPress:o,children:[(0,N.jsx)(De.default.Title,{title:i("transport"),subtitle:`${t.footprint} ${i("footprintKgPerYear")}`,left:function(e){return(0,N.jsx)(ke.default,Ee(Ee({},e),{},{icon:r,style:{backgroundColor:t.color}}))},right:function(e){return(0,N.jsx)(Ce.default,Ee(Ee({},e),{},{label:`${t.part} %`,color:t.color,style:{backgroundColor:null,borderWidth:2,borderColor:t.color,width:40,height:40}}))},style:{paddingRight:16}}),(0,N.jsx)(De.default.Cover,{resizeMode:"contain",source:{uri:n},style:ze.image})]})},ze=p.default.create({card:{width:"100%"},image:{height:150}});const Re=r.p+"static/media/transport.2ccdc38740713599f760.svg";var Ne=function(){var e={transportFootprint:Te().footprints[K.TRANSPORT]}.transportFootprint,t=(0,L.useNavigation)().navigate;return(0,N.jsx)(g.default,{style:Ae.container,children:(0,N.jsx)(Ue,{icon:"car",footprint:e,imageSource:Re,onClick:function(){return t("TransportProfile")}})})},Ae=p.default.create({container:{flex:1,alignItems:"center",padding:10}}),Be=r(466),Ie=r(1199),Ve=r(9398),Le=r(5892),Me=p.default.create({container:{padding:15},rowContainer:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:10},columnContainer:{flexDirection:"column",gap:10},divider:{marginTop:10,marginBottom:10}});function We(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ye(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?We(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):We(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var _e=function(){var e=(0,F.useTranslation)(["transport","emissions","common"]).t,t=Me.container;return(0,N.jsx)(Ve.default,{title:e("emissions:transport.boat"),left:function(e){return(0,N.jsx)(Le.default,Ye(Ye({},e),{},{icon:"ferry"}))},children:(0,N.jsx)(g.default,{style:t})})},$e=r(7255),He=r(3279),Ge=r(2193),Ke=function(){var e=ge((function(e){return e.transport.car})),t=(0,(0,u.useContext)(we).useUpdateTransport)().updateCar,r=(0,$e.useForm)({defaultValues:{kmPerYear:e.kmPerYear.toString(),regularUser:e.regularUser.toString(),size:e.size.toString(),engine:e.engine.toString(),fuelType:e.fuelType.toString(),age:e.age.toString(),averagePassengers:e.averagePassengers.toString(),averageFuelConsumption:e.averageFuelConsumption.toString()}}),n=r.control,o=r.getValues,i=r.setValue;return{control:n,handleUpdate:function(r){var n=o(r),a=function(e,t){if("string"===t)return e;if("number"===t)return Number(e);if("boolean"===t)return"true"===e;throw new Error("Unsupported targetType")}(n,typeof e[r]);""===n&&i(r,a.toString()),e[r]=a,t(e)}}};function Je(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function qe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Je(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Je(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Qe=function(){var e=(0,F.useTranslation)(["transport","emissions","common"]).t,t=Me.container,r=Me.rowContainer,n=Me.divider,o=Me.columnContainer,i=Ke(),a=i.control,s=i.handleUpdate,l="true"===(0,$e.useWatch)({control:a,name:"regularUser"});return(0,N.jsx)(Ve.default,{title:e("emissions:transport.car"),left:function(e){return(0,N.jsx)(Le.default,qe(qe({},e),{},{icon:"car"}))},children:(0,N.jsxs)(g.default,{style:t,children:[(0,N.jsxs)(g.default,{style:r,children:[(0,N.jsx)(z.default,{variant:"labelLarge",style:{flex:1.5},children:e("car.kmPerYear")}),(0,N.jsx)($e.Controller,{name:"kmPerYear",control:a,render:function(e){var t=e.field,r=t.onChange,n=t.value;return(0,N.jsx)(He.default,{dense:!0,mode:"outlined",keyboardType:"numeric",right:(0,N.jsx)(He.default.Affix,{text:"km"}),style:{flex:1},onBlur:function(){return s("kmPerYear")},onChangeText:r,value:n})}})]}),(0,N.jsx)(Be.default,{style:n}),(0,N.jsxs)(g.default,{style:r,children:[(0,N.jsx)(z.default,{variant:"labelLarge",children:e("car.regularUser")}),(0,N.jsx)($e.Controller,{name:"regularUser",control:a,render:function(t){var r=t.field,n=r.onChange,o=r.value;return(0,N.jsx)(Ge.default,{density:"small",value:o,onValueChange:function(e){n(e),s("regularUser")},buttons:[{value:"true",label:e("common:yes")},{value:"false",label:e("common:no")}]})}})]}),(0,N.jsx)(Be.default,{style:n}),(0,N.jsxs)(g.default,{style:o,children:[(0,N.jsx)(z.default,{variant:"labelLarge",children:e("car.size")}),(0,N.jsxs)(g.default,{children:[(0,N.jsx)($e.Controller,{name:"size",control:a,render:function(t){var r=t.field,n=r.onChange,o=r.value;return(0,N.jsx)(Ge.default,{density:"small",value:o,onValueChange:function(e){n(e),s("size")},buttons:ae.slice(0,3).map((function(t){return{value:t,label:e(`car.sizes.${t}`),disabled:!l}}))})}}),(0,N.jsx)($e.Controller,{name:"size",control:a,render:function(t){var r=t.field,n=r.onChange,o=r.value;return(0,N.jsx)(Ge.default,{density:"small",value:o,onValueChange:function(e){n(e),s("size")},buttons:ae.slice(3,5).map((function(t){return{value:t,label:e(`car.sizes.${t}`),disabled:!l}}))})}})]})]}),(0,N.jsx)(Be.default,{style:n}),(0,N.jsxs)(g.default,{style:o,children:[(0,N.jsx)(z.default,{variant:"labelLarge",children:e("car.engine")}),(0,N.jsx)($e.Controller,{name:"engine",control:a,render:function(t){var r=t.field,n=r.onChange,o=r.value;return(0,N.jsx)(Ge.default,{density:"small",value:o,onValueChange:function(e){n(e),s("engine")},buttons:se.map((function(t){return{value:t,label:e(`car.engines.${t}`),disabled:!l}}))})}})]}),(0,N.jsx)(Be.default,{style:n}),(0,N.jsxs)(g.default,{style:o,children:[(0,N.jsx)(z.default,{variant:"labelLarge",children:e("car.fuelType")}),(0,N.jsx)($e.Controller,{name:"fuelType",control:a,render:function(t){var r=t.field,n=r.onChange,o=r.value;return(0,N.jsx)(Ge.default,{density:"small",value:o,onValueChange:function(e){n(e),s("fuelType")},buttons:le.map((function(t){return{value:t,label:e(`car.fuelTypes.${t}`),disabled:!l}}))})}})]}),(0,N.jsx)(Be.default,{style:n}),(0,N.jsxs)(g.default,{style:r,children:[(0,N.jsx)(z.default,{variant:"labelLarge",style:{flex:2},children:e("car.averageFuelConsumption")}),(0,N.jsx)($e.Controller,{name:"averageFuelConsumption",control:a,render:function(e){var t=e.field,r=t.onChange,n=t.value;return(0,N.jsx)(He.default,{dense:!0,disabled:!l,mode:"outlined",keyboardType:"numeric",right:(0,N.jsx)(He.default.Affix,{}),style:{flex:1},onBlur:function(){return s("averageFuelConsumption")},onChangeText:r,value:n})}})]}),(0,N.jsx)(Be.default,{style:n}),(0,N.jsxs)(g.default,{style:r,children:[(0,N.jsx)(z.default,{variant:"labelLarge",style:{flex:2},children:e("car.age")}),(0,N.jsx)($e.Controller,{name:"age",control:a,render:function(e){var t=e.field,r=t.onChange,n=t.value;return(0,N.jsx)(He.default,{dense:!0,mode:"outlined",keyboardType:"numeric",right:(0,N.jsx)(He.default.Affix,{}),style:{flex:1},onBlur:function(){return s("age")},onChangeText:r,value:n})}})]}),(0,N.jsx)(Be.default,{style:n}),(0,N.jsxs)(g.default,{style:r,children:[(0,N.jsx)(z.default,{variant:"labelLarge",style:{flex:2},children:e("car.averagePassengers")}),(0,N.jsx)($e.Controller,{name:"averagePassengers",control:a,render:function(e){var t=e.field,r=t.onChange,n=t.value;return(0,N.jsx)(He.default,{dense:!0,mode:"outlined",keyboardType:"numeric",right:(0,N.jsx)(He.default.Affix,{}),style:{flex:1},onBlur:function(){return s("averagePassengers")},onChangeText:r,value:n})}})]})]})})};function Xe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ze(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Xe(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Xe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var et=function(){var e=(0,F.useTranslation)(["transport","emissions","common"]).t,t=Me.container;return(0,N.jsx)(Ve.default,{title:e("emissions:transport.holidays"),left:function(e){return(0,N.jsx)(Le.default,Ze(Ze({},e),{},{icon:"tent"}))},children:(0,N.jsx)(g.default,{style:t})})};function tt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function rt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?tt(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):tt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var nt=function(){var e=(0,F.useTranslation)(["transport","emissions","common"]).t,t=Me.container;return(0,N.jsx)(Ve.default,{title:e("emissions:transport.other"),left:function(e){return(0,N.jsx)(Le.default,rt(rt({},e),{},{icon:"bike"}))},children:(0,N.jsx)(g.default,{style:t})})};function ot(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function it(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ot(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ot(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var at=function(){var e=(0,F.useTranslation)(["transport","emissions","common"]).t,t=Me.container;return(0,N.jsx)(Ve.default,{title:e("emissions:transport.plane"),left:function(e){return(0,N.jsx)(Le.default,it(it({},e),{},{icon:"airplane"}))},children:(0,N.jsx)(g.default,{style:t})})};function st(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function lt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?st(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):st(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ut=function(){var e=(0,F.useTranslation)(["transport","emissions","common"]).t,t=Me.container;return(0,N.jsx)(Ve.default,{title:e("emissions:transport.train"),left:function(e){return(0,N.jsx)(Le.default,lt(lt({},e),{},{icon:"train"}))},children:(0,N.jsx)(g.default,{style:t})})};function ct(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ft(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ct(Object(r),!0).forEach((function(t){(0,y.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ct(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var dt=function(){var e=(0,F.useTranslation)(["transport","emissions","common"]).t,t=Me.container;return(0,N.jsx)(Ve.default,{title:e("emissions:transport.twoWheeler"),left:function(e){return(0,N.jsx)(Le.default,ft(ft({},e),{},{icon:"motorbike"}))},children:(0,N.jsx)(g.default,{style:t})})},pt=function(){return(0,N.jsxs)(Ie.default,{children:[(0,N.jsx)(Qe,{}),(0,N.jsx)(Be.default,{}),(0,N.jsx)(dt,{}),(0,N.jsx)(Be.default,{}),(0,N.jsx)(at,{}),(0,N.jsx)(Be.default,{}),(0,N.jsx)(_e,{}),(0,N.jsx)(Be.default,{}),(0,N.jsx)(ut,{}),(0,N.jsx)(Be.default,{}),(0,N.jsx)(et,{}),(0,N.jsx)(Be.default,{}),(0,N.jsx)(nt,{})]})},gt=(0,D.default)(),ht=(0,C.default)(),mt=function(){var e=(0,F.useTranslation)("common").t;return(0,N.jsxs)(gt.Navigator,{initialRouteName:"Home",children:[(0,N.jsx)(gt.Screen,{name:"Home",component:yt,options:{headerShown:!1}}),(0,N.jsx)(gt.Screen,{name:"Profile",component:Ne,options:{title:e("screens.Profile")}}),(0,N.jsx)(gt.Screen,{name:"TransportProfile",component:pt,options:{title:e("screens.TransportProfile")}})]})},yt=function(){var e=(0,F.useTranslation)("common").t;return(0,N.jsxs)(ht.Navigator,{initialRouteName:"Emissions",screenOptions:{tabBarLabelPosition:"below-icon",tabBarStyle:{height:50,paddingBottom:5}},children:[(0,N.jsx)(ht.Screen,{name:"Emissions",component:Se,options:{title:e("screens.Emissions"),tabBarIcon:function(e){var t=e.focused,r=e.color;return(0,N.jsx)(k.default,{name:t?"home":"home-outline",size:24,color:r})}}}),(0,N.jsx)(ht.Screen,{name:"TODO",component:Se,options:{tabBarIcon:function(e){var t=e.color;return(0,N.jsx)(k.default,{name:"tools",size:24,color:t})}}}),(0,N.jsx)(ht.Screen,{name:"TODO2",component:Se,options:{tabBarIcon:function(e){var t=e.color;return(0,N.jsx)(k.default,{name:"tools",size:24,color:t})}}}),(0,N.jsx)(ht.Screen,{name:"TODO3",component:Se,options:{tabBarIcon:function(e){var t=e.color;return(0,N.jsx)(k.default,{name:"tools",size:24,color:t})}}})]})},jt=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function bt(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var r=e.installing;null!=r&&(r.onstatechange=function(){"installed"===r.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var vt=r(3152);const Ot=JSON.parse('{"yes":"oui","no":"non","emissions":"Emissions","transport":"Transports","footprintKg":"kgCO2e","footprintKgPerYear":"kgCO2e/an","screens":{"Emissions":"Emissions","Profile":"Profil","TransportProfile":"Transports"}}'),xt=JSON.parse('{"impactDistributionTitle":"R\xe9partition de mon impact par cat\xe9gorie","2030goal":"Objectif : 2 tCO2/an en 2030","estimate":"Estimer mon impact carbone","year":"an","category":"Cat\xe9gorie","annualFootprint":"Emissions annuelles","part":"Proportion","categories":{"transport":"Transports","housing":"Logement","food":"Alimentation","goods":"Biens","other":"Divers"},"transport":{"car":"Voiture","twoWheeler":"Deux-roues","plane":"Avion","boat":"Bateau","holidays":"Vacances","train":"Train","other":"Divers"}}'),Pt=JSON.parse('{"car":{"kmPerYear":"Distance parcourue \xe0 l\'ann\xe9e","regularUser":"Utilisez-vous g\xe9n\xe9ralement la m\xeame voiture pour vous d\xe9placer ?","size":"Gabarit de la voiture","engine":"Type de moteur","fuelType":"Type de carburant","age":"\xc2ge de la voiture (en ann\xe9es)","averagePassengers":"Nombre moyen de passagers","averageFuelConsumption":"Consommation moyenne de carburant (en L/100km)","sizes":{"small":"Petite","medium":"Moyenne","vul":"VUL","sedan":"Berline","suv":"SUV"},"engines":{"thermal":"Thermique","hybrid":"Hybride","electric":"\xc9lectrique"},"fuelTypes":{"diesel":"Gazole","gasoline":"Essence E5 ou E10","biofuels":"Essence E85"}}}');var wt={fr:n};vt.default.use(F.initReactI18next).init({resources:wt,lng:"fr",interpolation:{escapeValue:!1}});vt.default;var Tt="NAVIGATION_STATE_V1",St=p.default.create({container:{flex:1,alignItems:"center"},content:{flex:1,width:"100%",maxWidth:550}});const kt=(0,l.default)((function(){var e=(0,u.useState)(!0),t=(0,i.default)(e,2),r=t[0],n=t[1],l=(0,u.useState)(),p=(0,i.default)(l,2),y=p[0],j=p[1];return(0,u.useEffect)((function(){var e=function(){var e=(0,o.default)((function*(){try{var e=yield c.default.getInitialURL();if("web"!==f.default.OS&&null==e){var t=yield a.default.getItem(Tt),r=t?JSON.parse(t):void 0;void 0!==r&&j(r)}}finally{n(!0)}}));return function(){return e.apply(this,arguments)}}();r||e()}),[r]),r?(0,N.jsx)(m.default,{theme:S,children:(0,N.jsx)(s.default,{theme:S,initialState:y,onStateChange:function(e){return a.default.setItem(Tt,JSON.stringify(e))},children:(0,N.jsx)(d.default,{style:St.container,children:(0,N.jsx)(g.default,{style:St.content,children:(0,N.jsx)(mt,{})})})})}):(0,N.jsx)(h.default,{})}));!function(e){if("serviceWorker"in navigator){if(new URL("/impact",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="/impact/service-worker.js";jt?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(r){var n=r.headers.get("content-type");404===r.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):bt(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):bt(t,e)}))}}()}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}r.m=e,(()=>{var e=[];r.O=(t,n,o,i)=>{if(!n){var a=1/0;for(c=0;c<e.length;c++){for(var[n,o,i]=e[c],s=!0,l=0;l<n.length;l++)(!1&i||a>=i)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[n,o,i]}})(),r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(n,o){if(1&o&&(n=this(n)),8&o)return n;if("object"===typeof n&&n){if(4&o&&n.__esModule)return n;if(16&o&&"function"===typeof n.then)return n}var i=Object.create(null);r.r(i);var a={};e=e||[null,t({}),t([]),t(t)];for(var s=2&o&&n;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>a[e]=()=>n[e]));return a.default=()=>n,r.d(i,a),i}})(),r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),r.p="/impact/",(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,i,[a,s,l]=n,u=0;if(a.some((t=>0!==e[t]))){for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(l)var c=l(r)}for(t&&t(n);u<a.length;u++)i=a[u],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(c)},n=self.webpackChunkweb=self.webpackChunkweb||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[940],(()=>r(1559)));n=r.O(n)})();
//# sourceMappingURL=main.087f4532.js.map