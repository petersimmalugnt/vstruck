"use strict";var dualRangeSlider=require("./modules/DualRangeSlider"),inViewSticky=require("./modules/InViewSticky");document.addEventListener("DOMContentLoaded",(function(){inViewSticky(),dualRangeSlider(0,400,100,300)})),Object.defineProperty(exports,"__esModule",{value:!0}),exports.dualRangeSlider=void 0;dualRangeSlider=exports.dualRangeSlider=function(e,r,t,n,a){var o=t,i=n;document.querySelectorAll(".dual-range-slider-wrapper").forEach((function(t){var n=t.querySelector(".from-slider"),l=t.querySelector(".to-slider"),u=t.querySelector(".from-input"),c=t.querySelector(".to-input"),s=function(e,r,t){return Math.min(Math.max(e,r),t)},y=function(){var t,s;n.value=u.value=o,l.value=c.value=i,t=(o-e)/(r-e)*100,s=(i-e)/(r-e)*100,u.style.width="".concat(o.length,"ch"),c.style.width="".concat(i.length,"ch"),l.style.setProperty("--leftPercent","".concat(t,"%")),l.style.setProperty("--rightPercent","".concat(s,"%")),l.style.borderLeftColor=0==t?"var(--vs-black)":"var(--light-grey)",l.style.borderRightColor=100==s?"var(--vs-black)":"var(--light-grey)",a&&a(o,i)},d=function(t){var a="range"==t.target.type;o=s(a?n.value:u.value,e,i),i=s(a?l.value:c.value,o,r),y()},f=function(t){var n=t.target;n.value=s(n.value,e,r),n.style.width="".concat(n.value.length,"ch")};[n,l,u,c].forEach((function(t){t.min=e,t.max=r,t.step=1,"range"==t.type?t.addEventListener("input",d):(t.addEventListener("change",d),t.addEventListener("input",f))})),y()}))};function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_unsupportedIterableToArray(e,r)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o,i,l=[],u=!0,c=!1;try{if(o=(t=t.call(e)).next,0===r){if(Object(t)!==t)return;u=!1}else for(;!(u=(n=o.call(t)).done)&&(l.push(n.value),l.length!==r);u=!0);}catch(e){c=!0,a=e}finally{try{if(!u&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(c)throw a}}return l}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}Object.defineProperty(exports,"__esModule",{value:!0}),exports.inViewSticky=void 0;inViewSticky=exports.inViewSticky=function(){var e=_toConsumableArray(document.querySelectorAll('[data-scroll-inview="true"], [data-inview-target]:not([data-inview-target=""])')).reduce((function(e,r){var t=r.getAttribute("data-inview-threshold")||"0";return(e[t]=e[t]||[]).push(r),e}),{});Object.entries(e).forEach((function(e){var r=_slicedToArray(e,2),t=r[0],n=r[1],a=new IntersectionObserver((function(e){e.forEach((function(e){var r=document.querySelectorAll(e.target.getAttribute("data-inview-target"))||[],t=e.isIntersecting,n=e.boundingClientRect.y<=0&&!t;[e.target].concat(_toConsumableArray(r)).forEach((function(e){["passed","inview","notinview"].forEach((function(r){return e.classList.toggle(r,"passed"===r?n:"inview"===r?t:!t)}))}))}))}),{root:null,rootMargin:"0px",threshold:parseFloat(t)});n.forEach((function(e){return a.observe(e)}))}))};