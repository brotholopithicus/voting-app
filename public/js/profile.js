const removeButtons = document.querySelectorAll('button#delete');
removeButtons.forEach(button => button.addEventListener('click', handleDelete));

const editButtons = document.querySelectorAll('button#edit');
editButtons.forEach(button => button.addEventListener('click', handleEdit));

function handleEdit(e) {
    window.location.pathname = e.target.dataset.url;
}

function handleDelete(e) {
    const checkConfirm = confirm('Are you sure?');
    if (checkConfirm) deletify(e.target.dataset.url).then(() => window.location.reload());
}

function deletify(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
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
    });
}
