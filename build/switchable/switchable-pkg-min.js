/*
Copyright 2010, KISSY UI Library v1.0.5
MIT Licensed
build: 543 Apr 9 08:13
*/
KISSY.add("switchable",function(d,i){function p(a,b){b=b||{};if(!("markupType"in b))if(b.panelCls)b.markupType=1;else if(b.panels)b.markupType=2;b=d.merge(p.Config,b);this.container=d.get(a);this.config=b;this.triggers=this.triggers||[];this.panels=this.panels||[];if(this.activeIndex===i)this.activeIndex=b.activeIndex;this._init()}var h=d.DOM,l=d.Event,r=document,c=p.prototype;p.Config={markupType:0,navCls:"ks-switchable-nav",contentCls:"ks-switchable-content",triggerCls:"ks-switchable-trigger",panelCls:"ks-switchable-panel",
triggers:[],panels:[],hasTriggers:true,triggerType:"mouse",delay:0.1,activeIndex:0,activeTriggerCls:"active",steps:1,viewSize:[]};p.Plugins=[];d.mix(c,{_init:function(){var a=this,b=a.config;a.panels.length===0&&a._parseMarkup();b.hasTriggers&&a._bindTriggers();d.each(p.Plugins,function(g){g.init&&g.init(a)})},_parseMarkup:function(){var a=this.container,b=this.config,g=b.hasTriggers,e,f=[],k=[];switch(b.markupType){case 0:if(e=d.get("."+b.navCls,a))f=h.children(e);e=d.get("."+b.contentCls,a);k=h.children(e);
break;case 1:f=d.query("."+b.triggerCls,a);k=d.query("."+b.panelCls,a);break;case 2:f=b.triggers;k=b.panels;break}a=k.length;this.length=a/b.steps;if(g&&a>0&&f.length===0)f=this._generateTriggersMarkup(this.length);this.triggers=d.makeArray(f);this.panels=d.makeArray(k);this.content=e||k[0].parentNode},_generateTriggersMarkup:function(a){var b=this.config,g=r.createElement("UL"),e,f;g.className=b.navCls;for(f=0;f<a;f++){e=r.createElement("LI");if(f===this.activeIndex)e.className=b.activeTriggerCls;
e.innerHTML=f+1;g.appendChild(e)}this.container.appendChild(g);return h.children(g)},_bindTriggers:function(){var a=this,b=a.config,g=a.triggers,e,f,k=g.length;for(f=0;f<k;f++)(function(j){e=g[j];l.on(e,"click focus",function(){a._onFocusTrigger(j)});if(b.triggerType==="mouse"){l.on(e,"mouseenter",function(){a._onMouseEnterTrigger(j)});l.on(e,"mouseleave",function(){a._onMouseLeaveTrigger(j)})}})(f)},_onFocusTrigger:function(a){if(this.activeIndex!==a){this.switchTimer&&this.switchTimer.cancel();
this.switchTo(a)}},_onMouseEnterTrigger:function(a){var b=this;if(b.activeIndex!==a)b.switchTimer=d.later(function(){b.switchTo(a)},b.config.delay*1E3)},_onMouseLeaveTrigger:function(){this.switchTimer&&this.switchTimer.cancel()},switchTo:function(a,b){var g=this.config,e=this.triggers,f=this.panels,k=this.activeIndex,j=g.steps,o=k*j,n=a*j;if(a===k)return this;if(this.fire("beforeSwitch",{toIndex:a})===false)return this;if(g.hasTriggers)this._switchTrigger(k>-1?e[k]:null,e[a]);if(b===i)b=a>k?"forward":
"forward";this._switchView(f.slice(o,o+j),f.slice(n,n+j),a,b);this.activeIndex=a;return this},_switchTrigger:function(a,b){var g=this.config.activeTriggerCls;a&&h.removeClass(a,g);h.addClass(b,g)},_switchView:function(a,b){h.css(a,"display","none");h.css(b,"display","block");this.fire("switch")},prev:function(){var a=this.activeIndex;this.switchTo(a>0?a-1:this.length-1,"backward")},next:function(){var a=this.activeIndex;this.switchTo(a<this.length-1?a+1:0,"forward")}});d.mix(c,d.EventTarget);d.Switchable=
p});
KISSY.add("switchable-autoplay",function(d){var i=d.Event,p=d.Switchable;d.mix(p.Config,{autoplay:false,interval:5,pauseOnHover:true});p.Plugins.push({name:"autoplay",init:function(h){var l=h.config;if(l.autoplay){if(l.pauseOnHover){i.on(h.container,"mouseenter",function(){h.paused=true});i.on(h.container,"mouseleave",function(){setTimeout(function(){h.paused=false},l.interval*1E3)})}h.autoplayTimer=d.later(function(){h.paused||h.switchTo(h.activeIndex<h.length-1?h.activeIndex+1:0)},l.interval*1E3,
true)}}})});
KISSY.add("switchable-effect",function(d){var i=YAHOO.util,p=d.DOM,h=i.Dom,l=d.Switchable,r;d.mix(l.Config,{effect:"none",duration:0.5,easing:i.Easing.easeNone});l.Effects={none:function(c,a,b){p.css(c,"display","none");p.css(a,"display","block");b()},fade:function(c,a,b){c.length!==1&&d.error("fade effect only supports steps == 1.");var g=this,e=g.config,f=c[0],k=a[0];g.anim&&g.anim.stop();h.setStyle(k,"opacity",1);g.anim=new i.Anim(f,{opacity:{to:0}},e.duration,e.easing);g.anim.onComplete.subscribe(function(){g.anim=null;
h.setStyle(k,"z-index",9);h.setStyle(f,"z-index",1);b()});g.anim.animate()},scroll:function(c,a,b,g){var e=this;c=e.config;a=c.effect==="scrollx";var f={};f[a?"left":"top"]={to:-(e.viewSize[a?0:1]*g)};e.anim&&e.anim.stop();e.anim=new i.Anim(e.content,f,c.duration,c.easing);e.anim.onComplete.subscribe(function(){e.anim=null;b()});e.anim.animate()}};r=l.Effects;r.scrollx=r.scrolly=r.scroll;l.Plugins.push({name:"effect",init:function(c){var a=c.config,b=a.effect,g=c.panels,e=a.steps,f=c.activeIndex*
e,k=f+e-1,j=g.length;c.viewSize=[a.viewSize[0]||g[0].offsetWidth*e,a.viewSize[0]||g[0].offsetHeight*e];if(b!=="none"){for(a=0;a<j;a++)g[a].style.display="block";switch(b){case "scrollx":case "scrolly":c.content.style.position="absolute";c.content.parentNode.style.position="relative";if(b==="scrollx"){h.setStyle(g,"float","left");c.content.style.width=c.viewSize[0]*(j/e)+"px"}break;case "fade":for(a=0;a<j;a++){h.setStyle(g[a],"opacity",a>=f&&a<=k?1:0);g[a].style.position="absolute";g[a].style.zIndex=
a>=f&&a<=k?9:1}break}}}});d.mix(l.prototype,{_switchView:function(c,a,b,g){var e=this,f=e.config.effect;(d.isFunction(f)?f:r[f]).call(e,c,a,function(){e.fire("switch")},b,g)}})});
KISSY.add("switchable-circular",function(d){function i(j,o,n,q,t){var m=this;j=m.config;o=m.length;var u=m.activeIndex,s=j.scrollType===f,v=s?r:c,w=m.viewSize[s?0:1];s=-w*q;var y={},z,x=t===e;if(z=x&&u===0&&q===o-1||t===g&&u===o-1&&q===0)s=p.call(m,m.panels,q,x,v,w);y[v]={to:s};m.anim&&m.anim.stop();m.anim=new YAHOO.util.Anim(m.content,y,j.duration,j.easing);m.anim.onComplete.subscribe(function(){z&&h.call(m,m.panels,q,x,v,w);m.anim=null;n()});m.anim.animate()}function p(j,o,n,q,t){var m=this.config.steps;
o=this.length;var u=n?o-1:0,s=(u+1)*m;for(m=u*m;m<s;m++){j[m].style.position=l;j[m].style[q]=(n?"-":b)+t*o+a}return n?t:-t*o}function h(j,o,n,q,t){var m=this.config.steps;o=this.length;var u=n?o-1:0,s=(u+1)*m;for(m=u*m;m<s;m++){j[m].style.position=b;j[m].style[q]=b}this.content.style[q]=n?-t*(o-1)+a:b}var l="relative",r="left",c="top",a="px",b="",g="forward",e="backward",f="scrollx",k=d.Switchable;d.mix(k.Config,{circular:false});k.Plugins.push({name:"circular",init:function(j){j=j.config;if(j.circular&&
(j.effect===f||j.effect==="scrolly")){j.scrollType=j.effect;j.effect=i}}})});
KISSY.add("switchable-lazyload",function(d){var i=d.DOM,p="beforeSwitch",h="img-src",l="textarea-data",r={},c=d.Switchable,a=d.DataLazyload;r[h]="data-lazyload-src-custom";r[l]="ks-datalazyload-custom";d.mix(c.Config,{lazyDataType:"",lazyDataFlag:""});c.Plugins.push({name:"autoplay",init:function(b){function g(o){var n=f.steps;o=o.toIndex*n;a.loadCustomLazyData(b.panels.slice(o,o+n),k,j);e()&&b.detach(p,g)}function e(){var o,n,q;if(k===h){o=d.query("img",b.container);n=0;for(q=o.length;n<q;n++)if(i.attr(o[n],
j))return false}else if(k===l){o=d.query("textarea",b.container);n=0;for(q=o.length;n<q;n++)if(i.hasClass(o[n],j))return false}return true}var f=b.config,k=f.lazyDataType,j=f.lazyDataFlag||r[k];!a||!k||!j||b.on(p,g)}})});KISSY.add("tabs",function(d){function i(p,h){if(!(this instanceof i))return new i(p,h);i.superclass.constructor.call(this,p,h)}d.extend(i,d.Switchable);d.Tabs=i});
KISSY.add("slide",function(d){function i(h,l){if(!(this instanceof i))return new i(h,l);l=d.merge(p,l||{});i.superclass.constructor.call(this,h,l)}var p={autoplay:true,circular:true};d.extend(i,d.Switchable);d.Slide=i});KISSY.add("carousel",function(d){function i(h,l){if(!(this instanceof i))return new i(h,l);l=d.merge(p,l||{});i.superclass.constructor.call(this,h,l)}var p={circular:true};d.extend(i,d.Switchable);d.Carousel=i});
KISSY.add("coversflow",function(d){function i(c,a){if(!(this instanceof i))return new i(c,a);a=d.merge(r,a||{});i.superclass.constructor.call(this,c,a);this._initFlow()}var p=YAHOO.util.Dom,h=d.DOM,l=d.Event,r={flowLength:4,aspectRatio:1.964,step:150,width:500,height:350,offset:0,animSpeed:50,autoSwitchToMiddle:true,hasTriggers:false,circular:true};d.extend(i,d.Switchable);d.augment(i,{_initFlow:function(){var c=this,a=c.config;c.busy=false;c.curFrame=0;c.targetFrame=0;c.zIndex=c.length;c.region=
p.getRegion(c.container);c.maxFocus=a.flowLength*a.step;c.maxHeight=c.region.height+Math.round(c.region.height/a.aspectRatio);c.middleLine=c.region.width/2;c.on("beforeSwitch",function(b){b=b.toIndex;c.perIndex=b;c.targetFrame=-b*c.config.step;return!c.busy});a.autoSwitchToMiddle?c.switchTo(Math.floor(c.length/2)):c._frame(0)},_switchView:function(){var c=this.config;if(this.targetFrame<this.curFrame-1||this.targetFrame>this.curFrame+1){this._frame(this.curFrame+(this.targetFrame-this.curFrame)/3);
this._timer=d.later(this._switchView,c.animSpeed,false,this);this.busy=true}else{this.fire("finished");this.busy=false}},_frame:function(c){var a=this.config,b=this.panels,g=this.region,e=this.middleLine-a.offset,f;this.curFrame=c;for(var k=0,j=b.length;k<j;k++){b=this.panels[k];f=k*-a.step;if(f+this.maxFocus<this.targetFrame||f-this.maxFocus>this.targetFrame)h.css(b,"visibility","hidden");else{f=Math.sqrt(1E4+c*c)+100;var o=c/f*e+e,n=a.width/a.height*90/f*e,q=0;if(n>this.maxHeight)n=this.maxHeight;
q=a.width/a.height*n;h.css(b,"left",o-72/f*e+"px");if(n&&q){h.css(b,"height",n+"px");h.css(b,"width",q+"px");h.css(b,"top",g.height/2-n/2+"px")}h.css(b,"zIndex",this.zIndex*100-Math.ceil(f));h.css(b,"visibility","visible");this._bindPanel(b,k)}this.fire("tween",{panel:b,index:k});c+=a.step}},_bindPanel:function(c,a){var b=this;l.remove(c);b.perIndex===a?l.add(c,"click",function(){return b.fire("onCurrent",{panel:c,index:a})}):l.add(c,"click",function(g){g.preventDefault();b.switchTo(a)})}});d.CoversFlow=
i});