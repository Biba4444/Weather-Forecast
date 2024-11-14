(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const P=async()=>{if(window.navigator.geolocation)return new Promise((e,r)=>{navigator.geolocation.getCurrentPosition(async n=>{const{latitude:a,longitude:t}=n.coords;console.log(`Latitude: ${a}, Longitude: ${t}`);const o=`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${t}&appid=a1060c908bea315aba0920d1cd09a732`;try{const u=await(await fetch(o)).json(),{name:l}=u;console.log(`Location name: ${l}`);const p=`http://api.openweathermap.org/geo/1.0/direct?q=${l}&limit=1&appid=a1060c908bea315aba0920d1cd09a732`;console.log(`City Geo URL: ${p}`),e(p)}catch(c){console.error(`Error fetching weather data: ${c}`),r(c)}},n=>{console.error(`Geolocation error: ${n.message}`),r(n)})});throw console.error("Geolocation is not supported by this browser."),new Error("Geolocation is not supported by this browser.")};let i="",d="",h="";const T=document.querySelector("#cityInput"),x=document.querySelector("#applyCity"),s={};(async()=>{try{i=await P(),console.log(`Returned URL: ${i}`);const e=await y();g(e)}catch(e){console.error(`Error: ${e.message}`)}})();x.addEventListener("click",async e=>{e.preventDefault(),i=`http://api.openweathermap.org/geo/1.0/direct?q=${T.value.trim().toLowerCase()}&limit=1&appid=a1060c908bea315aba0920d1cd09a732`,console.log("Updated URL:",i);try{const n=await y();g(n)}catch(n){console.error("Error fetching city data:",n)}});const y=async()=>{try{const e=await fetch(i);if(!e.ok)throw new Error(`HTTP error: ${e.status}`);return e.json()}catch(e){throw new Error(e)}},g=async e=>{if(console.log("Geo Data:",e),e.length>0){N(e),d=`https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid=a1060c908bea315aba0920d1cd09a732`,console.log("Weather URL:",d),h=`https://api.openweathermap.org/data/2.5/forecast?lat=${s.lat}&lon=${s.lon}&appid=a1060c908bea315aba0920d1cd09a732`,console.log("EvrDayurl:",h);try{const r=await F();console.log("Weather Data:",r),U(r);const n=await H();console.log("EvrDayWeath:",n),W(n)}catch(r){console.error("Error fetching weather data:",r)}}else console.log("City not found"),document.querySelector("#cityName").innerHTML="City not found"},F=async()=>{try{const e=await fetch(d);if(!e.ok)throw new Error(`HTTP error: ${e.status}`);return e.json()}catch(e){throw new Error(e)}},H=async()=>{try{const e=await fetch(h);if(!e.ok)throw new Error(`HTTP error: ${e.status}`);const r=await e.json();return{...r.city,name:r.city.name,list:r.list.slice(0,17)}}catch(e){throw new Error(e)}},N=e=>{const r=document.querySelector("#cityName");e.map(({name:n,lat:a,lon:t,country:o})=>{r.textContent=`${n}, ${o}`,s.lat=a,s.lon=t})},U=e=>{const r=document.querySelector("#mainWeather"),n=document.querySelector("#weathDesc"),a=document.querySelector("#temp"),t=document.querySelector("#feelsTemp"),o=document.querySelector("#pressure"),c=document.querySelector("#weatherIcon"),u=document.querySelector("#time"),{main:l,weather:p,timezone:w}=e,{temp:f,feels_like:$,pressure:C}=l,m=new Date,b=m.getUTCHours(),E=m.getUTCMinutes(),q=(b+w/3600)%24,S=E.toString().padStart(2,"0");a.textContent=`Temperature: ${(f-273.15).toFixed(1)}°C`,t.textContent=`Feels like: ${($-273.15).toFixed(1)}°C`,o.textContent=`Pressure: ${C} hPa`,u.textContent=`${Math.floor(q).toString().padStart(2,"0")}:${S}`,p.map(({main:L,description:v,icon:D})=>{r.textContent=L,n.textContent=v,c.src=`https://openweathermap.org/img/wn/${D}@4x.png`})},W=e=>{const r=document.getElementById("data-container"),{list:n}=e,a=n.map(t=>({dt:t.dt,main:t.main,weather:t.weather}));document.querySelector(".data-block")&&document.querySelectorAll(".data-block").forEach(o=>{o.remove()}),n.forEach(t=>{const o=document.createElement("div");o.classList.add("data-block"),o.innerHTML=`
    <p>
    <img
    src="https://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png"
    >
    </p>
    <p>${new Date(t.dt*1e3).toLocaleString()}</p>
    <p><strong>Weather:</strong> ${t.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${(t.main.temp-273.15).toFixed(1)}°C</p>
      <p><strong>Pressure:</strong> ${t.main.pressure} hPa</p>
    `,r.appendChild(o)}),console.log(a)};
