const params = new URLSearchParams(window.location.search);
const trackId = params.get('id');

async function TrackDetails(trackId) {
    const url = `https://itunes.apple.com/lookup?id=${trackId}`;

    try {
        const response = await fetch(url, { cache: 'no-store' });
        const data = await response.json();
        displayDetails(data.results[0]);
    } catch (error) {
        console.error('Error fetching track details:', error);
    }
}


function displayDetails(track) {
    const details = document.getElementById('details');
    details.innerHTML = `
        <h2>${track.trackName}</h2>
        <p><strong>Artist:</strong> ${track.artistName}</p>
        <p><strong>Collection:</strong> ${track.collectionName}</p>
        <p><strong>Price:</strong> $${track.trackPrice}</p>
        <p><strong>Release Date:</strong> ${new Date(track.releaseDate).toLocaleDateString()}</p>
        <p><strong>Genre:</strong> ${track.primaryGenreName}</p>
        ${track.previewUrl ? `<audio controls src="${track.previewUrl}"></audio>` : ""}
    `;
}

TrackDetails(trackId);