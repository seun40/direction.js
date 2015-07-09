    /** @preserve direction.js (c) 2015 Oluwaseun Ogedengbe, MIT seun40.github.io/direction.js/*/
    /**
     * @suppress {globalThis}
     */
    direction = function(input,anchor,owrite){
        //input - an object, list, or string
        //anchor - the html object to append
        //INITIAL SETUP - Ensures input is the correct format, or dies trying
        var holdr = {parent:null,offset:0,loading:{lines:16,rate:1000 / 30,diameter:250,xpos:1/2,ypos:1/2,back:"#FFF",color:"#373737"/*back:"#000",color:"#3737FF"*/},config:{dir:"assets/",pagestartnum:!1,chapterstartnum:!1,imgprebuffer:5,imgpostbuffer:5,startpage:0,back:"#FFF"},pages:[]};
        if(void 0===input){
            return -1;
        } else if(typeof input==='string'){
            holdr.pages.push({alt:"",hover:"",title:"",url:[input],release:0,note:"",perm:!1,anim8:!1});
            input = holdr;
        } else if(Array.isArray(input)){
            for(var q = 0;q<input.length;q++){
                holdr.pages.push({alt:"",hover:"",title:"",url:[],release:0,note:"",perm:!1,anim8:!1});
                if(Array.isArray(input[q])){
                    for(var w = 0;w<input[q].length;w++){
                        holdr.pages[q].url.push(input[q][w]);
                    }
                } else holdr.pages[q].url.push(input[q]);
            }
            input = holdr;
        } else if(void 0 === input.pages[0].url) return -1;
        if(void 0 === anchor||anchor == null) anchor = 0;
        //PROPERTIES - private
            //self = this,//we don't need self anymore because, the public methods that require it aren't utlized in private methods //that
        var iimg = input.pages,
            count= input.pages.length,
            //intervall,
            spinning=true,//is the spinner spinning?
            current= -1,//-1 for unset, corresponds to current page,
            spinner = input.loading,
            config = input.config,
            parent = input.parent,
            offset = input.offset,
            pstload = [],
            preload = [],
            master = new Image(),
            skroll = true,
            //objref = {acW:300,acH:300},//the purpose of objref, is to allow dynamic canvas resizing in layer 0
            layers = [document.createElement("canvas"), document.createElement("canvas")],//By default, we have the display layer and the loading layer
            //console.log(this.layers[1]);
            context = layers[1].getContext('2d'),//display context for drawing
            //METHODS - private
            n = function(){return 0},//this null fuction save us some bytes
            slidestart=n,
            sliding=n,
            slidend=n,
            object = {
                context: layers[0].getContext('2d'),
                color: spinner.color,
                start: Date.now(),
                lines: spinner.lines,
                diameter: spinner.diameter,
                //cwidth: layers[1].width, 300
                cheight: layers[1].height,// 480
                rate: spinner.rate
            },
            spin = function(a){//handles spinner(Loader)
                layers[0].style.paddingLeft=((layers[1].width-300)/2)+"px";
                var rotation = Math.floor(((Date.now() - a.start) / 1000) * a.lines) / a.lines,
                    c = a.color.substr(1);
                a.context.save();
                a.context.clearRect(0, 0, 300, c.height/2);
                a.context.translate(150, c.height/2);
                a.context.rotate(Math.PI * 2 * rotation);
                if (c.length == 3) c = c[0] + C[0] + c[1] + c[1] + c[2] + c[2];//duplicate as per spec
                var red = parseInt(c.substr(0, 2), 16).toString(),
                    green = parseInt(c.substr(2, 2), 16).toString(),
                    blue = parseInt(c.substr(4, 2), 16).toString();
                for (var i = 0; i < a.lines; i++) {
                    a.context.beginPath();
                    a.context.rotate(Math.PI * 2 / a.lines);
                    a.context.moveTo(a.diameter / 10, 0);
                    a.context.lineTo(a.diameter / 4, 0);
                    a.context.lineWidth = a.diameter / 30;
                    a.context.strokeStyle = "rgba(" + red + "," + green + "," + blue + "," + i / a.lines + ")";
                    a.context.stroke();
                }
                a.context.restore()
                if(spinning) window.setTimeout(spin, a.rate, object);
            },
            scrollit = function(to,time){
                //format inputs
                if(to===null||void 0===to) to={x:0,y:0};
                else if (!isNaN(to)) to={x:0,y:to};//if to is num assume its y
                else {
                    if(to.y===null||void 0===to.y) to.y=0;
                    if(to.x===null||void 0===to.x) to.x=0;
                }
                if(time===null||void 0===time) time=400;
                //if x or y is less than 0 then go to the bottom
                if(to.y<0) to.y=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
                if(to.x<0) to.x=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
                //calculate distance needed to travel
                var dis = {x:(window.pageXOffset!==void 0)?to.x-window.pageXOffset:to.x-document.documentElement.scrollLeft,y:(window.pageYOffset!==void 0)?to.y-window.pageYOffset:to.y-document.documentElement.scrollTop};
                /*dis.x=(window.pageXOffset===void 0)?to.x-window.pageXOffset:to.x-document.documentElement.scrollLeft;
                dis.y=(window.pageYOffset===void 0)?to.y-window.pageYOffset:to.y-document.documentElement.scrollTop;*/
                //console.log("to",to,"dis",dis,"(x",window.pageXOffset,document.documentElement.scrollLeft,"| y",window.pageYOffset,document.documentElement.scrollTop,")",time,time/5);
                if(dis=={x:0,y:0}) return dis;//if that distance is 0 on both x and y, no scrolling required
                var clock = function(c,b,a){
                    window.scrollBy(Math.floor(c.x)/b, Math.floor(c.y)/b);
                    if(a+1<b*5) window.setTimeout(clock,5,c,b,a+1);
                }
                window.setTimeout(clock,5,dis,Math.floor(time/5),0);
                //window.clearInterval(clock);
                return dis;
            },
            preloadGeneric = function(){
                iimg[this.imaginaryID].loaded = true;
                /*possible implementation - Delete it when we are done, possibly saves memory, since its been cached?
            this.imaginaryID=-1;
            this.src="";*/
            },
            preloadMaster = function(){//actually a misnomer, master doesnt actually preload, it loads and draws
                if(iimg[this.imaginaryID].loaded) context.clearRect(0, 0, this.width, this.height);
                else iimg[this.imaginaryID].loaded = true;
                sliding();
                //conviently, this callback draws the image as soon as master's src is changed and image loaded
                layers[1].width /*= layers[0].width = objref.acW */= this.width;
                layers[1].height = layers[0].height /*= objref.acH*/ = this.height;
                context.drawImage(this,0,0);
                current = this.imaginaryID;
                /*console.log("killing",intervall);
                window.clearInterval(intervall);
                intervall=-1;*/
                spinning=0;
                if(skroll) scrollit();
                slidend();
            },
            assign = function(imagething,idd){//assign helper, assigns an src and iid according to given id
                //console.log("World");
                /*console.log("dead",intervall);
                if(intervall<0) intervall = window.setInterval(spin, spinner.rate, object);
                console.log("started",intervall);*/
                spinning=true;
                window.setTimeout(spin, spinner.rate, object);
                slidestart();
                if(!iimg[idd].loaded) context.clearRect(0, 0, layers[1].width, layers[1].height);
                imagething.imaginaryID = idd;
                imagething.src = config.dir+iimg[idd].url[0];
                /*console.log("----");
            for(var q = idd-1;q>idd-self.config.imgprebuffer-1&&q>=0;q--){
                console.log(q);
            }
            console.log("//");
            for(var q = idd+1;q<self.config.imgpostbuffer+idd+1&&q<self.count;q++){
                console.log(q);
             continue;

            console.log("----");*/
                var r = 0;
                for(var q = idd-1;q>idd-config.imgprebuffer-1&&q>=0;q--){
                    if(iimg[q].loaded) continue;
                    preload[r].imaginaryID = q;
                    preload[r].src = config.dir+iimg[q].url;
                    r++;
                }
                r = 0;
                for(var q = idd+1;q<config.imgpostbuffer+idd+1&&q<count;q++){
                    if(iimg[q].loaded) continue;
                    pstload[r].imaginaryID = q;
                    pstload[r].src = config.dir+iimg[q].url;
                    r++;
                }
            }
        //METHODS - public
        this.count = function(){return count;}
        this.current = function(){return current;}
        this.callback = function(type,callback){
            if(type===null||void 0===type) return sliding;
            if(callback===null||void 0===callback) return (type)?(type>0)?slidestart:slidend:sliding;
            if(type)
                if(type>0) slidestart = callback;
                else slidend = callback;
            else sliding = callback;
            return 1;
        }
        this.go = function(to){
            var sre = (to===null||void 0===to)?0:parseInt(to,10);
            //console.log(sre);
            sre = (isNaN(sre))?0:sre;
            assign(master,(Math.floor(Math.max(0,Math.min(count-1,sre)))));
            return sre;
        }
        this.prev = function(){
            var sre = current-1;//avoids possible race condition, assign loads in new image which can call preloadMaster which can change self.current before it gets to the return call. storing it premptively will preserve the value
            if(sre>=0) assign(master,sre);
            return sre;
        }
        this.next = function(){
            //console.log("Hello");
            var sre = current+1;
            if(sre<count) assign(master,sre);
            return sre;
        }
        this.frst = function(){
            if(current>=0) assign(master,0);
            return 0;
        }
        this.last = function(){
            assign(master,count-1);
            return count-1;
        }
        this.rand = function(){
            var sre = Math.floor(Math.random() * (count-1));
            //console.log(sre);
            assign(master,sre);
            return sre;
        }
        this.data = function(to){//returns info about slide
            var sre = (to===null||void 0===to)?current:parseInt(to,10);
            return (isNaN(sre))?iimg[current]:iimg[sre];
        }
        this.scroll = function(bool){//toggles Auto Scrolling
            if(bool===null||void 0===bool) return skroll;
            return skroll=bool;
        }
        this.scrollTo = function(to,time){return scrollit(to,time);}//public wrapper for scrollit
        //LOADER - setup
        layers[0].height=480;
        //layers[0].width=640;
        layers[0].style.background=spinner.back;
        layers[0].style.paddingLeft="170px";
        layers[0].style.zIndex=0;
        layers[0].style.position="absolute";

        //objref = object;
        //console.log(layers[1]);
        if(anchor) anchor.appendChild(layers[0]);
        else document.body.appendChild(layers[0]);
        //console.log(object);
        //intervall=window.setInterval(spin, spinner.rate, object);
        window.setTimeout(spin, spinner.rate, object);
        //DISPLAY - setup
        master = new Image();
        master.imaginaryID = -1;//unset to an imaginary image
        master.addEventListener("load", preloadMaster, false);
        //console.log(this.master);
        for(var q = 0;q<iimg.length;q++){
            //iimg[q].btog = 0; a holdover from the old html based canvas
            iimg[q].desig = (q)?(q==iimg.length-1)?1:0:-1;//-1 means first, 0 means middle, 1 means last: true if endpoint, false if middle
            iimg[q].loaded = false;
        }
        for(var q = 0;q<input.config.imgprebuffer;q++){
            preload.push(new Image());
            preload[q].imaginaryID = -1;//unset to an imaginary image
            preload[q].addEventListener("load", preloadGeneric, false);
        }
        for(var q = 0;q<input.config.imgpostbuffer;q++){
            pstload.push(new Image());
            pstload[q].imaginaryID = -1;//unset to an imaginary image
            pstload[q].addEventListener("load", preloadGeneric, false);
        }
        //preload[0].imaginaryID = 0;
        //preload[0].src = input.pages[0].url;
        //init
        assign(master,(owrite===void 0||owrite===null)?config.startpage:owrite);
        //end init
        layers[1].height=480;
        layers[1].width=640;
        layers[1].background = config.back;
        layers[1].style.zIndex=1;
        layers[1].style.position="relative";
        if(anchor) anchor.appendChild(layers[1]);
        else document.body.appendChild(layers[1]);
    }