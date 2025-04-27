"use strict";(self["webpackChunkvue_arcgis_0905"]=self["webpackChunkvue_arcgis_0905"]||[]).push([[4676],{15719:function(n,e,t){t.r(e),t.d(e,{CalciteChip:function(){return r},defineCustomElement:function(){return o}});var i=t(56105);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */const r=i.C,o=i.d},200:function(n,e,t){
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
function i(n){return"l"===n?"m":"s"}async function r(n){await(o(n)?n.componentOnReady():new Promise((n=>requestAnimationFrame((()=>n())))))}function o(n){return"function"===typeof n.componentOnReady}t.d(e,{c:function(){return r},g:function(){return i}})},40799:function(n,e,t){t.d(e,{I:function(){return y},c:function(){return k},d:function(){return h},u:function(){return d}});var i=t(85808),r=t(11347);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const o=/firefox/i.test((0,r.g)()),c=o?new WeakMap:null;function u(){const{disabled:n}=this;n||HTMLElement.prototype.click.call(this)}function a(n){const e=n.target;if(o&&!c.get(e))return;const{disabled:t}=e;t&&n.preventDefault()}const s=["mousedown","mouseup","click"];function f(n){const e=n.target;o&&!c.get(e)||e.disabled&&(n.stopImmediatePropagation(),n.preventDefault())}const l={capture:!0};function d(n){if(n.disabled)return n.el.setAttribute("aria-disabled","true"),n.el.contains(document.activeElement)&&document.activeElement.blur(),void m(n);g(n),n.el.removeAttribute("aria-disabled")}function m(n){if(n.el.click=u,o){const e=v(n),t=c.get(n.el);return t!==e&&(w(t),c.set(n.el,e)),void p(c.get(n.el))}p(n.el)}function p(n){n&&(n.addEventListener("pointerdown",a,l),s.forEach((e=>n.addEventListener(e,f,l))))}function v(n){return n.el.parentElement||n.el}function b(n){return"disabled"in n}function g(n){if(delete n.el.click,o){const e=c.get(n.el);let t=!1;if(e?.children)for(const i of e.children)if(b(i)&&i.disabled&&i!==n.el){t=!0;break}return t||w(e),void c.delete(n.el)}w(n.el)}function w(n){n&&(n.removeEventListener("pointerdown",a,l),s.forEach((e=>n.removeEventListener(e,f,l))))}function k(n){n.disabled&&o&&m(n)}function h(n){o&&g(n)}const E={container:"interaction-container"},y=({disabled:n},e)=>(0,i.h)("div",{class:E.container,inert:n},...e)},29095:function(n,e,t){t.d(e,{a:function(){return a},b:function(){return s},c:function(){return f},s:function(){return u}});var i=t(85808),r=t(11347);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const o=new WeakMap,c=new WeakMap;function u(n){c.set(n,new Promise((e=>o.set(n,e))))}function a(n){o.get(n)()}function s(n){return c.get(n)}async function f(n){if(await s(n),(0,r.i)())return(0,i.$x)(n),new Promise((n=>requestAnimationFrame((()=>n()))))}}}]);
//# sourceMappingURL=4676.8c9bf18c.js.map