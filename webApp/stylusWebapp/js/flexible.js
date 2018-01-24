var addCss = function(path){
    if(!path || path.length === 0){
        throw new Error('argument "path" is required !');
    }
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = path;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link);
};
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	// if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		// addCss('/css/k_login.css');
		var dpr, rem, scale;
		var docEl = document.documentElement;
		var fontEl = document.createElement('style');
		var metaEl = document.querySelector('meta[name="viewport"]');

		dpr = window.devicePixelRatio || 1;
		rem = docEl.clientWidth * dpr /10;
		scale = 1 / dpr;

		//设置viewport,把页面按dpr进行放大，再按 1／dpr 进行缩放，实现高清效果
		metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');

		//设置data-dpr属性，留作css hack用
		docEl.setAttribute('data-dpr', dpr);

		//在head标签动态写入style标签及其内样式
		docEl.firstElementChild.appendChild(fontEl);
		fontEl.innerHTML = 'html{font-size:' + rem + 'px!important}';

		//给js调用的，某一dpr下rem和px之间的转换函数
		window.rem2px = function(v) {
			v = parseFloat(v);
			return v * rem;
		} 

		window.dpr = dpr;
		window.rem = rem;
	// } else {
	// 	addCss('/css/k_login1.css');
	// 	return;
	// }
}
    browserRedirect();