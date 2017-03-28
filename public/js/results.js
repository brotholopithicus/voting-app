const mainDiv = document.querySelector('.results');

function getPollResults() {
    const id = window.location.pathname.substr(1).split('/')[1];
    requestify(`/polls/api/${id}`).then(JSON.parse).then(displayResults);
}

function displayResults(data) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth / 2;
    canvas.height = canvas.width * (3 / 4);
    mainDiv.appendChild(canvas);
    let last = 0;
    let hue = 0;
    const totalVotes = data.options.reduce((acc, opt) => acc += opt.votes, 0);
    for (let i = 0; i < data.options.length; i++) {
        const rad = (2 * Math.PI) * (data.options[i].votes / totalVotes);
        const percent = ((data.options[i].votes / totalVotes) * 100).toFixed(1);
        ctx.beginPath();
        ctx.fillStyle = `hsl(${hue}, 50%, 50%)`;
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, last, last + rad, false);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        if (data.options[i].votes) {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.fillStyle = '#000';
            ctx.font = (canvas.height / 2) / 15 + 'px Arial';
            ctx.rotate(last + (rad / 2));
            const text = `${data.options[i].text} - ${percent}%`;
            ctx.fillText(text, ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }

        last += rad;
        hue += 60;
        if (hue >= 360) {
            hue = 0;
        }
    }
}


function requestify(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(Error(`DELETE request failed with error: ${xhr.statusText}`));
            }
        }
        xhr.onerror = (err) => reject(`Network Error: ${err}`);
        xhr.send();
    })
}

getPollResults();
