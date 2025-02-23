const searchPlaceINPUT = document.getElementById("search");
const searchResultsDIV = document.getElementById("search-results");
const mapIFRAME = document.getElementById("map");

let timeout;
searchPlaceINPUT.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        const places = await getPlacesFromSearch(searchPlaceINPUT.value.trim());
        listSearchResults(places);
    }, 500);
});

/**
 * Listar sökresultat.
 * @param {En array av platser} places 
 */
function listSearchResults(places) {
    searchResultsDIV.innerHTML = "";
    places.forEach(place => {
        const resultItemDIV = document.createElement("div");
        resultItemDIV.className = "result-item";
        resultItemDIV.innerHTML = `<p class=place-name><strong>${place.name}</strong></p><p class=coords>Latitud: ${place.lat} Longitud: ${place.lon}</p>`;
        resultItemDIV.addEventListener("click", () => {
            renderMap(place);
        });
        searchResultsDIV.appendChild(resultItemDIV);
    });
}

/**
 * Hämtar platsers namn och koordinater.
 * @param {Söksträngen} query 
 * @returns En array av objekt som har egenskaperna name, lat, lon och bbox. bbox är kartans hörn.
 */
async function getPlacesFromSearch(query) {
    try {
        const resp = await fetch(`https://nominatim.openstreetmap.org/search?q=${query.toLowerCase()}&format=json`);
        const data = await resp.json();

        const places = [];
        data.forEach(d => {
            places.push({
                name: d.display_name,
                lat: d.lat,
                lon: d.lon,
                bbox: d.boundingbox
            });
        });
        return places;
    } catch(error) {
        console.error(error);
    }
}

function renderMap(place) {
    mapIFRAME.setAttribute("src", `https://www.openstreetmap.org/export/embed.html?bbox=${place.bbox[2]}%2C${place.bbox[0]}%2C${place.bbox[3]}%2C${place.bbox[1]}&layer=mapnik&marker=${place.lat}%2C${place.lon}`);
}