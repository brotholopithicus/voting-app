const options = document.querySelectorAll('.option');
options.forEach(option => option.addEventListener('click', vote));

function vote(e) {
    const target = verifyNode(e.target, 'option');
    console.log(target);
    const url = window.location.pathname;
    console.log(url);
    const data = JSON.stringify({ option: target.dataset.option });
    console.log(data);
    postify(url, data).then(() => {
      window.location.reload();
    });
}

function verifyNode(node, test) {
    if (node.classList.contains(test)) return node;
    return verifyNode(node.parentNode, test);
}

function postify(url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(Error(`POST request failed with error: ${xhr.statusText}`));
            }
        }
        xhr.onerror = (err) => reject(`Network Error: ${err}`);
        xhr.send(data)
    });
}
