const searchPlaceINPUT = document.getElementById("search");
const searchResultsDIV = document.getElementById("search-results");

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
        searchResultsDIV.appendChild(resultItemDIV);
    });
}

/**
 * Hämtar platsers namn och koordinater.
 * @param {Söksträngen} query 
 * @returns En array av objekt som har egenskaperna name, lat och lon.
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
                lon: d.lon
            });
        });
        return places;
    } catch(error) {
        console.error(error);
    }
}