document.addEventListener('DOMContentLoaded', (event) => {
    function updateGpsData() {
        fetch('/gps')
            .then(response => response.json())
            .then(data => {
                let statusIcon = '';
                if (data.gps_fix === 'valid') {
                    statusIcon = '<span class="valid-fix">&#10004;</span> ';
                } else {
                    statusIcon = '<span class="pending-fix">&#10060;</span> ';
                }
                document.getElementById('gps-data').innerHTML = statusIcon + `Time: ${data.timestamp}, Latitude: ${data.latitude}, Longitude: ${data.longitude}, Altitude: ${data.altitude}, Satellites: ${data.num_satellites}`;
                document.getElementById('gga-sentence').innerText = `Last GGA (${data.gga_sentence_count}): ${data.last_gga_sentence}`;
            })
            .catch(error => {
                console.error('Error fetching GPS data:', error);
                document.getElementById('gps-data').innerText = "GPS data not available";
            });
    }

    setInterval(updateGpsData, 5000);
    updateGpsData(); // Initial call
});