import{s as B,f as r,a as v,g as d,h as k,Y as x,c as b,d as f,_ as D,j as C,i as O,r as c,x as E,u as g,y as I}from"../chunks/scheduler.e51e3a72.js";import{S as N,i as S}from"../chunks/index.70313ae9.js";import{s as V}from"../chunks/search.29e5a4b8.js";const U=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global,{document:F}=U;function $(i){let t,s,w="No File is Open",m,e,n,y="Create new file (Ctrl + J)",p,l,j="Search Files (Ctrl + O)",u,_,T;return{c(){t=r("div"),s=r("h2"),s.textContent=w,m=v(),e=r("div"),n=r("button"),n.textContent=y,p=v(),l=r("button"),l.textContent=j,u=v(),this.h()},l(a){t=d(a,"DIV",{class:!0});var o=k(t);s=d(o,"H2",{class:!0,"data-svelte-h":!0}),x(s)!=="svelte-1tb4jtj"&&(s.textContent=w),m=b(o),e=d(o,"DIV",{class:!0});var h=k(e);n=d(h,"BUTTON",{"data-svelte-h":!0}),x(n)!=="svelte-1s9jr7d"&&(n.textContent=y),p=b(h),l=d(h,"BUTTON",{"data-svelte-h":!0}),x(l)!=="svelte-jg5bek"&&(l.textContent=j),h.forEach(f),o.forEach(f),u=b(a),D("svelte-1fbok04",F.head).forEach(f),this.h()},h(){C(s,"class","font-bold"),C(e,"class","flex flex-col gap-2 items-center text-purple-400"),C(t,"class","w-full h-screen flex items-center justify-center flex-col gap-5"),F.title="Vault"},m(a,o){O(a,t,o),c(t,s),c(t,m),c(t,e),c(e,n),c(e,p),c(e,l),O(a,u,o),_||(T=[E(n,"click",q),E(l,"click",i[0])],_=!0)},p:g,i:g,o:g,d(a){a&&(f(t),f(u)),_=!1,I(T)}}}function q(){const i=document.getElementById("create-new-note-form-submit");i&&i.click()}function H(i){function t(){V.set(!0)}return[t]}class A extends N{constructor(t){super(),S(this,t,H,$,B,{})}}export{A as component};