(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const x=async()=>{if(window.navigator.geolocation)return new Promise((e,r)=>{navigator.geolocation.getCurrentPosition(async o=>{const{latitude:n,longitude:t}=o.coords,a=`https://api.openweathermap.org/data/2.5/weather?lat=${n}&lon=${t}&appid=a1060c908bea315aba0920d1cd09a732`;try{const i=await(await fetch(a)).json(),{name:l}=i,p=`https://api.openweathermap.org/geo/1.0/direct?q=${l}&limit=1&appid=a1060c908bea315aba0920d1cd09a732`;e(p)}catch(c){console.error(`Error fetching weather data: ${c}`),r(c)}},o=>{console.error(`Geolocation error: ${o.message}`),r(o)})});throw console.error("Geolocation is not supported by this browser."),new Error("Geolocation is not supported by this browser.")};let u="",h="",m="";const D=document.querySelector("#cityInput"),L=document.querySelector("#applyCity"),s={};(async()=>{try{u=await x();const e=await w();y(e)}catch(e){console.error(`Error: ${e.message}`)}})();L.addEventListener("click",async e=>{e.preventDefault(),u=`https://api.openweathermap.org/geo/1.0/direct?q=${D.value.trim().toLowerCase()}&limit=1&appid=a1060c908bea315aba0920d1cd09a732`;try{const o=await w();y(o)}catch(o){console.error("Error fetching city data:",o)}});const w=async()=>{try{const e=await fetch(u);if(!e.ok)throw new Error(`HTTP error: ${e.status}`);return e.json()}catch(e){throw new Error(e)}},y=async e=>{if(e.length>0){N(e),h=`https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid=a1060c908bea315aba0920d1cd09a732`,m=`https://api.openweathermap.org/data/2.5/forecast?lat=${s.lat}&lon=${s.lon}&appid=a1060c908bea315aba0920d1cd09a732`;try{const r=await F();M(r);const o=await H();I(o)}catch(r){console.error("Error fetching weather data:",r)}}else console.log("City not found"),document.querySelector("#cityName").innerHTML="City not found"},F=async()=>{try{const e=await fetch(h);if(!e.ok)throw new Error(`HTTP error: ${e.status}`);return e.json()}catch(e){throw new Error(e)}},H=async()=>{try{const e=await fetch(m);if(!e.ok)throw new Error(`HTTP error: ${e.status}`);const r=await e.json();return{...r.city,name:r.city.name,list:r.list.slice(0,17)}}catch(e){throw new Error(e)}},N=e=>{const r=document.querySelector("#cityName");e.map(({name:o,lat:n,lon:t,country:a})=>{r.textContent=`${o}, ${a}`,s.lat=n,s.lon=t})},M=e=>{const r=document.querySelector("#mainWeather"),o=document.querySelector("#weathDesc"),n=document.querySelector("#temp"),t=document.querySelector("#feelsTemp"),a=document.querySelector("#pressure"),c=document.querySelector("#weatherIcon"),i=document.querySelector("#time"),{main:l,weather:p,timezone:f}=e,{temp:g,feels_like:$,pressure:b}=l,d=new Date,C=d.getUTCHours(),q=d.getUTCMinutes(),E=(C+f/3600)%24,S=q.toString().padStart(2,"0");n.textContent=`Temperature: ${(g-273.15).toFixed(1)}°C`,t.textContent=`Feels like: ${($-273.15).toFixed(1)}°C`,a.textContent=`Pressure: ${b} hPa`,i.textContent=`${Math.floor(E).toString().padStart(2,"0")}:${S}`,p.map(({main:P,description:T,icon:v})=>{r.textContent=P,o.textContent=T,c.src=`https://openweathermap.org/img/wn/${v}@4x.png`})},I=e=>{const r=document.getElementById("data-container"),{list:o}=e;o.map(n=>({dt:n.dt,main:n.main,weather:n.weather})),document.querySelector(".data-block")&&document.querySelectorAll(".data-block").forEach(t=>{t.remove()}),o.forEach(n=>{const t=document.createElement("div");t.classList.add("data-block"),t.innerHTML=`
    <p>
    <img
    src="https://openweathermap.org/img/wn/${n.weather[0].icon}@2x.png"
    >
    </p>
    <p>${new Date(n.dt*1e3).toLocaleString()}</p>
    <p><strong>Weather:</strong> ${n.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${(n.main.temp-273.15).toFixed(1)}°C</p>
      <p><strong>Pressure:</strong> ${n.main.pressure} hPa</p>
    `,r.appendChild(t)})};