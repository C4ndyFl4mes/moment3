!function(){let e;let t=document.getElementById("prev-btn"),s=document.getElementById("next-btn"),a=document.getElementById("search-field"),i=document.getElementById("page-number"),n=document.getElementById("max-pages"),r=document.getElementById("anime-list");async function g(e=1){if(sessionStorage.getItem("page")){let e=JSON.parse(sessionStorage.getItem("page"));i.innerHTML=e.current,n.innerHTML=e.last}if(sessionStorage.getItem("animePagesofLists")){let t=JSON.parse(sessionStorage.getItem("animePagesofLists"));for(let s of t){if(s.page===e){o(s.list);break}t.indexOf(s)===t.length-1&&s.page!==e&&(await l(e),await g(e))}}}function o(e){r.innerHTML="",e.forEach(e=>{let t=e.title_english;null===e.title_english&&(t=e.title),r.innerHTML+=`<article class=anime-list-item>
                <h2>${t}</h2>
                <div>
                    <picture class=poster>
                        <source srcset="${e.images.webp.image_url}" type="image/webp">
                        <img src="${e.images.jpg.image_url}" width="100" height="141" alt="" loading="lazy" class=poster>
                    </picture>
                    <table class=anime-info-table>
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
            </article>`})}async function l(e=1){try{let t=await fetch(`https://api.jikan.moe/v4/top/anime?page=${e}&limit=10`);if(429===t.status){alert("Maximalt antal förfrågningar till API:n är begränsad, men alla föregående sidor som redan hämtas fungerar som normalt.");return}let s=await t.json();sessionStorage.setItem("page",JSON.stringify({current:e,last:s.pagination.last_visible_page})),m(e,s.data)}catch(e){console.error(e)}}async function m(e,t){if(sessionStorage.getItem("animePagesofLists")){let s=JSON.parse(sessionStorage.getItem("animePagesofLists"));s.push({page:e,list:t}),sessionStorage.setItem("animePagesofLists",JSON.stringify(s))}else sessionStorage.setItem("animePagesofLists",JSON.stringify([{page:e,list:t}]))}async function c(e){try{let t=await fetch(`https://api.jikan.moe/v4/anime?q=${e}&limit=10`);return(await t.json()).data}catch(e){console.error(e)}}window.onload=async()=>{if(sessionStorage.getItem("animePagesofLists")||await l(),sessionStorage.getItem("page")){let e=JSON.parse(sessionStorage.getItem("page"));i.innerHTML=e.current,n.innerHTML=e.last}g()},a.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(async()=>{if(""===a.value.trim()){if(sessionStorage.getItem("page")){let e=JSON.parse(sessionStorage.getItem("page"));i.innerHTML=e.current,n.innerHTML=e.last,g(e.current)}}else o(await c(a.value.trim()))},500)}),t.addEventListener("click",()=>{if(sessionStorage.getItem("page")){let e=JSON.parse(sessionStorage.getItem("page")),t=(e.current-1+e.last)%e.last;0==t&&(t=e.last),sessionStorage.setItem("page",JSON.stringify({current:t,last:e.last})),g(t)}}),s.addEventListener("click",()=>{if(sessionStorage.getItem("page")){let e=JSON.parse(sessionStorage.getItem("page")),t=(e.current+1)%e.last;0==t&&(t=e.last),sessionStorage.setItem("page",JSON.stringify({current:t,last:e.last})),g(t)}})}();
//# sourceMappingURL=index.9e1b9537.js.map
