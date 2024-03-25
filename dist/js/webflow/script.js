const runInViewChecker=()=>{const e=[...document.querySelectorAll('[data-scroll-inview="true"], [data-inview-target]:not([data-inview-target=""])')].reduce(((e,t)=>{const r=t.getAttribute("data-inview-threshold")||"0";return(e[r]=e[r]||[]).push(t),e}),{});Object.entries(e).forEach((([e,t])=>{const r=new IntersectionObserver((e=>{e.forEach((e=>{const t=document.querySelectorAll(e.target.getAttribute("data-inview-target"))||[],r=e.isIntersecting,a=e.boundingClientRect.y<=0&&!r;[e.target,...t].forEach((e=>{e.setAttribute("data-scroll-passed",a),e.setAttribute("data-scroll-is-inview",r)}))}))}),{root:null,rootMargin:"0px",threshold:parseFloat(e)});t.forEach((e=>r.observe(e)))}))},dualRangeSlider=(e,t,r,a,l)=>{let n=r,o=a;document.querySelectorAll(".dual-range-slider-wrapper").forEach((r=>{const a=r.querySelector(".from-slider"),s=r.querySelector(".to-slider"),i=r.querySelector(".from-input"),c=r.querySelector(".to-input"),d=(e,t,r)=>Math.min(Math.max(e,t),r),u=()=>{a.value=i.value=n,s.value=c.value=o,(()=>{const r=(n-e)/(t-e)*100,a=(o-e)/(t-e)*100;i.style.width=`${n.length}ch`,c.style.width=`${o.length}ch`,s.style.setProperty("--leftPercent",`${r}%`),s.style.setProperty("--rightPercent",`${a}%`),s.style.borderLeftColor=0==r?"var(--vs-black)":"var(--light-grey)",s.style.borderRightColor=100==a?"var(--vs-black)":"var(--light-grey)"})(),l&&l(n,o)},p=r=>{const l="range"==r.target.type;n=d(l?a.value:i.value,e,o),o=d(l?s.value:c.value,n,t),u()},g=r=>{const a=r.target;a.value=d(a.value,e,t),a.style.width=`${a.value.length}ch`};[a,s,i,c].forEach((r=>{r.min=e,r.max=t,r.step=1,"range"==r.type?r.addEventListener("input",p):(r.addEventListener("change",p),r.addEventListener("input",g))})),u()}))},allFilterDdToggle=()=>{document.querySelectorAll(".all-filter-dd-toggle").forEach((e=>{e.addEventListener("click",(function(){const e=this.nextElementSibling;if(e.classList.contains("all-filter-dd-list-wrapper")){const t="true"===e.getAttribute("data-visibility-one");e.setAttribute("data-visibility-one",!t)}}))})),document.querySelectorAll(".all-filter-dd-list-close-2, .all-filter-dd-list-close-1").forEach((e=>{e.addEventListener("click",(function(){!function(e){const t=e.closest(".all-filter-dd-list-wrapper");t&&t.setAttribute("data-visibility-one","false")}(this)}))}))},dropDowns=()=>{document.addEventListener("click",(e=>{const t=e.target.closest(".dropdown-toggle-wrapper"),r=e.target.closest(".dropdown-content-container");document.querySelectorAll(".dropdown-wrapper").forEach((e=>{t&&t.closest(".dropdown-wrapper")===e?e.dataset.ddOpen="true"===e.dataset.ddOpen?"false":"true":r||(e.dataset.ddOpen="false")}))}))},cardSlider=()=>{document.querySelectorAll(".card-btn-quickview").forEach((e=>e.addEventListener("click",(()=>{const t=e.parentElement;t.style.setProperty("--attrslide","3"===getComputedStyle(t).getPropertyValue("--attrslide").trim()?"0":"3")}))))},readMoreToggle=()=>{document.querySelectorAll("[data-read-more-is-closed='true'], [data-read-more-is-closed='false']").forEach((e=>e.addEventListener("click",(t=>{const{bottom:r}=e.getBoundingClientRect(),a=r-2*parseFloat(getComputedStyle(e).fontSize);t.clientY>=a&&t.clientY<=r&&(e.dataset.readMoreIsClosed="false"===e.dataset.readMoreIsClosed?"true":"false")}))))},stAttrToggle=()=>{document.querySelectorAll(".trucksingle-attr-category-title-wrapper").forEach((e=>e.addEventListener("click",(()=>{document.querySelectorAll(".trucksingle-attr-category-title-wrapper").forEach((e=>e.parentElement.setAttribute("data-is-fr-one","false")));const t=e.parentElement,r="true"!==t.getAttribute("data-is-fr-one");t.setAttribute("data-is-fr-one",r)}))))},buyingFormStep=()=>{const e=document.querySelector(".bf-wrapper");if(!e)return;const t=e.querySelector(".bf-modal-price"),r=e.querySelector(".bg-modal-price-unit"),a=e.querySelectorAll(".bg-buying-option-slot .bf-modal-finance-option"),l=e.querySelector(".bf-leasing-popup-wrapper"),n=l.querySelector(".bf-modal-submit-btn");e.querySelectorAll(".bf-modal-close-btn, .bf-emptyspace").forEach((t=>{t.addEventListener("click",(t=>{e.setAttribute("data-step","0"),setTimeout((()=>e.setAttribute("data-step","-1")),700)}))})),e.querySelector(".bf-modal-submit-btn").addEventListener("click",(t=>{const r=Math.min(3,parseInt(e.getAttribute("data-step"))+1);e.setAttribute("data-step",r)})),e.querySelector(".bf-modal-back-btn").addEventListener("click",(t=>{let r=parseInt(e.getAttribute("data-step"))-1;e.setAttribute("data-step",r),0===r&&setTimeout((()=>e.setAttribute("data-step","-1")),700)})),a.forEach(((e,n)=>{e.addEventListener("click",(()=>{a.forEach(((e,t)=>{e.setAttribute("data-is-one",t===n?"true":"false")})),n===a.length-1?(l.setAttribute("leasing-setting-open","true"),t.textContent="8.528",r.textContent="sek/mån"):l.removeAttribute("leasing-setting-open"),t.textContent=0===n?"84.000":1===n?"10.004":"8.528",r.textContent=0===n?"mån":"sek/mån"}))})),n.addEventListener("click",(()=>{"true"===l.getAttribute("leasing-setting-open")&&l.setAttribute("leasing-setting-open","false")}));const o=document.querySelector(".trucksingle-buy-btn");o&&o.addEventListener("click",(t=>{e.setAttribute("data-step","0"),setTimeout((()=>e.setAttribute("data-step","1")),10)}))},truckSingelImagesScroll=()=>{const e=document.querySelector(".trucksingle-imgs-list-wrapper");if(!e)return;const t=e.querySelector(".trucksingel-imgs-list-container");if(!t)return;const r=t.clientWidth,a=parseFloat(window.getComputedStyle(t).getPropertyValue("grid-column-gap"));elements=document.querySelectorAll(".trucksingel-imgs-pagination-nr-wrapper"),elements.forEach(((t,l)=>{t.addEventListener("click",(()=>{elements.forEach((e=>{e.dataset.isOne=e===t}));const n=e.scrollLeft,o=(r+a)*l,s=performance.now(),i=t=>{const r=t-s,a=Math.min(r/600,1),l=(c=a,1-Math.pow(1-c,3));var c;const d=n+(o-n)*l;e.scrollLeft=d,a<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}))}))},locations=()=>{const e=document.querySelectorAll(".locationitem-wrapper");e&&e.forEach((e=>{e.querySelector(".head-arrow-title-wrapper").addEventListener("click",(()=>{e.dataset.step="0"===e.dataset.step?1:0})),e.querySelector(".showstaff").addEventListener("click",(()=>{e.dataset.step=2}))}))},singelTruckFinances=()=>{const e=document.querySelector(".stf-wrapper");if(!e)return;e.querySelector(".stf-comparetable-btn").addEventListener("click",(()=>{e.dataset.showCompare=!("true"===e.dataset.showCompare)}));const t=e.querySelectorAll(".stf-item");t.forEach((e=>{e.addEventListener("click",(()=>{e.dataset.isSelected=!0,t.forEach((t=>{t!==e&&(t.dataset.isSelected=!1)}))}));const r=e.querySelector(".stf-radio");r&&r.querySelectorAll(".stf-radio-selector").forEach(((e,t)=>{e.addEventListener("click",(()=>{console.log(t)}))}))}))};document.addEventListener("DOMContentLoaded",(()=>{runInViewChecker(),dualRangeSlider(100,400,100,300),allFilterDdToggle(),dropDowns(),cardSlider(),readMoreToggle(),stAttrToggle(),buyingFormStep(),truckSingelImagesScroll(),locations(),singelTruckFinances()}));