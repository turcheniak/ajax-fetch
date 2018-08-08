document.querySelector('.time')
    .innerText = (new Date()).toLocaleTimeString();
    
document.querySelector('.get-html')
    .addEventListener('click', getHtml);

function getHtml() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('.html .placeholder')
              .innerHTML = xhr.responseText;
        }
    }
    xhr.open('GET', 'data.html?r='+Math.random(), true);
    xhr.send();
}

document.querySelector('.fetch-html')
    .addEventListener('click', fetchHtml);
    
function fetchHtml() {
    fetch('data.html?r='+Math.random())
        .then( response => response.text() )
        .then( html => document.querySelector('.html .placeholder').innerHTML = html );
}
document.querySelector('.get-json')
    .addEventListener('click', getJson);

function getJson() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const clientData = JSON.parse(xhr.responseText);
            document.querySelector('.client-name')
                .innerText = clientData.name;
            document.querySelector('.account-balance')
                .innerText = clientData.accountBalance;
        }
    }
    xhr.open('GET', 'client-data.json?r='+Math.random(), true);
    xhr.send();
}


document.querySelector('form input[type=submit]')
    .addEventListener('click', sendForm);

function sendForm(e) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('form')
                .innerHTML = '<h2>Logged in</h2>';
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            document.querySelector('form')
                .innerHTML = '<h2>Error!</h2>';
        }
    }
    const name = document.querySelector('form input[name=login]').value;
    const pass = document.querySelector('form input[name=password]').value;
    xhr.open('GET', `login?name=${name}&pass=${pass}`, true);
    xhr.send();
    // xhr.open('POST', 'login', true);
    // xhr.setRequestHeader('Content-type', 'application/json');
    // xhr.send(JSON.stringify({name: name, password: pass}));
}