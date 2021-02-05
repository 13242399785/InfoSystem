(function (doc, win) {
    var docEl = doc.documentElement,
       resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
       recalc = function () {
           var clientWidth = docEl.clientWidth;
           if (!clientWidth) return;
           if(clientWidth>=750){
                 docEl.style.fontSize = '100px';
           }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
           }
           if(window.adver){//重新获取宽度
               adver.setWidth();
           }
       };
       if (!doc.addEventListener) return;
       win.addEventListener(resizeEvt, recalc, false);
       doc.addEventListener('DOMContentLoaded', recalc, false);
       // console.log('resize');
})(document, window);