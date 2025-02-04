!function(){let e=document.getElementById("anime-list");async function t(e=1){try{let t=await fetch(`https://api.jikan.moe/v4/top/anime?page=${e}&limit=25`),i=await t.json();a(e,i.data)}catch(e){console.error(e)}}async function a(e,t){if(localStorage.getItem("animePagesofLists")){let a=JSON.parse(localStorage.getItem("animePagesofLists"));a.push({page:e,list:t}),localStorage.setItem("animePagesofLists",JSON.stringify(a))}else localStorage.setItem("animePagesofLists",JSON.stringify([{page:e,list:t}]))}window.onload=async()=>{await t(),function(t=1){if(localStorage.getItem("animePagesofLists")){for(let i of JSON.parse(localStorage.getItem("animePagesofLists")))if(i.page===t){var a;a=i.list,e.innerHTML="",a.forEach(t=>{e.innerHTML+=`<tr>
                    <td>
                        <picture class=poster>
                            <source srcset="${t.images.webp.image_url}" type="image/webp">
                            <img src="${t.images.jpg.image_url}" alt="" loading="lazy" class=poster>
                        </picture>
                    </td>
                </tr>`});break}}}()}}();
//# sourceMappingURL=index.897d26d8.js.map
