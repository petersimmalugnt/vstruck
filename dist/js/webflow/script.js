const runInViewChecker=()=>{const e=[...document.querySelectorAll('[data-scroll-inview="true"], [data-inview-target]:not([data-inview-target=""])')].reduce(((e,t)=>{const r=t.getAttribute("data-inview-threshold")||"0";return(e[r]=e[r]||[]).push(t),e}),{});Object.entries(e).forEach((([e,t])=>{const r=new IntersectionObserver((e=>{e.forEach((e=>{const t=document.querySelectorAll(e.target.getAttribute("data-inview-target"))||[],r=e.isIntersecting,l=e.boundingClientRect.y<=0&&!r;[e.target,...t].forEach((e=>{e.setAttribute("data-scroll-passed",l),e.setAttribute("data-scroll-is-inview",r)}))}))}),{root:null,rootMargin:"0px",threshold:parseFloat(e)});t.forEach((e=>r.observe(e)))}))},dualRangeSlider=(e,t,r,l,a)=>{let o=r,n=l;document.querySelectorAll(".dual-range-slider-wrapper").forEach((r=>{const l=r.querySelector(".from-slider"),d=r.querySelector(".to-slider"),s=r.querySelector(".from-input"),i=r.querySelector(".to-input"),c=(e,t,r)=>Math.min(Math.max(e,t),r),u=()=>{l.value=s.value=o,d.value=i.value=n,(()=>{const r=(o-e)/(t-e)*100,l=(n-e)/(t-e)*100;s.style.width=`${o.length}ch`,i.style.width=`${n.length}ch`,d.style.setProperty("--leftPercent",`${r}%`),d.style.setProperty("--rightPercent",`${l}%`),d.style.borderLeftColor=0==r?"var(--vs-black)":"var(--light-grey)",d.style.borderRightColor=100==l?"var(--vs-black)":"var(--light-grey)"})(),a&&a(o,n)},g=r=>{const a="range"==r.target.type;o=c(a?l.value:s.value,e,n),n=c(a?d.value:i.value,o,t),u()},p=r=>{const l=r.target;l.value=c(l.value,e,t),l.style.width=`${l.value.length}ch`};[l,d,s,i].forEach((r=>{r.min=e,r.max=t,r.step=1,"range"==r.type?r.addEventListener("input",g):(r.addEventListener("change",g),r.addEventListener("input",p))})),u()}))},allFilterDdToggle=()=>{document.querySelectorAll(".all-filter-dd-toggle").forEach((e=>{e.addEventListener("click",(function(){const e=this.nextElementSibling;if(e.classList.contains("all-filter-dd-list-wrapper")){const t="true"===e.getAttribute("data-visibility-one");e.setAttribute("data-visibility-one",!t)}}))})),document.querySelectorAll(".all-filter-dd-list-close-2, .all-filter-dd-list-close-1").forEach((e=>{e.addEventListener("click",(function(){!function(e){const t=e.closest(".all-filter-dd-list-wrapper");t&&t.setAttribute("data-visibility-one","false")}(this)}))}))},dropDowns=()=>{document.addEventListener("click",(e=>{const t=e.target.closest(".dropdown-toggle-wrapper"),r=e.target.closest(".dropdown-content-container");document.querySelectorAll(".dropdown-wrapper").forEach((e=>{t&&t.closest(".dropdown-wrapper")===e?e.dataset.ddOpen="true"===e.dataset.ddOpen?"false":"true":r||(e.dataset.ddOpen="false")}))}))},cardSlider=()=>{document.querySelectorAll(".card-btn-quickview").forEach((e=>e.addEventListener("click",(()=>{const t=e.parentElement;t.style.setProperty("--attrslide","3"===getComputedStyle(t).getPropertyValue("--attrslide").trim()?"0":"3")}))))},readMoreToggle=()=>{document.querySelectorAll("[data-read-more-is-closed='true'], [data-read-more-is-closed='false']").forEach((e=>e.addEventListener("click",(()=>{e.dataset.readMoreIsClosed="false"===e.dataset.readMoreIsClosed?"true":"false"}))))};document.addEventListener("DOMContentLoaded",(()=>{runInViewChecker(),dualRangeSlider(100,400,100,300),allFilterDdToggle(),dropDowns(),cardSlider(),readMoreToggle()}));