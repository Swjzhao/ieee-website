/*

 Copyright (c) 2012. Adobe Systems Incorporated.
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 Neither the name of Adobe Systems Incorporated nor the names of its
 contributors may be used to endorse or promote products derived from this
 software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
*/
(function(a,c){function b(){}var f={version:0.1,inherit:function(b,f){var a=function(){};a.prototype=f.prototype;b.prototype=new a;b.prototype.constructor=b;b.prototype._super=f},ensureArray:function(){var b=[],f=arguments.length;f>0&&(b=f>1||!a.isArray(arguments[0])?a.makeArray(arguments):arguments[0]);return b},scopedFind:function(b,f,c,i){for(var c=" "+c+" ",j=[],b=a(b).find(f),f=b.length,i=a(i)[0],k=0;k<f;k++)for(var n=b[k],l=n;l;){if(l.className&&(" "+l.className+" ").indexOf(c)!==-1){l===i&&
j.push(n);break}l=l.parentNode}return a(j)}};a.extend(b.prototype,{bind:function(b,f,c){return a(this).bind(b,f,c)},unbind:function(b,f){return a(this).unbind(b,f)},trigger:function(b,f){var c=a.Event(b);a(this).trigger(c,f);return c}});f.EventDispatcher=b;c.WebPro=f})(jQuery,window,document);
(function(a,c){var b=1;c.ImageLoader=function(b){c.EventDispatcher.call();var d=this;this.options=a.extend({},this.defaultOptions,b);this._currentEntry=null;this._queue=[];this._isRunning=this._needsSort=!1;this._loader=new Image;this._loadFunc=function(){d._handleLoad()};this._loadErrorFunc=function(){d._handleError()};this._timeoutFunc=function(){d.trigger("wp-image-loader-timeout",this._currentEntry);d._loadNext()}};c.inherit(c.ImageLoader,c.EventDispatcher);a.extend(c.ImageLoader.prototype,{defaultOptions:{timeoutInterval:1E3},
add:function(f,d){if(f){urls=c.ensureArray(f);for(var g=0;g<urls.length;g++){var h=a.extend({reqId:b++,src:urls[g],width:0,height:0,priority:50,callback:null,data:null},d);this._queue.push(h);this._needsSort=!0;this.trigger("wp-image-loader-add",h)}this._isRunning&&!this._currentEntry&&this._loadNext()}},start:function(){if(!this._isRunning)this._isRunning=!0,this._loadNext(),this.trigger("wp-image-loader-start")},stop:function(){if(this._isRunning)this._currentEntry&&this._queue.unshift(this._currentEntry),
this._resetLoader(),this._isRunning=!1,this.trigger("wp-image-loader-stop")},clearQueue:function(){var b=this._isRunning;this.stop();this._queue.length=0;b&&this.start()},_loadNext:function(){var d;this._resetLoader();var b=this._queue;if(b.length){if(this._needsSort)d=this._queue=b.sort(function(b,f){var a=b.priority-f.priority;return a?a:b.reqId-f.reqId}),b=d,this._needsSort=!1;this._currentEntry=b=b.shift();this.timeoutTimerId=setTimeout(this.timeoutFunc,this.options.timeoutInterval);var a=this._loader;
a.onload=this._loadFunc;a.onerror=this._loadErrorFunc;a.src=b.src}},_resetLoader:function(){var b=this._loader;b.onload=null;b.onerror=null;this._currentEntry=b.src=null;if(this._timeoutTimerId)clearTimeout(this._timeoutTimerId),this._timeoutTimerId=0},_handleLoad:function(){var b=this._loader,a=this._currentEntry;a.width=b.width;a.height=b.height;a.callback&&a.callback(a.src,a.width,a.height,a.data);this.trigger("wp-image-loader-load-success",a);this._loadNext()},_handleError:function(){this.trigger("wp-image-loader-load-error",
this._currentEntry);this._loadNext()}})})(jQuery,WebPro,window,document);
(function(a,c){function b(){c.EventDispatcher.call(this);this._initialize.apply(this,arguments)}c.inherit(b,c.EventDispatcher);a.extend(b.prototype,{defaultOptions:{},_widgetName:"Widget",_initialize:function(){var b;this.plugins=[];var d=this.trigger("before-setup");d.isDefaultPrevented()||(b=this._setUp.apply(this,arguments),this.trigger("setup"));d=this.trigger("before-init-plugins");d.isDefaultPrevented()||(this._initializePlugins(b),this.trigger("init-plugins"));this.options=a.extend({},this.defaultOptions,
b);d=this.trigger("before-extract-data");d.isDefaultPrevented()||(this._extractData(),this.trigger("extract-data"));d=this.trigger("before-transform-markup");d.isDefaultPrevented()||(this._transformMarkup(),this.trigger("transform-markup"));d=this.trigger("before-attach-behavior");d.isDefaultPrevented()||(this._attachBehavior(),this.trigger("attach-behavior"));d=this.trigger("before-ready");d.isDefaultPrevented()||(this._ready(),this.trigger("ready"))},_setUp:function(b,d){this.$element=a(b);return d},
_initializePlugins:function(b){for(var b=b||{},a=((typeof b.useDefaultPlugins==="undefined"||b.useDefaultPlugins)&&this.defaultPlugins?this.defaultPlugins:[]).concat(b.plugins||[]),a=a.sort(function(b,a){b=typeof b.priority==="number"?b.priority:50;a=typeof a.priority==="number"?a.priority:50;return b-a}),c=0;c<a.length;c++){var h=a[c];h&&h.initialize&&h.initialize(this,b)}this.plugins=a},_extractData:function(){},_transformMarkup:function(){},_attachBehavior:function(){},_ready:function(){}});c.Widget=
b;c.widget=function(b,d,g){var h=g&&d||c.Widget,g=g||d||{},d=function(){h.apply(this,arguments);this._widgetName=b};c.inherit(d,h);a.extend(d.prototype,g);d.prototype.defaultOptions=a.extend({},h.prototype.defaultOptions,g.defaultOptions);var g=b.split("."),i=g.length;namespace=i>1&&g[0]||"Widget";b=g[i-1];c[namespace][b]=d}})(jQuery,WebPro,window,document);
(function(a,c){c.widget("Widget.Button",c.Widget,{defaultOptions:{hoverClass:"wp-button-hover",activeClass:"wp-button-down",disabledClass:"wp-button-disabled",disabled:!1,callback:null},_attachBehavior:function(){var b=this,f=function(d){b.mouseDown=!1;b.$element.removeClass(b.options.activeClass);!b.options.disabled&&b.options.callback&&b.options.callback.call(this,d);a(b.$element).off("mouseup",f)};this.mouseDown=!1;this.$element.on("mouseover",function(){b.options.disabled||b.$element.addClass(b.options.hoverClass+
(b.mouseDown?" "+b.options.activeClass:""))}).on("mouseout",function(){b.$element.removeClass(b.options.hoverClass+" "+b.options.activeClass);a(b.$element).off("mouseup",f)}).on("mousedown",function(){if(!b.options.disabled)b.mouseDown=!0,b.$element.addClass(b.options.activeClass),a(b.$element).on("mouseup",f)});this.disabled(this.options.disabled)},disabled:function(b){if(typeof b==="boolean")this.options.disabled=b,this.$element[b?"addClass":"removeClass"](this.options.disabledClass);return this.options.disabled}});
a.fn.wpButton=function(b){this.each(function(){new c.Widget.Button(this,b)});return this}})(jQuery,WebPro,window,document);
(function(a,c){c.widget("Widget.RadioGroup",c.Widget,{_widgetName:"radio-group",defaultOptions:{defaultIndex:0,hoverClass:"wp-radio-hover",downClass:"wp-radio-down",disabledClass:"wp-radio-disabled",checkedClass:"wp-radio-checked",disabled:!1,toggleStateEnabled:!1},_attachBehavior:function(){var b=this;this.buttons=[];this.activeElement=null;this.activeIndex=-1;this.$element.each(function(){b.buttons.push(b._addButtonBehavior(this))});this.disabled(this.options.disabled);var a=this.options.defaultIndex;
typeof a==="number"&&a>=0&&this.checkButton(a)},_addButtonBehavior:function(b){var a=this,d=new c.Widget.Button(b,{hoverClass:this.options.hoverClass,downClass:this.options.downClass,disabledClass:this.options.disabledClass,callback:function(c){return a._handleClick(c,d,b)}});return d},_handleClick:function(b,a,d){this.options.disabled||this.checkButton(d)},_getElementIndex:function(b){return b?a.inArray(b,this.$element.get()):-1},_getElementByIndex:function(b){return b>=0?this.$element.eq(b)[0]:
null},_getElement:function(b){return typeof b==="number"?this._getElementByIndex(b):b},checkButton:function(b){var b=this._getElement(b),f=this.activeElement,d=this.options.checkedClass;b!==f?(f&&a(f).removeClass(d),b&&a(b).addClass(d)):this.options.toggleStateEnabled&&b&&(a(b).removeClass(d),b=null);this.activeElement=b;this.activeIndex=this._getElementIndex(b)},disabled:function(b){if(typeof b==="boolean")this.disabled=b,a.each(this.buttons,function(){this.disabled(b)});return this.options.disabled}});
a.fn.wpRadioGroup=function(b){new c.Widget.RadioGroup(this,b);return this}})(jQuery,WebPro,window,document);
(function(a,c){c.widget("Widget.TabGroup",c.Widget.RadioGroup,{defaultOptions:{defaultIndex:0,hoverClass:"wp-tab-hover",downClass:"wp-tab-down",disabledClass:"wp-tab-disabled",checkedClass:"wp-tab-active",disabled:!1,toggleStateEnabled:!1},selectTab:function(b){this.checkButton(b)},checkButton:function(b){var a=this._getElement(b),d=this._getElementIndex(a),a={tab:a,tabIndex:d};this.trigger("wp-tab-before-select",a);this._super.prototype.checkButton.apply(this,arguments);this.trigger("wp-tab-select",
a)}});a.fn.wpTabGroup=function(b){new c.Widget.TabGroup(this,b);return this}})(jQuery,WebPro,window,document);
(function(a,c){c.widget("Widget.PanelGroup",c.Widget,{_widgetName:"panel-group",defaultOptions:{defaultIndex:0,panelClass:"wp-panel",activeClass:"wp-panel-active",toggleStateEnabled:!1,tabGroups:null},_setUp:function(){var b=this;this.tabGroups=[];this._tabCallback=function(a,d){b._handleTabSelect(a,d)};this.showLock=0;this.tabDriver=null;return this._super.prototype._setUp.apply(this,arguments)},_attachBehavior:function(){this.activeElement=null;this.activeIndex=-1;this.$element.addClass(this.options.panelClass);
var b=this.options.defaultIndex;typeof b==="number"&&b>=0&&this.showPanel(b);this.addTabGroup(this.options.tabGroups)},_getElementIndex:function(b){return b?a.inArray(b,this.$element.get()):-1},_getElementByIndex:function(b){return this.$element.eq(b)[0]},_getElement:function(b){return typeof b==="number"?this._getElementByIndex(b):b},showPanel:function(b){if(!this.showLock){++this.showLock;var f=this._getElement(b),d=this.activeElement,c=this.options.activeClass;if(f)if(f!==d){b={panel:f,panelIndex:this._getElementIndex(f)};
this.trigger("wp-panel-before-show",b);d&&this.hidePanel(d);a(f).addClass(c);this.activeElement=f;this.activeIndex=this._getElementIndex(f);f=this.tabGroups;for(d=0;d<f.length;d++)c=f[d],c!==this.tabDriver&&c.selectTab(this.activeIndex);this.trigger("wp-panel-show",b)}else this.options.toggleStateEnabled&&this.hidePanel(f);--this.showLock}},hidePanel:function(b){if(b=typeof b==="number"?this.$element.eq(b)[0]:b){var f={panel:b,panelIndex:this._getElementIndex(b)};this.trigger("wp-panel-before-hide",
f);a(b).removeClass(this.options.activeClass);if(b===this.activeElement)this.activeElement=null,this.activeIndex=-1;this.trigger("wp-panel-hide",f)}},_handleTabSelect:function(b,a){if(!this.showLock)this.tabDriver=b.target,this.showPanel(a.tabIndex),this.tabDriver=null},addTabGroup:function(b){if(b)for(var b=c.ensureArray(b),f=b.length,d=0;d<f;d++){var g=b[d];a.inArray(this.tabGroups,g)===-1&&(this.tabGroups.push(g),g.selectTab(this.activeIndex),g.bind("wp-tab-select",this._tabCallback))}},removeTabGroup:function(b){for(var b=
c.ensureArray(b),f=b.length,d=0;d<f;d++){var g=b[d];sets=this.tabGroups;loc=a.inArray(sets,g);loc!==-1&&sets.splice(loc,1)}}});a.fn.wpPanelGroup=function(b){new c.Widget.PanelGroup(this,b);return this}})(jQuery,WebPro,window,document);
(function(a,c){c.widget("Widget.Disclosure",c.Widget,{defaultOptions:{widgetClassName:"wp-disclosure-panels",tabClassName:"wp-disclosure-panels-tab",tabHoverClassName:"wp-disclosure-panels-tab-hover",tabDownClassName:"wp-disclosure-panels-tab-down",panelClassName:"wp-disclosure-panels-panel",tabActiveClassName:"wp-disclosure-panels-tab-active",panelActiveClassName:"wp-disclosure-panels-panel-active",defaultIndex:0,toggleStateEnabled:!1},_attachBehavior:function(){var b=this.$element[0],a=this.options.widgetClassName,
d=c.scopedFind(b,"."+this.options.tabClassName,a,b),b=c.scopedFind(b,"."+this.options.panelClassName,a,b);this.tabs=new c.Widget.TabGroup(d,{hoverClass:this.options.tabHoverClassName,downClass:this.options.tabDownClassName,checkedClass:this.options.tabActiveClassName});this.panels=new c.Widget.PanelGroup(b,{panelClass:this.options.panelClassName,activeClass:this.options.panelActiveClassName,defaultIndex:this.options.defaultIndex,toggleStateEnabled:this.options.toggleStateEnabled});this.panels.addTabGroup(this.tabs)}});
c.widget("Widget.TabbedPanels",c.Widget.Disclosure,{defaultOptions:{widgetClassName:"wp-tabbed-panels-panels",tabClassName:"wp-tabbed-panels-panels-tab",tabHoverClassName:"wp-tabbed-panels-panels-tab-hover",tabDownClassName:"wp-tabbed-panels-panels-tab-down",tabActiveClassName:"wp-tabbed-panels-panels-tab-active",panelClassName:"wp-tabbed-panels-panels-panel",panelActiveClassName:"wp-tabbed-panels-panels-panel-active",toggleStateEnabled:!1}});c.widget("Widget.Accordion",c.Widget.Disclosure,{defaultOptions:{widgetClassName:"wp-accordion",
tabClassName:"wp-accordion-tab",tabHoverClassName:"wp-accordion-tab-hover",tabDownClassName:"wp-accordion-tab-down",tabActiveClassName:"wp-accordion-tab-active",panelClassName:"wp-accordion-panel",panelActiveClassName:"wp-accordion-panel-active",toggleStateEnabled:!1}})})(jQuery,WebPro,window,document);
(function(a,c){c.Widget.Disclosure.DisplayPropertyTransitionPlugin={defaultOptions:{},initialize:function(b,f){var d=this;a.extend(f,a.extend({},d.defaultOptions,f));b.bind("attach-behavior",function(){d._attachBehavior(b)})},_attachBehavior:function(b){var b=b.panels,a=b.$element,d=b.activeIndex;b.bind("wp-panel-show",function(b,a){a.panel.style.display="block"});b.bind("wp-panel-hide",function(b,a){a.panel.style.display="none"});a.each(function(b){this.style.display=b!==d?"none":"block"})}};c.Widget.Disclosure.AccordionTransitionPlugin=
{defaultOptions:{transitionDirection:"vertical",transitionDuration:500},initialize:function(b,f){var d=this;a.extend(f,a.extend({},d.defaultOptions,f));b.bind("attach-behavior",function(){d._attachBehavior(b)})},_attachBehavior:function(b){var a=this,d=b.panels,c=d.$element,h=d.activeIndex,i=b.options.transitionDirection;c.css("overflow","hidden");d.bind("wp-panel-show",function(d,c){a._showPanel(b,c)});d.bind("wp-panel-hide",function(d,c){a._hidePanel(b,c)});c.each(function(b){if(b!==h){if(i==="vertical"||
i==="both")this.style.height="0";if(i==="horizontal"||i==="both")this.style.width="0"}})},_showPanel:function(b,f){var d=b.options,c=d.transitionDirection,h=a(f.panel),i={};if(c==="vertical"||c==="both")i.height=h[0].scrollHeight+"px";if(c==="horizontal"||c==="both")i.width=h[0].scrollWidth+"px";h.stop(!0,!0).animate(i,{duration:d.transitionDuration,complete:function(){var b={};if(c==="vertical"||c==="both")b.height="auto";if(c==="horizontal"||c==="both")b.width="auto";h.css(b)}})},_hidePanel:function(b,
f){var d=b.options,c=d.transitionDirection,h=a(f.panel),i={};if(c==="vertical"||c==="both")i.height="0";if(c==="horizontal"||c==="both")i.width="0";h.stop(!0,!0).animate(i,{duration:d.transitionDuration})}}})(jQuery,WebPro,window,document);
(function(a,c){c.widget("Widget.SlideShowBase",c.Widget,{_widgetName:"slideshow-base",defaultOptions:{displayInterval:6E3,autoPlay:!1},_setUp:function(){var b=this;this._ssTimer=0;this._ssTimerTriggered=!1;this._ssTimerCallback=function(){b._ssTimerTriggered=!0;b.next();b._ssTimerTriggered=!1};return c.Widget.prototype._setUp.apply(this,arguments)},_ready:function(){this.options.autoPlay&&this.play()},play:function(){e=this.trigger("wp-slideshow-before-play");e.isDefaultPrevented()||(this._startTimer(),
this.trigger("wp-slideshow-play"))},stop:function(){e=this.trigger("wp-slideshow-before-stop");e.isDefaultPrevented()||(this._stopTimer(),this.trigger("wp-slideshow-stop"))},isPlaying:function(){return this._ssTimer!==0},_startTimer:function(){this._stopTimer();this._ssTimer=setTimeout(this._ssTimerCallback,this.options.displayInterval)},_stopTimer:function(){this._ssTimer&&clearTimeout(this._ssTimer);this._ssTimer=0},_executeCall:function(b,a){e=this.trigger("wp-slideshow-before-"+b);e.isDefaultPrevented()||
(this["_"+b].apply(this,a)&&this.stop(),this.isPlaying()&&this._startTimer(),this.trigger("wp-slideshow-"+b))},first:function(){return this._executeCall("first",arguments)},last:function(){return this._executeCall("last",arguments)},previous:function(){return this._executeCall("previous",arguments)},next:function(){return this._executeCall("next",arguments)},goTo:function(){return this._executeCall("goTo",arguments)},_first:function(){},_last:function(){},_previous:function(){},_next:function(){},
_goTo:function(){}})})(jQuery,WebPro,window,document);
(function(a,c){c.widget("Widget.ContentSlideShow",c.Widget.SlideShowBase,{_widgetName:"content-slideshow",defaultOptions:{slideshowClassName:"wp-slideshow",clipClassName:"wp-slideshow-clip",viewClassName:"wp-slideshow-view",slideClassName:"wp-slideshow-slide",slideLinkClassName:"wp-slideshow-slide-link",firstBtnClassName:"wp-slideshow-first-btn",lastBtnClassName:"wp-slideshow-last-btn",prevBtnClassName:"wp-slideshow-prev-btn",nextBtnClassName:"wp-slideshow-next-btn",playBtnClassName:"wp-slideshow-play-btn",
stopBtnClassName:"wp-slideshow-stop-btn",playingClassName:"wp-slideshow-playing"},_findWidgetElements:function(b){var a=this.$element[0];return c.scopedFind(a,b,this.options.slideshowClassName,a)},_attachBtnHandler:function(b,a){var d=this;this["$"+a+"Btn"]=this._findWidgetElements("."+b).bind("click",function(b){d[a]();b.preventDefault()})},_attachBehavior:function(){var b=this,a=this.options;this._super.prototype._attachBehavior.call(this);this._panelShowCallback=function(){b._ssTimerTriggered||
b.isPlaying()&&b._startTimer()};this.$element.addClass(a.slideshowClassName);var d=this._findWidgetElements("."+a.slideClassName),g=this._findWidgetElements("."+a.slideLinkClassName);this.slides=new c.Widget.PanelGroup(d,{defaultIndex:a.defaultIndex||0});this.slides.bind("wp-panel-show",this._panelShowCallback);this.tabs=null;if(g.length)this.tabs=new c.Widget.TabGroup(g),this.slides.addTabGroup(this.tabs);this._attachBtnHandler(a.firstBtnClassName,"first");this._attachBtnHandler(a.lastBtnClassName,
"last");this._attachBtnHandler(a.prevBtnClassName,"previous");this._attachBtnHandler(a.nextBtnClassName,"next");this._attachBtnHandler(a.playBtnClassName,"play");this._attachBtnHandler(a.stopBtnClassName,"stop");this.bind("wp-slideshow-play",function(){this.$element.addClass(a.playingClassName)});this.bind("wp-slideshow-stop",function(){this.$element.removeClass(a.playingClassName)})},_first:function(){this.slides.showPanel(0)},_last:function(){var b=this.slides;b.showPanel(b.$element.length-1)},
_previous:function(){var b=this.slides,a=b.activeIndex;b.showPanel((a<1?b.$element.length:a)-1)},_next:function(){var b=this.slides;b.showPanel((b.activeIndex+1)%b.$element.length)},_goTo:function(){this.slides.showPanel.apply(this.slides,arguments)}})})(jQuery,WebPro,window,document);
(function(a,c){c.Widget.ContentSlideShow.fadingTransitionPlugin={defaultOptions:{transitionDuration:500},initialize:function(b,f){var d=this;a.extend(f,a.extend({},d.defaultOptions,f));b.bind("attach-behavior",function(){d.attachBehavior(b)})},attachBehavior:function(b){var a=this,d=b.slides,c=d.$element,h=d.activeIndex;d.bind("wp-panel-show",function(d,c){a.handleShowSlide(b,c)}).bind("wp-panel-hide",function(d,c){a.handleHideSlide(b,c)});for(d=0;d<c.length;d++)if(d!==h)c[d].style.display="none"},
handleShowSlide:function(b,f){a(f.panel).stop(!1,!0).fadeIn(b.options.transitionDuration)},handleHideSlide:function(b,f){a(f.panel).stop(!1,!0).fadeOut(b.options.transitionDuration)}};c.Widget.ContentSlideShow.filmstripTransitionPlugin={defaultOptions:{transitionDuration:500,transitionStyle:"horizontal"},initialize:function(b,f){var d=this;a.extend(f,a.extend({},d.defaultOptions,f));b.bind("attach-behavior",function(){d.attachBehavior(b)})},attachBehavior:function(b){var a=this,d=b.options,c=d.transitionStyle===
"horizontal",h=b.slides,i=h.$element,j=b._findWidgetElements("."+d.clipClassName),d=b._findWidgetElements("."+d.viewClassName),k=j.width(),n=j.height(),l=c?k:n,m=0,o={top:"0",left:"0"};j.css("position")!=="absolute"&&j.css("position","relative");d.css("position")!=="absolute"&&(o.position="relative");b._fstp$Clip=j;b._fstp$View=d;b._fstpStyleProp=c?"left":"top";b._fstpStylePropZero=c?"top":"left";h.bind("wp-panel-show",function(d,c){a._goToSlide(b,c.panel)});b._fstpRequestType=null;b.bind("wp-slideshow-before-previous wp-slideshow-before-next",
function(a){b._fstpRequestType=a.type.replace(/.*-/,"");b._fstpOldActiveIndex=b.slides.activeIndex}).bind("wp-slideshow-previous wp-slideshow-next",function(){b._fstpRequestType=null;b._fstpOldActiveIndex=-1});for(var j=b._fstpStyleProp,p=b._fstpStylePropZero,q=0;q<i.length;q++){var r=i[q].style;r[p]="0";r[j]=m+"px";r.margin="0";r.position="absolute";m+=l}o[c?"width":"height"]=m+"px";o[c?"height":"width"]=(c?n:k)+"px";h.activeElement||(o[j]=(c?k:n)+"px",o[p]="0");o.overflow="visible";d.css(o);a._goToSlide(b,
h.activeElement)},_goToSlide:function(b,f){if(b){var d=a(f),c=b._fstp$View,h=b._fstpStyleProp,i=h==="left"?"offsetLeft":"offsetTop",j=h==="left"?"offsetWidth":"offsetHeight",k=f?-f[i]:b._fstp$Clip[0][j],n={};n[h]=k+"px";var l=b._fstpRequestType,m=b._fstpOldActiveIndex;if(l&&m!==-1){var o=b.slides.activeIndex,p=b.slides.$element.length-1;if(o!==m){var q=0;l==="previous"&&m===0&&o===p?q=-f[j]:l==="next"&&m===p&&o===0&&(l=b.slides.$element[m],q=l[i]+l[j]);q&&(n[h]=-q+"px",d.css(h,q+"px"))}}c.stop(!1,
!0).animate(n,b.options.transitionDuration,function(){q&&(d.css(h,-k+"px"),c.css(h,k+"px"))})}}};c.Widget.ContentSlideShow.slideImageIncludePlugin={defaultOptions:{imageIncludeClassName:"wp-slideshow-slide-image-include",slideLoadingClassName:"wp-slideshow-slide-loading"},initialize:function(b,f){var d=this;a.extend(f,a.extend({},d.defaultOptions,f));b._cssilLoader=new c.ImageLoader;b.bind("attach-behavior",function(){d._attachBehavior(b)})},_attachBehavior:function(b){for(var a=this,d=b._cssilLoader,
c=b._findWidgetElements("."+b.options.slideClassName),h=c.length,i="."+b.options.imageIncludeClassName,j=b.options.slideLoadingClassName,k=function(d,c,g,h){a._handleImageLoad(b,d,c,g,h)},n=0;n<h;n++){var l=c.eq(n),m=l.find(i);if(ele=m[0]){var o=ele.href||m.data("src");if(o)m={id:m.data("id")||"",width:m.data("width"),height:m.data("height"),$ele:m,$slide:l},ele.style.visibility="hidden",d.add(o,{callback:k,data:m}),l.addClass(j)}}b._cssilLoader.start()},_handleImageLoad:function(b,a,d,c,h){h.$ele.replaceWith('<img id="'+
(h.id||"")+'" src="'+a+'" width="'+(h.width||d)+'" height="'+(h.height||c)+'">');h.$slide.removeClass(b.options.slideLoadingClassName)}};c.Widget.ContentSlideShow.shufflePlayPlugin={defaultOptions:{randomDefaultIndex:!0},initialize:function(b,f){var d=this;a.extend(f,a.extend({},d.defaultOptions,f));b._shuffleArray=[];b._shuffleNextDict={};b._realNext=b._next;b._next=function(){d._handleNext(b)};b._shufflePlayCount=0;b.bind("wp-slideshow-before-play",function(){return d._reshuffle(b)});f.randomDefaultIndex&&
typeof f.defaultIndex==="undefined"&&b.bind("before-attach-behavior",function(){var a=b._findWidgetElements("."+b.options.slideClassName).length,f=Math.floor(Math.random()*a);b.options.defaultIndex=f>=a?a-1:f})},_fisherYatesArrayShuffle:function(b){if(b&&b.length)for(var a=b.length;--a;){var d=Math.floor(Math.random()*(a+1)),c=b[d];b[d]=b[a];b[a]=c}},_reshuffle:function(a){var f=a._shuffleArray,d={},c=a.slides.$element.length;if(f.length!==c)for(var h=f.length=0;h<c;h++)f[h]=h;this._fisherYatesArrayShuffle(f);
for(h=0;h<c;h++)d[f[h]]=f[(h+1)%c];a._shuffleNextDict=d;a._shufflePlayCount=0},_handleNext:function(a){a.isPlaying()?(a._goTo(a._shuffleNextDict[a.slides.activeIndex]||0),++a._shufflePlayCount>=a.slides.$element.length&&this._reshuffle(a)):a._realNext()}}})(jQuery,WebPro,window,document);
(function(a,c){c.widget("Widget.Form",c.Widget,{_widgetName:"form",defaultOptions:{validationEvent:"blur",errorStateSensitivity:"low",ajaxSubmit:!0,fieldWrapperClass:"field",formErrorClass:"form-error",formSubmittedClass:"form-submitted",formDeliveredClass:"form-delivered",focusClass:"focus",notEmptyClass:"not-empty",emptyClass:"empty",validClass:"valid",invalidClass:"invalid",requiredClass:"required"},validationTypes:{"always-valid":/.*/,email:/^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
alpha:/^[A-z\s]+$/,numeric:/^[0-9]+$/,phone:/^([0-9])?(\s)?(\([0-9]{3}\)|[0-9]{3}(\-)?)(\s)?[0-9]{3}(\s|\-)?[0-9]{4}(\s|\sext|\sx)?(\s)?[0-9]*$/,time:function(a){var f=a.val().replace(/[^0-9:APM]/g,"");if(f.indexOf(":")!=-1&&f.match(/:/).length==1){var d=f.split(":"),c=parseInt(d[0]),d=parseInt(d[1]);if(c<0||c>24)return!0;if(d<0||d>59)return!0}else return!1;a.val(f);return!0}},_extractData:function(){this.event=this.options.validationEvent;this.errorSensitivity=this.options.errorStateSensitivity;
this.classNames={focus:this.options.focusClass,blur:this.options.emptyClass,keydown:this.options.notEmptyClass}},_attachBehavior:function(){var b=this;this.$element.find("input, textarea").each(function(){a(this).val()!=""&&a(this).removeClass(b.options.emptyClass)});this.$element.find("."+this.options.fieldWrapperClass).each(function(){a(this).find("input, textarea").val()!=""&&a(this).addClass(b.classNames.keydown)});this.$element.find("input, textarea").bind("focus blur keydown change propertychange",
function(f){var d=b.classNames[f.type],c=b.classNames.focus,h=b.classNames.keydown,i=b.classNames.blur,j=a(this),k=j.closest("."+b.options.fieldWrapperClass);switch(f.type){case "focus":k.addClass(d).removeClass(i);break;case "blur":k.removeClass(c);j.val()==""&&k.addClass(d).removeClass(h);break;case "keydown":k.addClass(d).removeClass(i);break;case "change":case "propertychange":j.val()!=""?k.addClass(h).removeClass(i):k.addClass(i).removeClass(h)}});switch(this.event){case "blur":case "keyup":this.$element.find("."+
this.options.fieldWrapperClass+" input, ."+this.options.fieldWrapperClass+" textarea").bind(this.event,function(){b._validate(a(this).closest("."+b.options.fieldWrapperClass))});case "submit":this.$element.submit(function(f){var d=!0,c=b.$element.find("."+b.options.fieldWrapperClass).length-1;b.$element.find("."+b.options.fieldWrapperClass).each(function(h){if((d=b._validate(a(this))?d:!1)&&h==c&&b.options.ajaxSubmit)f.preventDefault(),b._submitForm();d||f.preventDefault()})})}},_submitForm:function(){var b=
this,f=this.options.formSubmittedClass,d=this.options.formDeliveredClass,c=this.options.formErrorClass,h=f+" "+d+" "+c,i=this.$element.find("input[type=submit], button");a.ajax({url:this.$element.attr("action"),type:"post",data:this.$element.serialize(),beforeSend:function(){b.$element.removeClass(h);b.$element.addClass(f);b.$element.find("."+b.options.fieldWrapperClass).removeClass(b.options.focusClass);i.attr("disabled","disabled")},success:function(){b.$element.addClass(d).removeClass(f);b.$element.find("input:not([type=submit]), textarea").each(function(){a(this).val("")});
i.removeAttr("disabled")},error:function(){b.$element.addClass(c).removeClass(f);i.removeAttr("disabled")}})},_validate:function(a,f){var d=a.attr("data-type")||"always-valid",c=a.find("input, textarea"),f=f||!1,h=this.validationTypes[d],d=a.attr("data-required")==="true",i=c.val()=="",c=h instanceof RegExp?Boolean(c.val().match(h)):h(c);if(d&&i)return this._switchState("required",a);if(!c&&!f)return this._switchState("invalid",a);return this._switchState("valid",a)},_switchState:function(a,f){var d=
this.options.validClass,c=this.options.invalidClass,h=this.options.requiredClass;f.removeClass(d+" "+c+" "+h);if(a=="required"||a=="invalid"){if(a=="invalid")f.addClass(c);else{f.addClass(h);var i=!0}if(this.errorSensitivity!="low"){var j=this,d=this.errorSensitivity=="high"?"keyup":"blur";f.data("error-state")||(f.data("error-state",!0),f.find("input, textarea").bind(d,function(){j._validate(f,i)}))}return!1}f.data("error-state")&&(this.errorSensitivity=="high"?this.event!="keyup"&&f.data("error-state",
!1).find("input, textarea").unbind("keyup"):this.errorSensitivity=="medium"&&this.event!="blur"&&f.data("error-state",!1).find("input, textarea").unbind("blur"));f.addClass(d);return!0}});a.fn.wpForm=function(a){new c.Widget.Form(this,a);return this}})(jQuery,WebPro,window,document);
