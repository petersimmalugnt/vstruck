const runInViewChecker=()=>{const e=[...document.querySelectorAll('[data-scroll-inview="true"], [data-inview-target]:not([data-inview-target=""])')].reduce(((e,t)=>{const r=t.getAttribute("data-inview-threshold")||"0";return(e[r]=e[r]||[]).push(t),e}),{});Object.entries(e).forEach((([e,t])=>{const r=new IntersectionObserver((e=>{e.forEach((e=>{const t=document.querySelectorAll(e.target.getAttribute("data-inview-target"))||[],r=e.isIntersecting,l=e.boundingClientRect.y<=0&&!r;[e.target,...t].forEach((e=>{e.setAttribute("data-scroll-passed",l),e.setAttribute("data-scroll-is-inview",r)}))}))}),{root:null,rootMargin:"0px",threshold:parseFloat(e)});t.forEach((e=>r.observe(e)))}))},dualRangeSlider=(e,t,r,l,a)=>{let n=r,o=l;document.querySelectorAll(".dual-range-slider-wrapper").forEach((r=>{const l=r.querySelector(".from-slider"),i=r.querySelector(".to-slider"),s=r.querySelector(".from-input"),d=r.querySelector(".to-input"),c=(e,t,r)=>Math.min(Math.max(e,t),r),u=()=>{l.value=s.value=n,i.value=d.value=o,(()=>{const r=(n-e)/(t-e)*100,l=(o-e)/(t-e)*100;s.style.width=`${n.length}ch`,d.style.width=`${o.length}ch`,i.style.setProperty("--leftPercent",`${r}%`),i.style.setProperty("--rightPercent",`${l}%`),i.style.borderLeftColor=0==r?"var(--vs-black)":"var(--light-grey)",i.style.borderRightColor=100==l?"var(--vs-black)":"var(--light-grey)"})(),a&&a(n,o)},g=r=>{const a="range"==r.target.type;n=c(a?l.value:s.value,e,o),o=c(a?i.value:d.value,n,t),u()},p=r=>{const l=r.target;l.value=c(l.value,e,t),l.style.width=`${l.value.length}ch`};[l,i,s,d].forEach((r=>{r.min=e,r.max=t,r.step=1,"range"==r.type?r.addEventListener("input",g):(r.addEventListener("change",g),r.addEventListener("input",p))})),u()}))},allFilterDdToggle=()=>{document.querySelectorAll(".all-filter-dd-toggle").forEach((e=>{e.addEventListener("click",(function(){const e=this.nextElementSibling;if(e.classList.contains("all-filter-dd-list-wrapper")){const t="true"===e.getAttribute("data-visibility-one");e.setAttribute("data-visibility-one",!t)}}))})),document.querySelectorAll(".all-filter-dd-list-close-2, .all-filter-dd-list-close-1").forEach((e=>{e.addEventListener("click",(function(){!function(e){const t=e.closest(".all-filter-dd-list-wrapper");t&&t.setAttribute("data-visibility-one","false")}(this)}))}))},dropDowns=()=>{document.addEventListener("click",(e=>{const t=e.target.closest(".dropdown-toggle-wrapper"),r=e.target.closest(".dropdown-content-container");document.querySelectorAll(".dropdown-wrapper").forEach((e=>{t&&t.closest(".dropdown-wrapper")===e?e.dataset.ddOpen="true"===e.dataset.ddOpen?"false":"true":r||(e.dataset.ddOpen="false")}))}))},cardSlider=()=>{document.querySelectorAll(".card-btn-quickview").forEach((e=>e.addEventListener("click",(()=>{const t=e.parentElement;t.style.setProperty("--attrslide","3"===getComputedStyle(t).getPropertyValue("--attrslide").trim()?"0":"3")}))))},readMoreToggle=()=>{document.querySelectorAll("[data-read-more-is-closed='true'], [data-read-more-is-closed='false']").forEach((e=>e.addEventListener("click",(t=>{const{bottom:r}=e.getBoundingClientRect(),l=r-2*parseFloat(getComputedStyle(e).fontSize);t.clientY>=l&&t.clientY<=r&&(e.dataset.readMoreIsClosed="false"===e.dataset.readMoreIsClosed?"true":"false")}))))},stAttrToggle=()=>{document.querySelectorAll(".trucksingle-attr-category-title-wrapper").forEach((e=>e.addEventListener("click",(()=>{document.querySelectorAll(".trucksingle-attr-category-title-wrapper").forEach((e=>e.parentElement.setAttribute("data-is-fr-one","false")));const t=e.parentElement,r="true"!==t.getAttribute("data-is-fr-one");t.setAttribute("data-is-fr-one",r)}))))},buyingFormStep=()=>{const e=document.querySelector(".bf-wrapper"),t=e.querySelector(".bf-modal-price"),r=e.querySelector(".bg-modal-price-unit"),l=e.querySelectorAll(".bg-buying-option-slot .bf-modal-finance-option"),a=e.querySelector(".bf-leasing-popup-wrapper"),n=a.querySelector(".bf-modal-submit-btn");e.querySelector(".bf-modal-submit-btn").addEventListener("click",(t=>{const r=Math.min(3,parseInt(e.getAttribute("data-step"))+1);e.setAttribute("data-step",r)})),e.querySelector(".bf-modal-back-btn").addEventListener("click",(t=>{let r=parseInt(e.getAttribute("data-step"))-1;e.setAttribute("data-step",r)})),l.forEach(((e,n)=>{e.addEventListener("click",(()=>{l.forEach(((e,t)=>{e.setAttribute("data-is-one",t===n?"true":"false")})),n===l.length-1?(a.setAttribute("leasing-setting-open","true"),t.textContent="8.528",r.textContent="sek/mån"):a.removeAttribute("leasing-setting-open"),t.textContent=0===n?"84.000":1===n?"10.004":"8.528",r.textContent=0===n?"mån":"sek/mån"}))})),n.addEventListener("click",(()=>{"true"===a.getAttribute("leasing-setting-open")&&a.setAttribute("leasing-setting-open","false")}))};document.addEventListener("DOMContentLoaded",(()=>{runInViewChecker(),dualRangeSlider(100,400,100,300),allFilterDdToggle(),dropDowns(),cardSlider(),readMoreToggle(),stAttrToggle(),buyingFormStep()}));