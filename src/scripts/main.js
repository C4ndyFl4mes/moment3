import "@fontsource/roboto"; // Normal
import "@fontsource/roboto/700.css"; // Bold

const prevBTN = document.getElementById("prev-btn");
const nextBTN = document.getElementById("next-btn");
const searchFIELD = document.getElementById("search-field");
const pageNumberSPAN = document.getElementById("page-number");
const maxPageSPAN = document.getElementById("max-pages");
const animeListDIV = document.getElementById("anime-list");

// När sidan laddas in hämtas och renderas första sidan av anime listan.
window.onload = async () => {
    if (!sessionStorage.getItem("animePagesofLists")) {
        await getTopAnime();
    }
    // Sätter visuellt vilken sida som användaren står på vid inladdning av sidan.
    if (sessionStorage.getItem("page")) {
        const pageData = JSON.parse(sessionStorage.getItem("page"));
        pageNumberSPAN.innerHTML = pageData.current;
        maxPageSPAN.innerHTML = pageData.last;
    }

    renderList();
}

// Renderar en sida beroende på vilken sida det är, standard är första sidan.
async function renderList(page = 1) {
    // Uppdaterar visuellt vilken sida användaren står på.
    if (sessionStorage.getItem("page")) {
        const pageData = JSON.parse(sessionStorage.getItem("page"));
        pageNumberSPAN.innerHTML = pageData.current;
        maxPageSPAN.innerHTML = pageData.last;
    }
    if (sessionStorage.getItem("animePagesofLists")) {
        // Hämtar listan från sessionStorage:
        const pagesofLists = JSON.parse(sessionStorage.getItem("animePagesofLists"));
        // Loopar igenom sidorna tills rätt sida är funnen, då anropas listOnPage med sidans lista som argument, därefter stoppas loopen.
        // Ifall sidlistan inte hittas i arrayen, då hämtas den sidlistan genom att anropa getTopAnime(sidnummer) och därefter renderas den nya sidlistan.
        for (const list of pagesofLists) {
            if (list.page === page) {
                listOnPage(list.list);
                break;
            } else if (pagesofLists.indexOf(list) === pagesofLists.length - 1 && list.page !== page) {
                await getTopAnime(page);
                await renderList(page);
            }
        }
    }

}

// Renderar en lista.
function listOnPage(list) {
    // Använder innerHTML för att det ska bli så smidigt som möjligt.
    animeListDIV.innerHTML = "";
    list.forEach(anime => {
        let title = anime.title_english;
        if (anime.title_english === null) {
            title = anime.title;
        }
        animeListDIV.innerHTML +=
            `<article class=anime-list-item>
                <h2>${title}</h2>
                <div>
                    <picture class=poster>
                        <source srcset="${anime.images.webp.image_url}" type="image/webp">
                        <img src="${anime.images.jpg.image_url}" width="100" height="141" alt="" loading="lazy" class=poster>
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
                                <td>#${anime.rank || "N/A"}</td>
                                <td>${anime.score || "N/A"}</td>
                                <td>${anime.rating || "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>Beskrivning</h3>
                    <p>${anime.synopsis || "N/A"}</p>
                </div>
            </article>`;
    });
}

// Hämtar top anime från Jikan API, argumentet (page) i parametern ser till en och samma anime inte hämtas mer än en gång.
// Varje sida innehåller max 10 anime då det ska finnas plats med överskrifter och text.
async function getTopAnime(page = 1) {
    try {
        const resp = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&limit=10`);
        if (resp.status === 429) {
            alert("Maximalt antal förfrågningar till API:n är begränsad, men alla föregående sidor som redan hämtas fungerar som normalt.");
            return;
        }
        const data = await resp.json();

        sessionStorage.setItem("page", JSON.stringify({ current: page, last: data.pagination.last_visible_page })); // Sätter/uppdaterar vilken sida användaren står på.
        animePagesofLists(page, data.data); // Anropar för att ordna en array som ska lagras i sessionStorage.
    } catch (error) {
        console.error(error);
    }
}

// Skapar objekt med två egenskaper:
// page är som ett id som håller reda på vilken lista som den innehåller. Detta är för att vi endast hämtar en liten del av en gigantisk lista av anime.
// list är den lista som tillhör page, i detta faller är det 10 list items.
async function animePagesofLists(page, animeList) {
    if (sessionStorage.getItem("animePagesofLists")) {
        const pagesofLists = JSON.parse(sessionStorage.getItem("animePagesofLists"));
        pagesofLists.push({ page: page, list: animeList });
        sessionStorage.setItem("animePagesofLists", JSON.stringify(pagesofLists));
    } else {
        sessionStorage.setItem("animePagesofLists", JSON.stringify([{ page: page, list: animeList }]));
    }
}

// Sökfältet, det är 500ms delay för att inte överstiga API:ns begränsade request rate.
let timeout;
searchFIELD.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        // Om fältet är tomt kommer användaren hamna på sidan den var på innan sökningen.
        if (searchFIELD.value.trim() === "") {
            if (sessionStorage.getItem("page")) {
                const pageData = JSON.parse(sessionStorage.getItem("page"));
                pageNumberSPAN.innerHTML = pageData.current;
                maxPageSPAN.innerHTML = pageData.last;
                renderList(pageData.current); // <---- Sätter vilken sida användaren ska ställas på.
            }
        } else {
            // Hämtar en lista av tio anime som kan motsvara förfrågan.
            const list = await searchAnime(searchFIELD.value.trim());
            // Anropar funktionen som renderar en lista.
            listOnPage(list);
        }
    }, 500);
});

// Tar emot söktermen från sökfältet och söker i API:n. Returnerar en lista av 10 animes som motsvarar den sökta termen.
async function searchAnime(query) {
    try {
        const resp = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
        const data = await resp.json();

        return data.data;
    } catch (error) {
        console.error(error);
    }
}

// Till föregående sida.
prevBTN.addEventListener("click", () => {
    if (sessionStorage.getItem("page")) {
        const pageData = JSON.parse(sessionStorage.getItem("page"));
        // Stegar bakåt i en loop. Om användaren står på sida 1 blir föregående sida sista sidan med hjälp av if-satsen nedan.
        let prevPage = (pageData.current - 1 + pageData.last) % pageData.last;
        // Sista sidan blir pageData.last % pageData.last men det blir 0 och det finns inte och för att sista sidan ska bli möjlig måste sida 0 vara sista sidan. 
        if (prevPage == 0) {
            prevPage = pageData.last;
        }
        sessionStorage.setItem("page", JSON.stringify({ current: prevPage, last: pageData.last })); // Sätter/uppdaterar vilken sida användaren står på.
        renderList(prevPage); // Renderar listan.
    }
});

// Till nästa sida.
nextBTN.addEventListener("click", () => {
    if (sessionStorage.getItem("page")) {
        const pageData = JSON.parse(sessionStorage.getItem("page"));
        // Stegar frammåt i en loop. Precis som ovanstående funktion men åt andra hållet.
        let nextPage = (pageData.current + 1) % pageData.last;
        if (nextPage == 0) {
            nextPage = pageData.last;
        }
        sessionStorage.setItem("page", JSON.stringify({ current: nextPage, last: pageData.last })); // Sätter/uppdaterar vilken sida användaren står på.
        renderList(nextPage); // Renderar listan.
    }
});
