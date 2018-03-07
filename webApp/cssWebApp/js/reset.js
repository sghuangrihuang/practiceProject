/**
 * Created by LuTing on 2017/10/11.
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 50 * (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, function() {
        clearTimeout(tid);
        tid = setTimeout(recalc, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(recalc, 300);
        }
    }, false);
    doc.addEventListener('DOMContentLoaded', function () {
        tid = setTimeout(recalc, 0);
    }, false);
    recalc();
})(document, window);