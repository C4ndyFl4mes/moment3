let e;const t=document.getElementById("prev-btn"),a=document.getElementById("next-btn"),l=document.getElementById("search-field"),i=document.getElementById("page-number"),n=document.getElementById("max-pages"),r=document.getElementById("anime-list");async function s(e=1){if(localStorage.getItem("page")){let e=JSON.parse(localStorage.getItem("page"));i.innerHTML=e.current,n.innerHTML=e.last}if(localStorage.getItem("animePagesofLists")){let t=JSON.parse(localStorage.getItem("animePagesofLists"));for(let a of t){if(a.page===e){g(a.list);break}t.indexOf(a)===t.length-1&&a.page!==e&&(await o(e),await s(e))}}}function g(e){r.innerHTML="",e.forEach(e=>{let t=e.title_english;null===e.title_english&&(t=e.title),r.innerHTML+=`<article class=anime-list-item>
                <h2>${t}</h2>
                <div>
                    <picture class=poster>
                        <source srcset="${e.images.webp.image_url}" type="image/webp">
                        <img src="${e.images.jpg.image_url}" width="100" height="141" alt="" loading="lazy" class=poster>
                    </picture>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Score</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#${e.rank||"N/A"}</td>
                                <td>${e.score||"N/A"}</td>
                                <td>${e.rating||"N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>Beskrivning</h3>
                    <p>${e.synopsis||"N/A"}</p>
                </div>
            </article>`})}async function o(e=1){try{let t=await fetch(`https://api.jikan.moe/v4/top/anime?page=${e}&limit=10`);if(429===t.status){alert("Maximalt antal förfrågningar till API:n är begränsad, men alla föregående sidor som redan hämtas fungerar som normalt.");return}let a=await t.json();localStorage.setItem("page",JSON.stringify({current:e,last:a.pagination.last_visible_page})),c(e,a.data)}catch(e){console.error(e)}}async function c(e,t){if(localStorage.getItem("animePagesofLists")){let a=JSON.parse(localStorage.getItem("animePagesofLists"));a.push({page:e,list:t}),localStorage.setItem("animePagesofLists",JSON.stringify(a))}else localStorage.setItem("animePagesofLists",JSON.stringify([{page:e,list:t}]))}async function m(e){try{let t=await fetch(`https://api.jikan.moe/v4/anime?q=${e}&limit=10`);return(await t.json()).data}catch(e){console.error(e)}}window.onload=async()=>{if(localStorage.getItem("animePagesofLists")||await o(),localStorage.getItem("page")){let e=JSON.parse(localStorage.getItem("page"));i.innerHTML=e.current,n.innerHTML=e.last}s()},l.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(async()=>{if(""===l.value.trim()){if(localStorage.getItem("page")){let e=JSON.parse(localStorage.getItem("page"));i.innerHTML=e.current,n.innerHTML=e.last,s(e.current)}}else g(await m(l.value.trim()))},500)}),t.addEventListener("click",()=>{if(localStorage.getItem("page")){let e=JSON.parse(localStorage.getItem("page")),t=(e.current-1+e.last)%e.last;0==t&&(t=e.last),localStorage.setItem("page",JSON.stringify({current:t,last:e.last})),s(t)}}),a.addEventListener("click",()=>{if(localStorage.getItem("page")){let e=JSON.parse(localStorage.getItem("page")),t=(e.current+1)%e.last;0==t&&(t=e.last),localStorage.setItem("page",JSON.stringify({current:t,last:e.last})),s(t)}});
//# sourceMappingURL=index.56157859.js.map
