// Sign up authentication

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const data = { email, password };
    const jsonData = JSON.stringify(data)

    const url = `http://localhost:3000/register`
    fetch(url, {
        method: 'POST',
        body: jsonData
    })
        .then(res => res.json())
        .then(res => res.token)
        .then(token => {
            localStorage.removeItem('token');
            localStorage.setItem('token', token);
            window.location.href = 'home.html';
        })
        .catch(err => console.log(err));
});