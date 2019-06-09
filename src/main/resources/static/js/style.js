//浏览器版本过低提示
function IEtest() {
	var s = navigator.userAgent.toLowerCase();
	var BrowserInfo = {
		IsIE: /*@cc_on!@*/ false,
		IsIE9Under: /*@cc_on!@*/ false && (parseInt(s.match(/msie (\d+)/)[1], 10) <= 9),
	};
	//判断提示
	if(BrowserInfo.IsIE9Under) {
		new Mysysbox({
			ieventmask: false, //是否允许点击遮罩层关闭窗体
			mask: true, //是否允许显示遮罩层
			lock: true, //是否显示默认按钮事件
			btn: ['确认关闭', '继续'], //按钮名称
			title: "提示信息", //栏目标题(为null时不显示);
			mode: 0, //输入的内容状态(0为文本输入，1为url地址界面传入)
			tm: 1, //提示状态设置（0为提示框，1为文本内容信息）
			width: 350, //窗口宽度
			height: 200, //窗口高度
			content: '<div class="padding20 prompt-style">浏览器版本过低，请升级到最新版浏览器查看！</div>', //内容
			confirm: function(mysysbox) {
				window.opener = null;
				window.open('', '_self');
				window.close();
				mysysbox.hide(); //关闭窗体
			}, //回调处理事件
			callback: function(mysysbox) {
				mysysbox.hide(); //关闭窗体
			},
			close: function(mysysbox) {
				mysysbox.hide(); //关闭窗体
			}
		});
	} else {

	}
};
//设置一个提示框，编辑提示框，texts为提示文本 ，time为显示时间秒单位
function PromptBox(texts, time) {
	var _Method = this;
	var b = document.body.querySelector(".box_Bullet");
	if(!b) {
		var box = document.createElement("div");
		document.body.appendChild(box).className = "box_Bullet";
		var boxcss = document.querySelector(".box_Bullet");
		var winWidth = window.innerWidth;
		document.body.appendChild(box).innerHTML = texts;
		var wblank = winWidth - boxcss.offsetWidth;
		box.style.cssText = "width:" + boxcss.offsetWidth + "px" + "; left:" + (wblank / 2) + "px" + ";" +
			"margin-top:" + (-boxcss.offsetHeight / 2) + "px";
		var int = setInterval(function() {
			time--;
			endclearInterval(time, box, int);
		}, 1000);
	}
};

function endclearInterval(time, box, int) {
	time > 0 ? time-- : clearInterval(int);
	if(time == 0) {
		clearInterval(int);
		document.body.removeChild(box);
		return
	}
};
/**************************************条件筛选方法****************************/
function SelectTag(t) {
    this.child = t.child || ".default",
        this.over = t.over || "on",
        this.all = t.all || ".all",
        this.init()
}
$.extend(SelectTag.prototype, {
    init: function() {
        var t = this;
        t._bindEvent(),
            t._select()
    },
    _bindEvent: function() {
        var t = this;
        $(t.child).click(function(e) {
            e.preventDefault();
            var i = window.location.href
                , n = $(this).attr("rel")
                , r = $(this).attr("name");
            $(this).hasClass(t.over) || (window.location.href = t._changeURLPar(i, r, n))
        }),
            $(t.all).click(function(e) {
                e.preventDefault();
                var i = window.location.href
                    , n = $(this).attr("name");
                $("[name=" + n + "]").removeClass(t.over),
                    $(this).addClass(t.over),
                    window.location.href = t._delUrlPar(i, n)
            })
    },
    _delUrlPar: function(t, e) {
        var n = "";
        if (t.indexOf("?") == -1)
            return t;
        n = t.substr(t.indexOf("?") + 1);
        var r = ""
            , a = "";
        if (n.indexOf("&") != -1) {
            r = n.split("&");
            for (i in r)
                r[i].split("=")[0] != e && (a = a + r[i].split("=")[0] + "=" + r[i].split("=")[1] + "&");
            return t.substr(0, t.indexOf("?")) + "?" + a.substr(0, a.length - 1)
        }
        return r = n.split("="),
            r[0] == e ? t.substr(0, t.indexOf("?")) : t
    },
    _changeURLPar: function(t, e, i) {
        var n = this
            , r = e + "=([^&]*)"
            , a = e + "=" + i
            , s = encodeURI(n._getQueryString(e));
        return t.match(r) ? t = t.replace(s, i) : t.match("[?]") ? t + "&" + a : t + "?" + a
    },
    _getQueryString: function(t) {
        var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)","i")
            , i = window.location.search.substr(1).match(e);
        return null != i ? decodeURI(i[2]) : null
    },
    _select: function() {
        var t = this
            , e = window.location.href;
        $(t.child).each(function() {
            var i = $(this).attr("name") + "=" + $(this).attr("rel")
                , n = new RegExp(encodeURI(i),"g");
            if (n.test(e)) {
                $(this).addClass(t.over);
                var r = $(this).attr("name");
                $("[name=" + r + "]").eq(0).removeClass(t.over)
            } else
                $(this).removeClass(t.over)
        })
    }
});
/**************************************/
$(function() {
		var step= $("#myStep").step({
			animate:true,
			initStep:1,
			speed:1000
		});		
		$("#preBtn").click(function(event) {
			var yes=step.preStep();

		});
		$("#user_verify_btn").click(function(event) {
			var name = $.trim($("#user_name").val());
			var code = $.trim($("#user_verify").val());
			if ($.trim(name) == "") {
			Tip('输入用户名或手机号！');
			$("#user_name").focus();
			return;
		}
			if ($.trim(code) == "") {
			Tip('动态码未填写！');
			$("#user_verify").focus();
			return;
		}else{
			Tip('');
		}
			var yes=step.nextStep();
            return;	
		});
		$("#applyBtn").click(function(event) {		
		    var codes = $.trim($("#phone_Verification").val());
			var phone =/[1][3-9][0-9]{9,9}/;
		  var phones = $.trim($("#phone").val());
		if ($.trim(phones) == "") {
			Tip('请填写手机号码！');
			$("#phone").focus();
			return;
		}
		if(!phone.exec(phones)){
				Tip('手机输入格式不正确,请从新输入');
				$("#phones").focus();
			return;
			}
		if ($.trim(codes) == "") {
			Tip('验证码未填写！');
			$("#Verification").focus();
			return;
		}else{
			Tip('');
		}   
			var yes=step.nextStep();
			return;	
		});
		$("#submitBtn").click(function(event) {
			   var txtconfirm = $.trim($("#confirmpwd").val());
	           var txtPwd = $("#password").val();	
	          if ($.trim(txtPwd) == "") {	
	         	Tip('请输入你要设置的密码！');
		       $("#txtPwd").focus();
		      return;		
	            }
			  if($.trim(txtconfirm) == "") {
	
	         	Tip('请再次输入密码！');
		       $("#txtconfirm").focus();
		      return;	
	            }
			  if( $.trim(txtconfirm) != $.trim(txtPwd) ) {
	         	Tip('你输入的密码不匹配，请从新输入！');
		       $("#txtconfirm").focus();
		      return;
		
	            }else{
			Tip('');
		}		
			  var yes=step.nextStep();
				$(function () {  setTimeout("lazyGo();", 1000); });
                function lazyGo() {
		         var sec = $("#sec").text();
		            $("#sec").text(--sec);
		            if (sec > 0)
		         	setTimeout("lazyGo();", 1000);
		            else
			window.location.href = "article_home.html";
	}
	
			
			
		});
		$("#goBtn").click(function(event) {
			var yes=step.goStep(4);
		});	
});

