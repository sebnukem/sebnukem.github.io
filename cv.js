$(document).ready(function(){

var SEB_COLORCYCLER = (function(){
var original_color = jQuery.Color("#4fadd0"),
	cycle = false,
	period = 120000,
	reset_speed = 1000,
	check_speed = 8000;
/*function checkcolor() {
    var c = jQuery.Color($("header"), "background-color"),
        hc = c.toHexString(false);
    $("#header").css("box-shadow", "0 2px 4px "+hc);
    $("#summary").css("box-shadow", "0 2px 4px "+hc);
    if (cycle) setTimeout(checkcolor, check_speed);
}*/
function randomcolor() {
    var rh = Math.random() * 359,
        rs = Math.random() / 2.0 + 0.1,
        c = jQuery.Color({ hue: rh, saturation: rs, lightness: 0.7, alpha: 1.0 });
    return c;
}
function animate(tocolor, speed) {
    if (!cycle && typeof tocolor === "undefined") tocolor = co;
    var c = typeof tocolor !== "undefined" ? tocolor : randomcolor(),
		c2 = c.lightness("+=0.1");
    if (typeof speed === "undefined") speed = period;
    console.log("new color "+c+" hue "+c.hue().toFixed(0)+" sat "+c.saturation().toFixed(2)+ ", light "+c2);
    $("#header").animate({backgroundColor: c}, speed, function () { if (cycle) animate(); });
    $("h3").animate({color: c}, speed);
    $("#summary").animate({backgroundColor: c2}, speed);
//  setTimeout(checkcolor, check_speed);
}
function start() {
    if (cycle) return;
    console.log("start color cycling");
    cycle = true;
    animate();
}
function stop() {
    if (!cycle) return;
    console.log("stop color cycling");
    cycle = false;
    $("#header").stop(true);
    $("#summary").stop(true);
    $("h3").stop(true);
}
function toggle() {
    if (cycle) stop(); else start();
}
function reset() {
    stop();
    console.log("reset to default color");
    animate(original_color, reset_speed);
}
$(".seb_anicol").click(toggle);
$(".seb_anicol").dblclick(reset);
return {
    start: start
};
})();

(function(){
	var t='.net', d='eseb'+t, u='seb', s='<a href=\"mailto:'+u+'@'+d+'\">'+u+'@'+d+'</a>';
	document.getElementById('email').innerHTML = s;
	document.getElementById('email').title="mailto: "+u+"@"+d;
})();

$("article a").click(function(e) {
   e.stopPropagation();
});

function toggle_article(article$, expand) {
	var is_brief = article$.hasClass('brief');
	var do_open = typeof expand === 'undefined' ? is_brief : expand;
	if (do_open) {
		article$.removeClass('brief').addClass('long');
		console.log('long story');
	} else {
		article$.removeClass('long').addClass('brief');
		console.log('short story');
	}
}
function toggle_all(expand) {
	if (expand) {
		console.log('expand all');
		$('#articles-triggers').removeClass('brief').addClass('long');
	} else {
		console.log('collapse all');
		$('#articles-triggers').removeClass('long').addClass('brief');
	}
	$('article').each(function () { toggle_article($(this), expand); });
}
$('article').on("click", function (e) { toggle_article($(this)); });
$('#articles-trigger-expand').click(function () { toggle_all(true); });
$('#articles-trigger-collapse').click(function () { toggle_all(false); });
//toggle_all(false); // all brief at load

SEB_COLORCYCLER.start();
});

function smouseover(name) {
  var e = document.getElementById(name);
  if (!e) return;
  e.style.display = 'block';
}
function smouseout(name) {
  var e = document.getElementById(name);
  if (!e) return;
  e.style.display = 'none';
}

