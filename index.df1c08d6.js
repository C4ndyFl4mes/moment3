const e=document.getElementById("prev-btn"),t=document.getElementById("next-btn"),a=document.getElementById("page-number"),l=document.getElementById("max-pages"),i=document.getElementById("anime-list");async function s(e=1){if(localStorage.getItem("page")){let e=JSON.parse(localStorage.getItem("page"));a.innerHTML=e.current,l.innerHTML=e.last}if(localStorage.getItem("animePagesofLists")){let a=JSON.parse(localStorage.getItem("animePagesofLists"));for(let l of a){if(l.page===e){var t;t=l.list,i.innerHTML="",t.forEach(e=>{let t=e.title_english;null===e.title_english&&(t=e.title),i.innerHTML+=`<article class=anime-list-item>
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
                                    <td>#${e.rank}</td>
                                    <td>${e.score}</td>
                                    <td>${e.rating}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>Beskrivning</h3>
                        <p>${e.synopsis}</p>
                    </div>
                </article>`});break}a.indexOf(l)===a.length-1&&l.page!==e&&(await r(e),await s(e))}}}async function r(e=1){try{let t=await fetch(`https://api.jikan.moe/v4/top/anime?page=${e}&limit=10`);if(429===t.status){alert("Maximalt antal förfrågningar till API:n är begränsad, men alla föregående sidor som redan hämtas fungerar som normalt.");return}let a=await t.json();localStorage.setItem("page",JSON.stringify({current:e,last:a.pagination.last_visible_page})),n(e,a.data)}catch(e){console.error(e)}}async function n(e,t){if(localStorage.getItem("animePagesofLists")){let a=JSON.parse(localStorage.getItem("animePagesofLists"));a.push({page:e,list:t}),localStorage.setItem("animePagesofLists",JSON.stringify(a))}else localStorage.setItem("animePagesofLists",JSON.stringify([{page:e,list:t}]))}window.onload=async()=>{if(localStorage.getItem("animePagesofLists")||await r(),localStorage.getItem("page")){let e=JSON.parse(localStorage.getItem("page"));a.innerHTML=e.current,l.innerHTML=e.last}s()},e.addEventListener("click",()=>{if(localStorage.getItem("page")){let e=JSON.parse(localStorage.getItem("page")),t=(e.current-1+e.last)%e.last;0==t&&(t=e.last),localStorage.setItem("page",JSON.stringify({current:t,last:e.last})),s(t)}}),t.addEventListener("click",()=>{if(localStorage.getItem("page")){let e=JSON.parse(localStorage.getItem("page")),t=(e.current+1)%e.last;0==t&&(t=e.last),localStorage.setItem("page",JSON.stringify({current:t,last:e.last})),s(t)}});
//# sourceMappingURL=index.df1c08d6.js.map
