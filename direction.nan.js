/*
 direction.js (c) 2015 Seun Ogedengbe, MIT*/
direction=function(c,g,t,e){function u(a,b){v=!0;window.setTimeout(w,h.g,x);0>b&&(b=0);b>=k&&(b=k-1);f[b].loaded||y.clearRect(0,0,d[1].width,d[1].height);a.b=b;a.src=l.dir+f[b].url[0];p=b;for(var m=0,c=b-1;c>b-l.j-1&&0<=c;c--)f[c].loaded||(q[m].b=c,q[m].src=l.dir+f[c].url,m++);m=0;for(c=b+1;c<l.i+b+1&&c<k;c++)f[c].loaded||(r[m].b=c,r[m].src=l.dir+f[c].url,m++)}function B(){f[this.b].loaded=!0}function D(a,b){function c(a,b,d){window.scrollBy(Math.floor(a.x)/b,Math.floor(a.y)/b);d+1<5*b&&window.setTimeout(c,
5,a,b,d+1)}if(null===a||void 0===a)a={x:0,y:0};else if(isNaN(a)){if(null===a.y||void 0===a.y)a.y=0;if(null===a.x||void 0===a.x)a.x=0}else a={x:0,y:a};if(null===b||void 0===b||0>=b)b=400;0>a.y&&(a.y=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);0>a.x&&(a.x=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth);var d={x:void 0!==window.pageXOffset?a.x-window.pageXOffset:a.x-document.documentElement.scrollLeft,y:void 0!==window.pageYOffset?
a.y-window.pageYOffset:a.y-document.documentElement.scrollTop};if(d=={x:0,y:0})return d;window.setTimeout(c,5,d,Math.floor(b/5),0);return d}function w(a){d[0].style.paddingLeft=(d[1].width-300)/2+"px";var b=Math.floor((Date.now()-a.start)/1E3*a.c)/a.c,c=a.color.substr(1);a.context.save();a.context.clearRect(0,0,300,d[1].height);a.context.translate(150,d[1].height/2);a.context.rotate(2*Math.PI*b);3==c.length&&(c=c[0]+C[0]+c[1]+c[1]+c[2]+c[2]);for(var b=parseInt(c.substr(0,2),16).toString(),e=parseInt(c.substr(2,
2),16).toString(),c=parseInt(c.substr(4,2),16).toString(),f=0;f<a.c;f++)a.context.beginPath(),a.context.rotate(2*Math.PI/a.c),a.context.moveTo(a.f/10,0),a.context.lineTo(a.f/4,0),a.context.lineWidth=a.f/30,a.context.strokeStyle="rgba("+b+","+e+","+c+","+f/a.c+")",a.context.stroke();a.context.restore();v?window.setTimeout(w,a.g,x):a.context.clearRect(0,0,300,d[1].height)}e=e||{};e={parent:null,offset:0,o:{c:e.c||16,g:e.g||1E3/30,f:e.f||250,back:e.B||"#FFF",color:e.color||"#373737"},h:{dir:e.dir||"assets/",
C:!1,w:!1,j:e.j||5,i:e.i||5,v:0,back:e.back||"#FFF"},a:[]};if(void 0===c)return-1;if("string"===typeof c)e.a.push({alt:"",m:"",title:"",url:[c],release:0,s:"",u:!1,l:!1}),c=e;else if(Array.isArray(c)){for(var b=0;b<c.length;b++)if(e.a.push({alt:"",m:"",title:"",url:[],release:0,s:"",u:!1,l:!1}),Array.isArray(c[b]))for(var z=0;z<c[b].length;z++)e.a[b].url.push(c[b][z]);else e.a[b].url.push(c[b]);c=e}else if(void 0===c.a)c.a=[];else if(void 0===c.a[0].url)return-1;if(void 0===g||null==g)g=0;var f=c.a,
k=c.a.length,v=!0,p=-1,h=c.o,l=c.h,r=[],q=[],n=new Image,A=!0,d=[document.createElement("canvas"),document.createElement("canvas")],y=d[1].getContext("2d"),x={context:d[0].getContext("2d"),color:h.color,start:Date.now(),c:h.c,f:h.f,g:h.g};this.count=function(){return k};this.current=function(){return p};this.go=function(a){a=null===a||void 0===a?0:parseInt(a,10);a=isNaN(a)?0:a;u(n,Math.floor(Math.max(0,Math.min(k-1,a))));return a};this.next=function(){var a=p+1;a<k&&u(n,a);return a};this.data=function(a){a=
null===a||void 0===a?p:parseInt(a,10);return isNaN(a)?f[p]:f[Math.floor(Math.max(0,Math.min(k-1,a)))]};this.scroll=function(a){return null===a||void 0===a?A:A=a};this.scrollTo=function(a,b){return D(a,b)};d[0].height=480;d[0].style.background=h.back;d[0].style.paddingLeft="170px";d[0].style.zIndex=0;d[0].style.position="absolute";g?g.appendChild(d[0]):document.body.appendChild(d[0]);window.setTimeout(w,h.g,x);n=new Image;n.b=-1;n.addEventListener("load",function(){f[this.b].loaded?y.clearRect(0,0,
this.width,this.height):f[this.b].loaded=!0;d[1].width=this.width;d[1].height=d[0].height=this.height;y.drawImage(this,0,0);v=0;A&&D()},!1);for(b=0;b<f.length;b++)f[b].A=b?b==f.length-1?1:0:-1,f[b].loaded=!1;for(b=0;b<c.h.j;b++)q.push(new Image),q[b].b=-1,q[b].addEventListener("load",B,!1);for(b=0;b<c.h.i;b++)r.push(new Image),r[b].b=-1,r[b].addEventListener("load",B,!1);u(n,void 0===t||null===t||isNaN(t)?l.v:t);d[1].height=480;d[1].width=640;d[1].background=l.back;d[1].style.zIndex=1;d[1].style.position=
"relative";g?g.appendChild(d[1]):document.body.appendChild(d[1])};
