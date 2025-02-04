const animeListTBODY = document.getElementById("anime-list");

// När sidan laddas in hämtas och renderas första sidan av anime listan.
window.onload = async () => {
    await getTopAnime();

    renderList();
}

// Renderar en sida beroende på vilken sida det är, standard är första sidan.
function renderList(page = 1) {
    if (localStorage.getItem("animePagesofLists")) {
        // Hämtar listan från localStorage:
        const pagesofLists = JSON.parse(localStorage.getItem("animePagesofLists"));
        // Loopar igenom sidorna tills rätt sida är funnen, då anropas listOnPage med sidans lista som argument, därefter stoppas loopen.
        for (const list of pagesofLists) {
            if (list.page === page) {
                listOnPage(list.list);
                break;
            }
        }
    }
    // Renderar en lista.
    function listOnPage(list) {
        // Använder innerHTML för att det ska bli så smidigt som möjligt.
        animeListTBODY.innerHTML = "";
        list.forEach(anime => {
            animeListTBODY.innerHTML +=
                `<tr>
                    <td>
                        <picture class=poster>
                            <source srcset="${anime.images.webp.image_url}" type="image/webp">
                            <img src="${anime.images.jpg.image_url}" alt="" loading="lazy" class=poster>
                        </picture>
                    </td>
                </tr>`;
        });
    }
}

// Hämtar top anime från Jikan API, argumentet (page) i parametern ser till en och samma anime inte hämtas mer än en gång.
// Varje sida innehåller max 25 anime då det är API:ns max gräns för varje request.
async function getTopAnime(page = 1) {
    try {
        const resp = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&limit=25`);
        const data = await resp.json();
        animePagesofLists(page, data.data); // Anropar för att ordna en array som ska lagras i localStorage.
    } catch (error) {
        console.error(error);
    }
}

// Skapar objekt med två egenskaper:
// page är som ett id som håller reda på vilken lista som den innehåller. Detta är för att vi endast hämtar en liten del av en gigantisk lista av anime.
// list är den lista som tillhör page, i detta faller är det 25 list items.
async function animePagesofLists(page, animeList) {
    if (localStorage.getItem("animePagesofLists")) {
        const pagesofLists = JSON.parse(localStorage.getItem("animePagesofLists"));
        pagesofLists.push({ page: page, list: animeList });
        localStorage.setItem("animePagesofLists", JSON.stringify(pagesofLists));
    } else {
        localStorage.setItem("animePagesofLists", JSON.stringify([{ page: page, list: animeList }]));
    }
}

