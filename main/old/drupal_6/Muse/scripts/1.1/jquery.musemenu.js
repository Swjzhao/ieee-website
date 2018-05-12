/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2011 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/
(function(a){a.fn.museMenu=function(){return this.each(function(){var c=a(this),b="absolute",f,d,g,h,i;if(c.css("position")=="fixed")b="fixed",f=c.css("top"),d=c.css("left"),g=c.css("right"),h=c.css("bottom"),i=parseInt(c.css("margin-left"));else for(var j=c.parent();j.length>0&&j.attr("id")!="page";){if(j.css("position")=="fixed"){var b="fixed",k=j.offset(),n=c.offset(),l=j.css("top"),m=j.css("left"),o=j.css("right"),p=j.css("bottom");f=l!="auto"?parseInt(l)+(n.top-k.top):l;d=m!="auto"&&m.indexOf("%")==
-1?parseInt(m)+(n.left-k.left):m;g=o!="auto"&&o.indexOf("%")==-1?parseInt(o)+(k.left+j.width())-(n.left+c.width()):o;h=p!="auto"?parseInt(p)+(k.top+j.height())-(n.top+c.height()):p;i=parseInt(j.css("margin-left"))+(m.indexOf("%")!=-1?n.left-k.left:0);break}j=j.parent()}var q=a(),r=!1,s=c.find(".MenuItemContainer"),j=c.find(".MenuItem");j.bind("mouseenter",function(){r=!0});j.bind("mouseleave",function(){r=!1;setTimeout(function(){r===!1&&(s.each(function(){a(this).data("hideSubmenu")()}),q=a())},
300)});j.each(function(){var j=a(this),k=j.siblings(".SubMenu"),l=j.closest(".MenuItemContainer"),n=l.parentsUntil(".MenuBar").filter(".MenuItemContainer").length===0,m;if(n&&k.length>0){var o=a("<div style='position:"+b+"' class='MenuBar popup_element'></div>").hide().appendTo("body");k.show();m=k.position().top;k.hide()}l.data("$parentMenuItemContainer",l.parent().closest(".MenuItemContainer")).data("showSubmenuOnly",function(){if(n&&k.length>0)if(b!="fixed"){var a=l.offset();o.appendTo("body").css({left:a.left,
top:a.top}).append(k).show()}else{var a=l.position(),j=0,p=0;g!="auto"&&(j=c.outerWidth()-a.left);h!="auto"&&(p=m);o.appendTo("body").css({left:d,top:f,right:g,bottom:h,marginLeft:i+a.left,marginRight:j,marginTop:a.top,marginBottom:p}).append(k).show()}k.show();k.find(".SubMenu").hide()}).data("hideSubmenu",function(){k.hide()}).data("isDescendentOf",function(a){for(var b=l.data("$parentMenuItemContainer");b.length>0;){if(a.index(b)>=0)return!0;b=b.data("$parentMenuItemContainer")}return!1});var p=
function(){var b=q;b.length==0?l.data("showSubmenuOnly")():l.data("$parentMenuItemContainer").index(b)>=0?l.data("showSubmenuOnly")():l.siblings().index(b)>=0?(b.data("hideSubmenu")(),l.data("showSubmenuOnly")()):b.data("isDescendentOf")(l)?l.data("showSubmenuOnly")():b.data("isDescendentOf")(l.siblings(".MenuItemContainer"))?(l.siblings(".MenuItemContainer").each(function(){a(this).data("hideSubmenu")()}),l.data("showSubmenuOnly")()):(b.get(0),l.get(0));q=l},r=null;j.bind("mouseenter",function(){j.data("mouseEntered",
!0);r=setTimeout(function(){p()},200);j.one("mouseleave",function(){clearTimeout(r);j.data("mouseEntered",!1)})});var s=function(b){!k.is(":visible")&&a(b.target).closest(l).length>0?(b.stopPropagation(),Muse.Utils.redirectCancelled=!0,j.data("mouseEntered")&&setTimeout(function(){l.data("showSubmenuOnly")()},200)):k.is(":visible")&&a(b.target).closest(k).length==0&&a(b.target).closest(l).length==0&&l.data("hideSubmenu")()};j.click(function(){return!(Muse.Utils.isTouchDevice()&&k.length>0&&!k.is(":visible"))});
k.length>0&&a(document.documentElement).bind("touchend",s)})})}})(jQuery);
