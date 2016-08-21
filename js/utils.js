/**
 * Created by star on 2016/6/28.
 */
var utils = (function () {
    var flag = 'getComputedStyle' in window;

    function rnd(n, m) {
        m = Number(m);
        n = Number(n);
        if (isNaN(m) || isNaN(n)) {
            return Math.random();
        }
        if (n > m) {
            var tmp = m;
            m = n;
            n = tmp;
        }
        return Math.round(Math.random() * (m - n) + n)
    }

    function listToArray(arg) {
        var ary = [];
        try {
            return Array.prototype.slice.call(arg)
        } catch (e) {
            for (var i = 0; i < arg.length; i++) {
                ary.push(arg[i])
            }
            return ary;
        }
    }

    function jsonParse(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')')
    }

    function getByClass(strClass, curEle) {
        curEle = curEle || document;
        if (flag) {
            return this.listToArray(curEle.getElementsByClassName(strClass))
        }
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        var ary = [];
        var nodeList = curEle.getElementsByTagName('*');
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            var bOk = true;
            for (var k = 0; k < aryClass.length; k++) {
                var curClass = aryClass[k];
                var reg = new RegExp('\\b' + curClass + '\\b')
                if (!reg.test(curNode.className)) {
                    bOk = false;
                }
            }
            if (bOk) {
                bOk = true;
                ary.push(curNode);
                break;
            }
        }
        return ary;
    }

    function hasClass(curEle, cName) {
        var cName = cName.replace(/(^ +)|( +$)/g, '');
        var reg = new RegExp('\\b' + cName + '\\b');
        return reg.test(curEle.className)
    }

    function addClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (!this.hasClass(curEle, curClass)) {
                curEle.className += ' ' + curClass
            }
        }
    }

    function removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (this.hasClass(curEle, curClass)) {
                var reg = new RegExp('\\b' + curClass + '\\b');
                curEle.className = curEle.className.replace(reg, '').replace(/(^ +)|( +$)/g, '').replace(/\s+/g, ' ')
            }
        }
    }

    function getCss(curEle, attr) {
        var val, reg;
        if (flag) {
            val = getComputedStyle(curEle, false)[attr]
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle.filter;
                reg = /alpha\(opacity[=:](\d+)\)/;
                return reg.test(val) ? RegExp.$1 / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /[+-]?\d+(\.\d+)?(px|pt|rem|em)/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(curEle, attr, value) {
        if (attr === 'float') {
            curEle.style.styleFolat = value;
            curEle.style.cssFloat = value;
            return;
        }
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity:' + value * 100 + ')';
            return;
        }
        var reg = /width|height|top|right|bottom|left|(margin|padding)(top|right|bottom|left)?/;
        if (reg.test(attr)) {
            value = parseFloat(value) + 'px';
        }
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, options) {
        for (var attr in options) {
            this.setCss(curEle, attr, options[attr])
        }
    }

    function css(curEle) {
        var arg2 = arguments[1];
        if (typeof arg2 === 'string') {
            var arg3 = arguments[2];
            if (typeof arg3 === 'undefined') {
                return this.getCss(curEle, arg2)
            } else {
                this.setCss(curEle, arg2, arg3)
            }
        }
        if (arg2.toString() === '[object Object]') {
            this.setGroupCss(curEle, arg2)
        }
    }

    function win(attr, value) {
        if (typeof value === 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;

    }

    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetTop;
            t += par.offsetLeft;
            par = par.offsetParent;
        }
        return {left: l, top: t}
    }

    function getChildren(curEle) {
        if (flag) {
            return this.listToArray(curEle.children);
        }
        var aChild = curEle.childNodes;
        var ary = [];
        for (var i = 0; i < aChild.length; i++) {
            if (aChild[i].nodeType === 1) {
                ary.push(aChild[i])
            }
        }
        return ary;
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    function prevAll(curEle) {
        var pre = this.prev(curEle);
        var ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex)
        }
        return ary;
    }

    function sibling(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        if (pre) {
            ary.push(pre)
        }
        if (nex) {
            ary.push(nex)
        }
        return ary;
    }

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

    function firstChild(curEle) {
        return this.getChildren(curEle)[0]
    }

    function lastChild(curEle) {
        var aChs = this.getChildren(curEle);
        return aChs[aChs.length - 1]
    }

    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    function appendChild(parent, newEle) {
        return parent.appendChild(newEle)
    }

    function prependChild(parent, newEle) {
        var first = this.firstChild(parent);
        if (first) {
            parent.insertBefore(newEle, first);
        } else {
            parent.appendChild(newEle)
        }
    }

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle)
    }

    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex)
        } else {
            oldEle.parentNode.appendChild(newEle)
        }

    }


    return {
        rnd: rnd,
        listToArray: listToArray,
        jsonParse: jsonParse,
        getByClass: getByClass,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css,
        win: win,
        offset: offset,
        getChildren: getChildren,
        prev: prev,
        prevAll: prevAll,
        next: next,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        firstChild: firstChild,
        lastChild: lastChild,
        index: index,
        appendChild: appendChild,
        prependChild: prependChild,
        insertBefore: insertBefore,
        insertAfter: insertAfter

    }
})()
