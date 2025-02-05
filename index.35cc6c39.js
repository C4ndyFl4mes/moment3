const t=document.getElementById("anime-list");async function e(i=1){if(localStorage.getItem("animePagesofLists")){let l=JSON.parse(localStorage.getItem("animePagesofLists"));for(let n of l){if(n.page===i){var s;s=n.list,t.innerHTML="",s.forEach(e=>{let a=e.title_english;null===e.title_english&&(a=e.title),t.innerHTML+=`<article class=anime-list-item>
                    <h2>${a}</h2>
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
                </article>`});break}l.indexOf(n)===l.length-1&&n.page!==i&&(await a(i),await e(i))}}}async function a(t=1){try{let e=await fetch(`https://api.jikan.moe/v4/top/anime?page=${t}&limit=10`),a=await e.json();i(t,a.data)}catch(t){console.error(t)}}async function i(t,e){if(localStorage.getItem("animePagesofLists")){let a=JSON.parse(localStorage.getItem("animePagesofLists"));a.push({page:t,list:e}),localStorage.setItem("animePagesofLists",JSON.stringify(a))}else localStorage.setItem("animePagesofLists",JSON.stringify([{page:t,list:e}]))}window.onload=async()=>{localStorage.getItem("animePagesofLists")||await a(),e()};
//# sourceMappingURL=index.35cc6c39.js.map
