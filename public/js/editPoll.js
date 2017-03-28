const question = document.querySelector('.newPoll-question input');
const optionOne = document.querySelector('.newPoll-option input');
const pollOptions = document.querySelector('.newPoll-options');
const addOptionButton = document.querySelector('button#addOption');
addOptionButton.addEventListener('click', addOptionField);
const updateButton = document.querySelector('button.updatePoll');
updateButton.addEventListener('click', updatePoll);

const pollId = window.location.pathname.substr(1).split('/')[1];

function displayPoll() {
    requestify(`/polls/api/${pollId}`, 'GET').then(JSON.parse).then(poll => {
        question.value = poll.text;
        addPollOptions(poll.options);
    });
}

function requestify(url, method, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(Error(`DELETE request failed with error: ${xhr.statusText}`));
            }
        }
        xhr.onerror = (err) => reject(`Network Error: ${err}`);
        xhr.send(data);
    })
}

displayPoll();

function addOptionField(e, option) {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('newPoll-option');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const button = document.createElement('button');
    input.id = 'option';
    input.type = 'text';
    input.name = 'option';
    button.addEventListener('click', removeOption);
    button.textContent = 'Remove';
    const index = pollOptions.children.length;
    label.textContent = 'Option ' + (index + 1);
    if (typeof option !== 'undefined') input.value = option.text;
    optionDiv.appendChild(label);
    optionDiv.appendChild(input);
    optionDiv.appendChild(button);
    pollOptions.appendChild(optionDiv);
}

function updateIndex() {
    const nodeList = Array.prototype.slice.call(document.querySelector('.newPoll-options').children);
    const options = document.querySelectorAll('.newPoll-option');
    options.forEach(option => {
        const label = option.querySelector('label');
        const optionNumber = nodeList.indexOf(option) + 1;
        label.textContent = 'Option ' + optionNumber;
    });
}

function removeOption(e) {
    pollOptions.removeChild(e.target.parentNode);
    updateIndex();
}

function addPollOptions(options) {
    options.forEach(option => {
        addOptionField(null, option);
    });
}


function updatePoll() {
    const options = Array.from(document.querySelectorAll(`input[name='option']`));
    const text = document.querySelector(`input[name='text']`);
    let newPollData = {};
    newPollData.text = text.value;
    newPollData.options = options.map((option) => {
        return { text: option.value }
    });
    if (newPollData.text.length && newPollData.options.length) {
        requestify(`/polls/${pollId}`, 'PUT', JSON.stringify(newPollData)).then(() => window.location = '/profile');
    }
}
