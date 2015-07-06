/*
 direction.js (c) 2015 Oluwaseun Ogedengbe, MIT seun40.github.io/direction.js/*/
direction=function(e,h){function B(a,b){u=!0;window.setTimeout(v,g.f,q);f[b].loaded||w.clearRect(0,0,c[1].width,c[1].height);a.a=b;a.src=l.dir+f[b].url[0];for(var k=0,d=b-1;d>b-l.m-1&&0<=d;d--)f[d].loaded||(m[k].a=d,m[k].src=l.dir+f[d].url,k++);k=0;for(d=b+1;d<l.l+b+1&&d<r;d++)f[d].loaded||(n[k].a=d,n[k].src=l.dir+f[d].url,k++)}function D(){f[this.a].loaded=!0}function E(a,b){function c(a,b,d){window.scrollBy(Math.floor(a.x)/b,Math.floor(a.y)/b);d+1<5*b&&window.setTimeout(c,5,a,b,d+1)}if(null===a||
void 0===a)a={x:0,y:0};else if(isNaN(a)){if(null===a.y||void 0===a.y)a.y=0;if(null===a.x||void 0===a.x)a.x=0}else a={x:0,y:a};if(null===b||void 0===b)b=400;0>a.y&&(a.y=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);0>a.x&&(a.x=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth);var d={x:void 0!==window.pageXOffset?a.x-window.pageXOffset:a.x-document.documentElement.scrollLeft,y:void 0!==window.pageYOffset?a.y-window.pageYOffset:
a.y-document.documentElement.scrollTop};if(d=={x:0,y:0})return d;window.setTimeout(c,5,d,Math.floor(b/5),0);return d}function v(a){var b=Math.floor((Date.now()-a.start)/1E3*a.b)/a.b,c=a.color.substr(1);a.context.save();a.context.clearRect(0,0,a.h,a.g);a.context.translate(a.h/2,a.g/2);a.context.rotate(2*Math.PI*b);3==c.length&&(c=c[0]+C[0]+c[1]+c[1]+c[2]+c[2]);for(var b=parseInt(c.substr(0,2),16).toString(),d=parseInt(c.substr(2,2),16).toString(),c=parseInt(c.substr(4,2),16).toString(),e=0;e<a.b;e++)a.context.beginPath(),
a.context.rotate(2*Math.PI/a.b),a.context.moveTo(a.j/10,0),a.context.lineTo(a.j/4,0),a.context.lineWidth=a.j/30,a.context.strokeStyle="rgba("+b+","+d+","+c+","+e/a.b+")",a.context.stroke();a.context.restore();u&&window.setTimeout(v,a.f,q)}if(void 0===e)return-1;if("string"===typeof e)e={parent:null,offset:0,o:{b:16,f:1E3/30,width:250,height:250,F:.5,G:.5,back:"#FFF",color:"#373737"},i:{dir:"assets/",B:!1,v:!1,m:5,l:5,D:0,back:"#FFF"},c:[{alt:"",w:"",title:"",url:[e],release:0,A:"",C:!1,s:!1}],u:[]};
else if(Array.isArray(e)){for(var t={parent:null,offset:0,o:{b:16,f:1E3/30,width:250,height:250,F:.5,G:.5,back:"#FFF",color:"#373737"},i:{dir:"assets/",B:!1,v:!1,m:5,l:5,D:0,back:"#FFF"},c:[],u:[]},b=0;b<e.length;b++)if(t.c.push({alt:"",w:"",title:"",url:[],release:0,A:"",C:!1,s:!1}),Array.isArray(e[b]))for(var x=0;x<e[b].length;x++)t.c[b].url.push(e[b][x]);else t.c[b].url.push(e[b]);e=t}else if(void 0===e.c[0].url)return-1;if(void 0===h||null==h)h=0;var f=e.c,r=e.c.length,u=!0,y=-1,g=e.o,l=e.i,n=
[],m=[],p=new Image,z=!0,A={h:300,g:300},c=[document.createElement("canvas"),document.createElement("canvas")],w=c[1].getContext("2d"),q={context:c[0].getContext("2d"),color:g.color,start:Date.now(),b:g.b,j:g.width,H:g.height,h:c[1].width,g:c[1].height,f:g.f};this.count=function(){return r};this.current=function(){return y};this.go=function(a){a=null===a||void 0===a?0:parseInt(a,10);a=isNaN(a)?0:a;B(p,Math.floor(Math.max(0,Math.min(r-1,a))));return a};this.next=function(){var a=y+1;a<r&&B(p,a);return a};
this.scroll=function(a){return null===a||void 0===a?z:z=a};this.scrollTo=function(a,b){return E(a,b)};c[0].height=480;c.width=640;c[0].style.background=g.back;c[0].style.zIndex=0;c[0].style.position="absolute";A=q;h?h.appendChild(c[0]):document.body.appendChild(c[0]);window.setTimeout(v,g.f,q);p=new Image;p.a=-1;p.addEventListener("load",function(){f[this.a].loaded?w.clearRect(0,0,this.width,this.height):f[this.a].loaded=!0;c[1].width=c[0].width=A.h=this.width;c[1].height=c[0].height=A.g=this.height;
w.drawImage(this,0,0);y=this.a;u=0;z&&E()},!1);for(b=0;b<f.length;b++)f[b].I=b?b==f.length-1?1:0:-1,f[b].loaded=!1;for(b=0;b<e.i.m;b++)m.push(new Image),m[b].a=-1,m[b].addEventListener("load",D,!1);for(b=0;b<e.i.l;b++)n.push(new Image),n[b].a=-1,n[b].addEventListener("load",D,!1);c[1].height=480;c[1].width=640;c[1].background=l.back;c[1].style.zIndex=1;c[1].style.position="absolute";h?h.appendChild(c[1]):document.body.appendChild(c[1])};