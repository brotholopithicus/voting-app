const newPoll = document.querySelector('.newPoll');
const newPollOptions = document.querySelector('.newPoll-options');
const createPollButton = document.querySelector('.createPoll');
createPollButton.addEventListener('click', createPoll);

const addOptionButton = document.querySelector('#addOption');
addOptionButton.addEventListener('click', addOptionField);

let optionIndex = 1;

function addOptionField(e) {
    console.log(e);
    optionIndex++;
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('newPoll-option');
    const label = document.createElement('label');
    label.textContent = 'Option ' + optionIndex;
    const input = document.createElement('input');
    input.id = 'option';
    input.type = 'text';
    input.name = 'option';
    optionDiv.appendChild(label);
    optionDiv.appendChild(input);
    newPollOptions.appendChild(optionDiv);
}

function createPoll() {
    const options = Array.from(document.querySelectorAll(`input[name='option']`));
    const text = document.querySelector(`input[name='text']`);
    let newPollData = {};
    newPollData.text = text.value;
    newPollData.options = options.map((option) => {
        return { text: option.value }
    });
    if (newPollData.text.length && newPollData.options.length) {
        postify('/polls/new', JSON.stringify(newPollData)).then(window.location = '/');
    }
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
