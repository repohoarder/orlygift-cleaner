// ==UserScript==
// @name Orlygift.com Cleaner
// @namespace https://github.com/Tackyou/orlygift-cleaner
// @description A userscript to clean the orlygift website up
// @author Tackyou
// @version 1.0
// @license https://raw.githubusercontent.com/Tackyou/orlygift-cleaner/master/LICENSE
// @icon http://i.imgur.com/ukYltA1.png
// @match https://www.orlygift.com/
// @supportURL https://github.com/Tackyou/orlygift-cleaner/issues
// @updateURL https://raw.githubusercontent.com/Tackyou/orlygift-cleaner/master/orlygift.user.js
// @downloadURL https://raw.githubusercontent.com/Tackyou/orlygift-cleaner/master/orlygift.user.js
// @grant none
// ==/UserScript==

// start with injecting some new css rules
var style = document.createElement('style');
style.appendChild(document.createTextNode('.slider,.row,.countdown-container,.modal-backdrop.fade.in,.ad-container,.headline-container div p,.last_claimed,#commander-cool-banner,.thumb,div.cc_banner-wrapper{display:none}.row.headline-container.animated,.content-perspective .content-inner .row{display:block}.sweet-alert,.sweet-overlay,.content-perspective .content-inner .ng-scope + .row{display:none !important}.headline-container{padding:0}.timeline .content-inner{padding:5px}.timeline .content-inner h3{font-size:16px;margin-top:11px}.timeline .content-perspective{margin-left:30px}.event label.arrow,.event input[type="radio"]{left:-50px}.timeline:before{left:-30px}.container-fluid .container{width:800px}'));
document.head.appendChild(style);

console.log("[Userscript] OrlyCleaner is active");

// automatically accept the new TOS if required, saving you some clicks and time
if($('input#terms').length>0){
    $('form.ng-pristine input#terms').prop('checked', true);
    $('form.ng-pristine input#newsletter').prop('checked', false);
    $('form.ng-pristine div.col-xs-4 button').trigger('click');
    console.log('[Userscript] Orlygift TOS accepted');
}

// cleaning some stuff to prevent loading images in background etc.
$('.row .countdown-container').remove();
$('.last_claimed').remove();

// lets make the timer alive and reload automatically on round end
var timelem = $('div.callout.callout-info strong');
var fetchtime = timelem.text();
var mins = +(fetchtime.split(':')[0]), secs = (mins * 60 + (+(fetchtime.split(':')[1].split(' min')[0]))), currentSeconds = 0, currentMinutes = 0;
setInterval(function() {
    currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;
    if(currentSeconds <= 9) currentSeconds = '0' + currentSeconds;
    secs--;
    timelem.text(currentMinutes + ':' + currentSeconds + ' min');
    if(secs == -1){ setTimeout(function(){location.reload();}, 5000); }
}, 1000);