(function (factory) {
    "use strict";
    if (typeof define === 'function') {
        // using CMD; register as anon module
      define.cmd&&define('jquery-step', ['jquery'], function (require, exports, moudles) {
            var $=require("jquery");
            factory($);
            return $;
        });
      define.amd&&define(['jquery'], factory);
    } else {
        // no CMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($){
  $.fn.step = function(options) { 
      var opts = $.extend({}, $.fn.step.defaults, options);
      var size=this.find(".step-header li").length;
      var barWidth=opts.initStep<size?50/(2*size)+50*(opts.initStep-1)/size : 50;
      var curPage=opts.initStep;

      this.find(".step-header").prepend("<div class=\"step-bar\"><div class=\"step-bar-active\"></div></div>");
      this.find(".step-list").eq(opts.initStep-1).show();
      if (size<opts.initStep) {
        opts.initStep=size;
      }
      if (opts.animate==false) {
        opts.speed=0;
      }
      this.find(".step-header li").each(function (i, li) {
        if (i<opts.initStep){
          $(li).addClass("step-active");
        }
        //$(li).prepend("<span>"+(i+1)+"</span>");
        $(li).append("<span>"+(i+1)+"</span>");
    });
    this.find(".step-header li").css({
      "width": 100/size+"%"
    });
    this.find(".step-header").show();
    this.find(".step-bar-active").animate({
        "width": barWidth+"%"},
        opts.speed, function() {
        
    });

      this.nextStep=function() {
        if (curPage>=size) {
          return false;
        }
        return this.goStep(curPage+1);
      }

      this.preStep=function() {
        if (curPage<=1) {
          return false;
        }
        return this.goStep(curPage-1);
      }

      this.goStep=function(page) {
        if (page ==undefined || isNaN(page) || page<0) {
          if(window.console&&window.console.error){
            console.error('the method goStep has a error,page:'+page);
          }
        return false;
        }
        curPage=page;
        this.find(".step-list").hide();
        this.find(".step-list").eq(curPage-1).show();
        this.find(".step-header li").each(function (i, li) {
          $li=$(li);
          $li.removeClass('step-active');
          if (i<page){
            $li.addClass('step-active');
            if(opts.scrollTop){
             $('html,body').animate({scrollTop:0}, 'slow');
            }
        }
      });
      barWidth=page<size?100/(2*size)+100*(page-1)/size : 100;
        this.find(".step-bar-active").animate({
          "width": barWidth+"%"},
          opts.speed, function() {
            
        });
        return true;
      }
      return this;
  };
   
  $.fn.step.defaults = {
      animate:true,
      speed:500,
    initStep:1,
    scrollTop:true
  };
})
 );  