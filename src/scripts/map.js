const searchPlaceINPUT = document.getElementById("search");

let timeout;
searchPlaceINPUT.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        const places = await getPlacesFromSearch(searchPlaceINPUT.value.trim());
    }, 500);
});

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
        console.log(places);
        return places;
    } catch(error) {
        console.error(error);
    }
}