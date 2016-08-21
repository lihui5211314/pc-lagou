/**
 * Created by hui on 2016/7/18.
 */
var tab = (function () {
    //ѡ�
    function select() {
        var oNav = document.getElementById('nav');
        var aLi = oNav.getElementsByTagName('li');
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].onmouseover = function () {
                aLi[this.index].className = 'select';
            };
            aLi[i].onmouseout = function () {
                if (this.index > 0) {
                    utils.removeClass(aLi[this.index], 'select');
                }
            }
        }
    }

    /*function barLeft(){
        var main=document.getElementById()
    }*/

    //搜索框
    function search() {
        var oInp1 = document.getElementById('text1');
        //var oInp2 = document.getElementById('text2');
        var oUl = document.getElementById('list');
        var inp=document.getElementById('inp');
        var market=document.getElementById('market');

        oInp1.onkeyup = oInp1.onfocus = function () {
            var val = this.value.replace(/(^ +)|( +$)/g, '');
            oUl.style.display = val.length > 0 ? 'block' : 'none';
            oInp1.setAttribute('placeholder','搜索职位、公司或地点')
        };
        oInp1.onblur=function(){
            oInp1.setAttribute('placeholder','市场推广')
        };

        document.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement;
            if (tar.tagName.toLowerCase() === 'li' && tar.parentNode.id === 'list') {
                oInp1.value = tar.innerHTML;
            }
            oUl.style.display = 'none'
        };
        oInp1.onclick = function (e) {
            e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        }

    }

    //banner
    function banner() {
        var banner = document.getElementById('banner');
        var bannerBg = banner.getElementsByTagName('bannerBg')[0];
        //var oUlBg=bannerBg.getElementsByTagName('ul')[0];
        var oUlBg = document.getElementById('oUlBg');
        var aLi = oUlBg.getElementsByTagName('li');
        //var aImg=aLi.getElementsByTagName('img');
        var bannerCon = document.getElementById('bannerCon');
        var em = bannerCon.getElementsByTagName('em')[0];
        var aLiCon = bannerCon.getElementsByTagName('li');
        var aI = bannerCon.getElementsByTagName('i');
        var step = 0;
        var zIndex = 0;

        oUlBg.innerHTML += '<li><a href="javascript:;"><img src="../images/Cgp3O1eDLc6ADc41AAGEWp5D1fg883.JPG" alt=""/></a></li>';
        oUlBg.style.height = aLi.length * aLi[0].offsetHeight + 'px';

        clearInterval(autoTimer);
        var autoTimer = setInterval(autoMove, 3000);

        function autoMove() {
            if (step >= aLi.length - 1) {
                this.index = step;
                step = 0;
                utils.css(oUlBg, 'top', -step * 160);
            }
            step++;
            if (step >= 3) {
                step = 0;
                zhufengAnimate(oUlBg, {top: 0}, 300);
                zhufengAnimate(em, {top: 0}, 300)
            }
            /*for(var i=0;i<aLi.length;i++){
                aI[i].style.display = 'block';
            }
            aI[step].style.display = 'none';*/

            zhufengAnimate(oUlBg, {top: -step * 160}, 300);
            zhufengAnimate(em, {top: step * 55}, 300);


            oUlBg.onmouseover = function () {
                clearTimeout(autoTimer);
            };
            for (var i = 0; i < aLiCon.length; i++) {
                aLiCon[i].index = i;
                aI[i].style.display='block';
                aLiCon[i].onmouseover = function () {
                    clearTimeout(autoTimer);
                    step=this.index;
                    /*for(var i = 0; i < aLiCon.length; i++){
                        aI[i].style.display = 'block';
                    }
                    aI[this.index].style.display = 'none';*/
                    zhufengAnimate(oUlBg, {top: -step * 160}, 200);
                    zhufengAnimate(em, {top: step * 55}, 200);
                };


            }

            oUlBg.onmouseout = function () {
                autoTimer = setInterval(autoMove, 3000);
            };
            for (var j = 0; j < aLiCon.length; j++) {
                aI[j].index = j;
                aLiCon[j].onmouseout = function () {
                    autoTimer = setInterval(autoMove, 3000);
                    //aI[j].style.display = 'block';
                };

            }
        }

    }

    //广告轮播
    function moveAll() {
        var bannerAd = document.getElementById('bannerAd');
        var oUl = bannerAd.getElementsByTagName('ul')[0];
        var aLi = oUl.getElementsByTagName('li');
        var aDiv = oUl.getElementsByTagName('div');
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            //console.log(aDiv[i])
            aLi[i].onmouseenter = function (e) {
                e = e || window.event;
                var q = getMousePos(this, e);
                switch (q) {
                    case 0:
                        aDiv[this.index].style.left = '113px';
                        aDiv[this.index].style.top = '0';
                        break;
                    case 1:
                        aDiv[this.index].style.left = '0';
                        aDiv[this.index].style.top = '113px';
                        break;
                    case 2:
                        aDiv[this.index].style.left = '-113px';
                        aDiv[this.index].style.top = '0';
                        break;
                    case 3:
                        aDiv[this.index].style.left = '0';
                        aDiv[this.index].style.top = '-113px';
                        break;
                }
                move(aDiv[this.index], {left: 0, top: 0})
            };


            aLi[i].onmouseleave = function (e) {
                e = e || window.event;
                var q = getMousePos(this, e);
                switch (q) {
                    case 0:
                        move(aDiv[this.index], {left: 113, top: 0});
                        break;
                    case 1:
                        move(aDiv[this.index], {left: 0, top: 113});
                        break;
                    case 2:
                        move(aDiv[this.index], {left: -113, top: 0});
                        break;
                    case 3:
                        move(aDiv[this.index], {left: 0, top: -113});
                        break;
                }
            };

        }
        function getMousePos(obj, e) {
            var w = obj.offsetWidth;
            var h = obj.offsetHeight;
            var x = obj.offsetLeft + w / 2 - e.pageX;
            var y = obj.offsetTop + h / 2 - e.pageY;
            return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4;
        }

        function move(obj, json) {
            var start = {};
            var dis = {};
            for (var name in json) {
                start[name] = parseFloat(getComputedStyle(obj, false)[name]);
                switch (name) {
                    case 'left':
                        start[name] = obj.offsetLeft;
                        break;
                    case 'top':
                        start[name] = obj.offsetTop;
                        break;
                }
                dis[name] = json[name] - start[name];
            }
            var count = Math.round(300 / (1000 / 30));
            var n = 0;
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                n++;
                for (var name in json) {
                    var a = n / count;
                    var cur = start[name] + dis[name] * a;
                    obj.style[name] = cur + 'px';
                }
                if (n == count) {
                    clearInterval(obj.timer);
                }
            }, 1000 / 30)
        }

    }

    //回到顶部
    function backTop(){
        var back=document.getElementById('back');
        var backTop=document.getElementById('backTop');
        window.onscroll=computedDisplay;
        function computedDisplay(){
            if(utils.win('scrollTop')===0){
                backTop.style.display='none';
            }else{
                backTop.style.display='block';
            }
        }

        backTop.onclick=function(){
            var target=utils.win('scrollTop'),
                duration=500,
                interval=30,
                step=target/duration*interval;
            var timer=setInterval(function(){
                var curTop=utils.win('scrollTop');
                if(curTop<=0){
                    clearInterval(timer);
                    window.onscroll=computedDisplay;
                    return;
                }
                curTop-=step;
                utils.win('scrollTop',curTop);
                backTop.className='backTop bg';
            },interval);
        };

        backTop.onmouseover=function(){
            backTop.className='backTop bg';
        };
        backTop.onmouseout=function(){
            backTop.className='backTop';
        };

            /*if(utils.win('scrollTop')<1974){
                back.style.position='fixed';
                back.style.
            }else{
                back.style.position='relative';
                back.style.right=0;
                //back.style.top=
            }*/

    }

    //展开收起
    function upOff(){
        var linkBox=document.getElementById('linkBox'),
            oUp=document.getElementById('up'),
            oOff=document.getElementById('off');

            oUp.onclick=function(){
                linkBox.style.height="248px";
                oUp.style.display='none';
                oOff.style.display='block';
                utils.win("scrollTop", utils.win('scrollHeight'));
            };
            oOff.onclick=function(){
                linkBox.style.height="31px";
                oOff.style.display='none';
                oUp.style.display='block';
            };


        }

    //footBar固定定位
    function scrollTop(){
        var footBar=document.getElementById('footBar');
        var linkBox=document.getElementById('linkBox');
        window.addEventListener('scroll',fixed,false);
        function fixed(){
            if(utils.css(linkBox,'height')<=31){
                if(utils.win('scrollTop')<1974){
                    //console.log(utils.win('scrollTop'));
                    footBar.style.position='fixed';
                    footBar.style.bottom=0;
                }else{
                    footBar.style.position='relative';
                }
            }else{
                if(utils.win('scrollTop')<2189){
                    footBar.style.position='fixed';
                    footBar.style.bottom=0;
                }else{
                    footBar.style.position = "relative";
                    //footBar.style.bottom = '132px';
                }
            }
        }
        /*չ����ҳ���ܸ߶�2919��δչ��2941*/
        linkBox.onclick=function(){
            utils.css('height',utils.win('scrollHeight'));
            footBar.style.position='relative';
        };
        if(utils.win('scrollTop')<1974){
            //console.log(utils.win('scrollTop'));
            footBar.style.position='fixed';
            footBar.style.bottom=0;
        }else{
            footBar.style.position='relative';
        }

        /*if(utils.css(linkBox,'height')>31) {
            utils.win('scrollTop', utils.win('scrollHeight'));
            footBar.style.position = 'relative';
        }else{

        }*/
         //linkBox=document.getElementById('linkBox'),

    }


    return {
        select: select,
        search: search,
        banner: banner,
        moveAll: moveAll,
        backTop:backTop,
        upOff:upOff,
        scrollTop:scrollTop
    }

})();
