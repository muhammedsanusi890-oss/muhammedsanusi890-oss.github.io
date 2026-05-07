async function search() {
    const query = document.getElementById('input-search').value;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=musicTrack&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(track => {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-4";

        col.innerHTML = `
            <div class="card bg-dark text-white shadow">
                <img src="${track.artworkUrl100}" class="card-img-top">
                <div class="card-body">
                    <h6>${track.trackName}</h6>
                    <p class="itunes-text text-muted mb-1">${track.artistName}</p>
                    <small class = "itunes-text">${track.collectionName || ""}</small>
                </div>
                <div class="card-footer bg-dark border-0">
                    ${track.previewUrl ? `<audio controls src="${track.previewUrl}"></audio>` : ""}
                </div>

                <div class="lookup-btn">
                <button onclick= "lookup(${track.trackId})" class="btn btn-primary btn-sm itunes-text"><span class="btn-text">View Details</span></button>
            </div>
        `;

        container.appendChild(col);
    });
}


async function lookup(trackId) {
    window.location.href = `details.html?id=${trackId}`;
}


window.onload = () => {
    document.getElementById('input-search').value = "Travis Scott";
    search();
};
