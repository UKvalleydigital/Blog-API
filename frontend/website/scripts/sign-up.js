// Sign up authentication

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const data = { email, password };
    const jsonData = JSON.stringify(data);
    console.log(data, jsonData);

    const url = `http://localhost:5000/register`
    fetch(url, {
        method: 'POST',
        body: jsonData,
        headers: {
            'Content-Type': 'application/json' 
        }
    })
        .then(res => res.json())
        .then(json => {
            if (json.error) throw new Error (json.msg);
            return json.token;
        })
        .then(token => {
            console.log(token);
            localStorage.setItem('token', token);
            window.location.href = 'home.html';
        })
        .catch(err => console.log(err));
});