/*
 * SYSUI-SYSBOX弹框插件（保留头部可免费使用）
 * 2018-11-26 version1.1
 * 799129700@qq.com SYSHUXL-化海天堂 www.husysui.com
 * Reserved head available commercial use
 * Universal background system interface framework
 * box弹框功能 （弹框文本，弹框ajax，提示）
 */
"use strict"
var _global;
//简化document.getElementById方法
function BOX$(i) {
	return document.getElementById(i)
}
//简化document.createElement方法
function BOXLAYER$(i) {
	return document.createElement(i)
}
function extend(o, n, override) {
	for(var key in n) {
		if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
			o[key] = n[key];
		}
	}
	return o;
}
// 插件构造函数 - 返回数组结构
function Mysysbox(options) {
	this._initial(options);
}
Mysysbox.prototype = {
	constructor: this,
	_initial: function(options) {
		var par = {
			ieventmask: true,
			mask: true,
			lock: true,
			btn: [], //按钮
			title:null, //栏目标题
			mode: 0, //显示状态
			tm: 0, //窗口透明度
			time: null, //设置提示时间
			width: 0, //窗口宽度
			height: 0, //窗口高度
			content: '', //显示内容	
			confirm: function(event) {},
			close: function() {},
			callback:function(){}//回调方法
		};
		this.par = extend(par, options, true);
		this.hasDom = false; //检查dom树中dialog的节点是否存在
		this.listeners = []; //自定义事件，用于监听插件的用户交互
		this.hasClsss = function(elements, cName) {
			return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
		}
		this.addClass = function(elements, cName) {
			if(!this.hasClsss(elements, cName)) {
				elements.className += " " + cName;
			};
		};
		this.removeClass = function(elements, cName) {
			if(this.hasClsss(elements, cName)) {
				elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换
			};
		};
		
		this.handlers = {};
		this.show(this.par);
	},
	show: function(callback) {
		var _this = this;
		var mobile_flag = _this.isMobile();
		var f = 0;
		var sysmask, sysbox, syscontent, systitle, sysmove, systitname, sysoper, sysclose, sysmagnify, sysshrink;
		if(!f) {
			var w = callback.width,
				h = callback.height,
				m = callback.mode,
				tm = callback.tm,
				title = callback.title,
				c = callback.content,
				Lock = callback.lock,
				mask = callback.mask,
				btn = callback.btn,
				events = callback.ieventmask,
				time = callback.time;
			if(this.hasDom) return;
			sysbox = BOXLAYER$('div');
			sysbox.id = 'sysbox';
			_this.addClass(sysbox, 'sys-box');
			syscontent = BOXLAYER$('div');
			syscontent.id = 'syscontent';
			document.body.appendChild(sysbox);
			systitle = BOXLAYER$('div');
			systitle.id = 'systitle';
			if(mask) {
				sysmask = BOXLAYER$('div');
				sysmask.id = 'sysmask';
				document.body.appendChild(sysmask);
			}
			systitname = BOXLAYER$('span');
			_this.addClass(systitname, 'sys-title-name');
			sysoper = BOXLAYER$('span')
			_this.addClass(sysoper, 'sys-oper-box');
			sysshrink=BOXLAYER$('a');
			_this.addClass(sysshrink, 'sys-sysnarrow-oper sys-oper');
			var atr=document.createAttribute("data-name");
			atr.nodeValue="narrow";
			sysoper.appendChild(sysshrink).setAttributeNode(atr);
			sysmagnify = BOXLAYER$('a');
			_this.addClass(sysmagnify, 'sys-magnify-oper sys-oper');
			sysclose = BOXLAYER$('a');
			_this.addClass(sysclose, 'sys-close-oper sys-oper');
			_this.addClass(sysbox.appendChild(systitle), 'sys-title');
			systitle.appendChild(systitname).innerHTML = title;
			systitle.appendChild(sysoper);
			var atr=document.createAttribute("data-name");
			atr.nodeValue="magnify";
			sysoper.appendChild(sysmagnify).setAttributeNode(atr);
			_this.addClass(sysbox.appendChild(syscontent), 'sys-content');
			sysoper.appendChild(sysshrink).href = 'javascript:;';
			sysoper.appendChild(sysmagnify).href = 'javascript:;';
			sysoper.appendChild(sysclose).href = "javascript:;";
			sysoper.appendChild(sysclose).onclick = function() {
				_this.hide()
			};
			sysmagnify.onclick = function() {
				var dataname = sysmagnify.getAttribute("data-name");
				if(dataname == "magnify") {
					_this.size(sysbox, null, null, dataname);
				} else if(dataname == "shrink") {
					_this.size(sysbox, w, h, dataname);
				}
			};
			sysshrink.onclick=function(){
				var dataname = sysshrink.getAttribute("data-name");
				if(dataname == "narrow") {
					_this.size(sysbox, 150, null, dataname);
				} else if(dataname == "revert") {
					_this.size(sysbox, w, h, dataname);
				}
				
			};
			events ? sysmask.onclick = function() {
				_this.hide()
			} : '';
			title == null ? systitle.parentNode.removeChild(systitle) : "";
			systitle.onmousedown = function() {
				_this.dollybox(sysbox, systitle);
			}
			mobile_flag ? _this.addClass(sysbox, 'mobileStyle') : _this.removeClass(sysbox, 'mobileStyle');
			window.onresize = function() {
				_this.resize(sysbox, _this);
			}
		}
		if(!m && !tm) {
			sysbox.style.width = w ? w + 'px' : 'auto';
			sysbox.style.height = h ? h + 'px' : 'auto';
			sysbox.style.backgroundImage = 'none';
			syscontent.innerHTML = c;
		} else {
			syscontent.style.display = 'none';
			sysbox.style.cssText = 'width:200px;height:200px';
		}
		_this.mask(mask, sysmask);
		_this.alpha(sysbox, 1, 100, Lock, sysbox, 3);
		if(time != null) {
			setTimeout(function() {
				_this.hide();
			}, 1000 * time);
		};
		this.structure = {
			sysmask: sysmask,
			sysbox: sysbox,
			syscontent: syscontent,
			systitle: systitle,
			sysmove: sysmove,
			systitname: systitname,
			sysoper: sysoper,
			sysclose: sysclose,
			sysmagnify: sysmagnify,
			sysshrink: sysshrink
		};
		//是否显示按钮
		Lock ? _this.btnoper(btn, this.structure) : '';
		sysmove = BOXLAYER$('div');
		sysmove.id = 'sys-move-event';
		sysbox.appendChild(sysmove);
		sysbox.onmouseover = function() {
			_this.windowsize(event, w, h, sysmove);
		};
	},
	isMobile: function(mobile_flag) {
		var userAgentInfo = navigator.userAgent;
		var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
		var mobile_flag = false;
		//根据userAgent判断是否是手机
		for(var v = 0; v < mobileAgents.length; v++) {
			if(userAgentInfo.indexOf(mobileAgents[v]) > 0) {
				mobile_flag = true;
				break;
			}
		}
		var screen_width = window.screen.width;
		var screen_height = window.screen.height;
		//根据屏幕分辨率判断是否是手机
		if(screen_width < 500 && screen_height < 800) {
			mobile_flag = true;
		}
		return mobile_flag;
	},
	fill: function(content, mode, w, h, a, title, Lock, sysbox, titname) {
		var _this = this;
		if(mode) {
			sysbox.style.backgroundColor = '#ffffff';
			var x = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			x.onreadystatechange = function() {
				if(x.readyState == 4 && x.status == 200) {
					_this.psh(x.responseText, w, h, a, title, Lock, sysbox);
					_this.par.callback(_this);	
				}
			};
			x.open('GET', content, 1);
			x.send(null)
		} else {
			this.psh(content, w, h, a, title, Lock, sysbox);
			_this.par.callback(_this);	
		}
		if(title != null) {
			if(a == 1 && mode != 1) {
				var magnify = _this.structure.sysmagnify;
				magnify.parentNode.removeChild(magnify);
			}
			var titm =_this.structure.systitname;
			titname.appendChild(titm).innerHTML = title;
		}
	},
	psh: function(content, w, h, a, title, Lock, sysbox) {
		var _this = this;
		var btnh = 0;
		var heah = 0;
		if(a) {
			var b = _this.structure.syscontent;
			if(!w || !h) {
				var x = sysbox.style.width,
					y = sysbox.style.height;
				b.innerHTML = content;
				sysbox.style.width = w ? w + 'px' : '';
				sysbox.style.height = h ? h + 'px' : '';
				b.style.display = '';
				BOX$('sys-btn-operate') ? btnh = BOX$('sys-btn-operate').offsetHeight : btnh = 0;
				_this.par.title ? heah = _this.structure.systitle.offsetHeight : heah = 0;
				w = parseInt(b.offsetWidth);
				h = parseInt(b.offsetHeight) + btnh + heah;
				b.style.display = 'none';
				sysbox.style.width = x;
				sysbox.style.height = y;
			} else {
				b.innerHTML = content;
			}
			_this.size(sysbox, w, h);
		} else {
			sysbox.style.backgroundImage = 'none';
			_this.addClass(sysbox, 'Prompt');
		}
	},
	//显示按钮操作
	btnoper: function(btnname, muster) {
		var _this = this;
		var arr = [];
		var btnlayer = BOXLAYER$('div');
		btnlayer.id = "sys-btn-operate";
		_this.addClass(muster.sysbox.appendChild(btnlayer), 'sys-btn-operate');
		for(var i = 0; i < btnname.length; i++) {
			var obj = {
				id: i,
				name: btnname[i]
			};
			var operate = BOXLAYER$('button');
			_this.addClass(btnlayer.appendChild(operate), 'sys-btnstyle-operate');
			btnlayer.appendChild(operate).innerHTML = btnname[i];
			arr.push(obj); //添加数组
			for(var b = 0; b < arr.length; b++) {
				if(arr[b].id == 0) {
					operate.id = "sys-btn-event";
				} else if(arr[b].id == 1) {
					operate.id = "sys-btn-close";
				}else if(arr[b].id >=2){
					operate.id='sys-btn-extend'+i
				}
			}
			if(btnname.length == 1) {
				operate.style.cssText = "width:100%";
			} else if(btnname.length == 2) {
				operate.style.cssText = "width:50%";
			}
		};
		//按钮事件处理
		var events = BOX$('sys-btn-event');
		var close = BOX$('sys-btn-close');
		if(events) {
			BOX$('sys-btn-event').onclick = function(event) {
				_this.par.confirm(_this);
			};
		}
		if(close) {
			BOX$('sys-btn-close').onclick = function() {
				_this.par.close(_this);
			};
		}
	},
	//窗口发生改变时处理该事件
	resize: function(e, obj) {
		var mobile_flag = obj.isMobile();
		mobile_flag ? obj.addClass(sysbox, 'mobileStyle') : obj.removeClass(sysbox, 'mobileStyle');
		obj.pos(e, obj);
		var w = e.offsetWidth;
		var h = e.offsetHeight;
		obj.size(e, w, h);
	},
	hide: function() {
		var _this = this;
		var box = _this.structure.sysbox;
		var mask = _this.structure.sysmask;
		var Lock = _this.par.lock;
		box.parentNode.removeChild(box);
		mask ? mask.parentNode.removeChild(mask) : '';
		_this.alpha(box, -1, 0, Lock, box, 3);
	},
	pos: function(e, obj) {
		var t = (obj.height() / 2) - (e.offsetHeight / 2);
		t = t < 10 ? 10 : t;
		e.style.top = (t + obj.top()) + 'px';
		e.style.left = (obj.width() / 2) - (e.offsetWidth / 2) + 'px';
	},
	alpha: function(e, d, a, Lock, sysbox) {
		var _this = this;
		clearInterval(e.ai);
		if(d == 1) {
			e.style.opacity = 0;
			e.style.filter = 'alpha(opacity=0)';
			e.style.display = 'block';
			_this.pos(e, _this)
		}
		e.ai = setInterval(function() {
			_this.ta(e, d, a, Lock, sysbox, _this);
		}, 20)
	},
	ta: function(e, d, a, Lock, sysbox, obj) {
		var o = Math.round(e.style.opacity * 100);
		var mask = obj.structure.sysmask,
			c = obj.structure.syscontent,
			titname = obj.structure.systitle,
			w = obj.par.width,
			h = obj.par.height,
			mode = obj.par.mode,
			tm = obj.par.tm,
			title = obj.par.title,
			content = obj.par.content,
			Lock = obj.par.lock;
		if(o == a) {
			var boxs = "";
			boxs == obj.alpha(sysbox, -1, 0, Lock, sysbox, 2);
			clearInterval(e.ai);
			if(d == -1) {
				e.style.display = 'none';
				e == sysbox ? boxs : c.innerHTML = sysbox.style.backgroundColor = '';
			} else {
				var a = obj.par.tm; //提示状态
				e == mask ? this.alpha(sysbox, 1, 100, Lock, sysbox) : obj.fill(content, mode, w, h, a, title, Lock, sysbox, titname)
			}
		} else {
			var n = Math.ceil((o + ((a - o) * .5)));
			n = n == 1 ? 0 : n;
			e.style.opacity = n / 100;
			e.style.filter = 'alpha(opacity=' + n + ')'
		}
	},
	size: function(e, w, h, s) {
		var _this = this;
		var atr=document.createAttribute("data-name");
		var magnify = _this.structure.sysmagnify;
		var restore=_this.structure.sysshrink;
		e = typeof e == 'object' ? e : BOX$(e);
		clearInterval(e.si);
		if(s == "shrink") {
			atr.nodeValue="magnify";
			magnify.setAttributeNode(atr);
			_this.removeClass(magnify, 'sys-shrink-oper sys-oper');
			_this.addClass(magnify, 'sys-magnify-oper sys-oper');
		} else if(s == "magnify") {
			atr.nodeValue="shrink";
			magnify.setAttributeNode(atr);
			_this.removeClass(magnify, 'sys-magnify-oper sys-oper');
			_this.addClass(magnify, 'sys-shrink-oper sys-oper');
			
			var narrow=document.createAttribute("data-name");
			narrow.nodeValue="narrow";
			restore.setAttributeNode(narrow);
			_this.removeClass(restore, 'sys-narrow-oper sys-oper');
			_this.addClass(restore, 'sys-sysnarrow-oper sys-oper');
		}
		if(s == "narrow"){
			atr.nodeValue="revert";
			restore.setAttributeNode(atr);
			h=BOX$('systitle').offsetHeight;
			_this.removeClass(restore, 'sys-sysnarrow-oper sys-oper');
			_this.addClass(restore, 'sys-narrow-oper sys-oper');
			e.style.cssText+='overflow: hidden';
		}else if(s == "revert"){
			atr.nodeValue="narrow";
			restore.setAttributeNode(atr);
			_this.removeClass(restore, 'sys-narrow-oper sys-oper');
			_this.addClass(restore, 'sys-sysnarrow-oper sys-oper');
		}
		var ow = e.offsetWidth,
			oh = e.offsetHeight,
			wo = ow - parseInt(e.style.width),
			ho = oh - parseInt(e.style.height);
		var wd = ow - wo > w ? 0 : 1,
			hd = (oh - ho > h) ? 0 : 1;
		if(s) {
			_this.ts(e, w, wo, wd, h, ho, hd);
		} else {
			e.si = setInterval(function() {
				_this.ts(e, w, wo, wd, h, ho, hd)
			}, 20);
		}
	},
	ts: function(e, w, wo, wd, h, ho, hd) {
		var _this = this;
		var hh = 0;
		var mobile_flag = _this.isMobile(mobile_flag);
		var b = _this.structure.syscontent;
		var box = _this.structure.sysbox;
		var name = _this.par.lock;
		_this.par.title != null ? hh = _this.structure.systitle.offsetHeight : hh;
		var ow = e.offsetWidth - wo,
			oh = e.offsetHeight - ho;
		if(w != null && h != null) {
			if(ow == w && oh == h) {
				clearInterval(e.si);
				box.style.backgroundImage = 'none';
				b.style.display = 'block';
				if(mobile_flag) {
					e.style.width = wd ? Math.ceil('90') + '%' : Math.floor('90') + '%';
					e.style.height = hd ? Math.ceil("90") + '%' : Math.floor("90") + '%';
					box.style.top = (_this.height() / 2) - (box.offsetHeight / 2) + 'px';
					box.style.left = (_this.width() / 2) - (box.offsetWidth / 2) + 'px';
					_this.contentheight(b, name, box, hh);
				}
			} else {
				if(!mobile_flag) {
					if(ow != w) {
						e.style.width = wd ? Math.ceil(w) + 'px' : Math.floor(w) + 'px'
					}
					if(oh != h) {
						e.style.height = hd ? Math.ceil(h) + 'px' : Math.floor(h) + 'px';
					}
				} else {
					if(ow != w) {
						if(_this.par.title != null) {
							e.style.width = wd ? Math.ceil('90') + '%' : Math.floor('90') + '%'
						} else {
							var n = ow + ((w - ow) * .5);
							e.style.width = wd ? Math.ceil(n) + 'px' : Math.floor(n) + 'px';
						}
					}
					if(oh != h) {
						if(_this.par.title != null) {
							e.style.height = hd ? Math.ceil("90") + '%' : Math.floor("90") + '%';
						} else {
							var n = ow + ((h - ow) * .5);
							e.style.height = wd ? Math.ceil(n) + 'px' : Math.floor(n) + 'px';
						}
					}
				}
				_this.contentheight(b, name, box, hh);
				_this.pos(e, _this);
			}
		} else {
			if(ow != w) {
				var n = e.style.width = 100 + '%';
			}
			if(oh != h) {
				var h = e.style.height = 100 + '%';
				_this.contentheight(b, name, box, hh);
			}
			box.style.top = '0px';
			box.style.left = '0px';
			return false;
		}
	},
	//处理btn层的关系
	contentheight: function(b, e, box, hh) {
		var _this = this;
		var btnh = 0;
		var boxh = box.offsetHeight;
		if(e) {
			BOX$('sys-btn-operate') ? btnh = BOX$('sys-btn-operate').offsetHeight : '';
			b.style.cssText = "height:" + (boxh - hh - btnh) + "px;position: relative;overflow: auto;";
		} else {
			b.style.cssText = "height:" + (boxh - hh) + "px;position: relative;overflow: auto;";
		}
	},
	mask: function(sysmask, m) {
		var _this = this;
		if(sysmask) {
			m.style.height = _this.total(1) + 'px';
			m.style.width = '';
			m.style.width = _this.total(0) + 'px';
		}
	},
	dollybox: function(p, obj) {
		var disX = 0,
			disY = 0;
		obj.style.cursor = "move";
		var event = event || window.event;
		disX = event.clientX - p.offsetLeft;
		disY = event.clientY - p.offsetTop;
		document.onmousemove = function(event) {
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - p.offsetWidth;
			var maxT = document.documentElement.clientHeight - p.offsetHeight;
			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);
			iL >= maxL && (iL = maxL);
			iT >= maxT && (iT = maxT);
			p.style.left = iL + "px";
			p.style.top = iT + "px";
			return false
		};
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	},
	//改变窗口大小方法
	windowsize: function(event, w, h, rs) {
		var _this = this;
		var p = _this.structure.sysbox,
			b = _this.structure.syscontent;
		var dragMinWidth = 400; //默认最宽度
		var dragMinHeight = 400; //默认最小高度
		p.onmousemove = function(event) { //鼠标移动事件
			var event = event || window.event;
			var isLeft = false,
				isTop = false,
				lockX = false,
				lockY = false;
			var mouseX = event.clientX - p.offsetLeft; //鼠标x位置
			var mouseY = event.clientY - p.offsetTop; //鼠标y位置 
			var iParentWidth = p.offsetWidth;
			if(mouseX >= iParentWidth - 10) { //当鼠标移动指定位置时处理事件
				rs.style.cursor = "nw-resize"; //改变鼠标指针的形态
				rs.onmousedown = function(event) { //鼠标点击事件
					var event = event || window.event;
					var disX = event.clientX - rs.offsetLeft;
					var disY = event.clientY - rs.offsetTop;
					var iParentTop = p.offsetTop; //当前窗体的距离顶部的距离
					var iParentLeft = p.offsetLeft; //当前窗体的距离左侧的距离
					document.onmousemove = function(event) { //鼠标移动事件
						var event = event || window.event;
						var iL = event.clientX - disX; //
						var iT = event.clientY - disY; //
						var maxW = document.documentElement.clientWidth - p.offsetLeft - 2;
						var maxH = document.documentElement.clientHeight - p.offsetTop - 2;
						var iW = isLeft ? w - iL : rs.offsetWidth + iL;
						var iH = isTop ? h - iT : rs.offsetHeight + iT;
						isLeft && (p.style.left = iParentLeft + mouseX + "px");
						isTop && (p.style.top = iParentTop + mouseY + "px");
						iW < dragMinWidth && (iW = dragMinWidth);
						iW > maxW && (iW = maxW);
						lockX || (p.style.width = iW + "px");
						iH < dragMinHeight && (iH = dragMinHeight);
						iH > maxH && (iH = maxH);
						p.style.height = iH + "px";
						var hh = BOX$('systitle').offsetHeight;
						b.style.cssText = "height:" + (iH - hh) + "px;position: relative;overflow: auto;";
						if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
						return false;
					}
					document.onmouseup = function() {
						document.onmousemove = null;
						document.onmouseup = null;
					};
				}
			} else {
				this.style.cursor = "auto";
			}
		}
	},
	total: function(d) {
		var b = document.body,
			e = document.documentElement;
		return d ? Math.max(Math.max(b.scrollHeight, e.scrollHeight), Math.max(b.clientHeight, e.clientHeight)) : Math.max(Math.max(b.scrollWidth, e.scrollWidth), Math.max(b.clientWidth, e.clientWidth))
	},
	top: function() {
		return document.documentElement.scrollTop || document.body.scrollTop
	},
	width: function() {
		return self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	},
	height: function() {
		return self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	}
};
// 最后将插件对象暴露给全局对象
_global = (function() {
	return this || (0, eval)('this');
}());
if(typeof module !== "undefined" && module.exports) {
	module.exports = Mysysbox;
} else if(typeof define === "function" && define.amd) {
	define(function() {
		return Mysysbox;
	});
} else {
	!('Mysysbox' in _global) && (_global.Mysysbox = Mysysbox);
}