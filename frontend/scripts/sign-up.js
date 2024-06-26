// Sign up authentication

const button = document.querySelector('button');

button.addEventListener('submit', (e) => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    console.log(email, password);


    const body = new FormData();
    body.set('email', email);
    body.set('password', password);
    
    const url = `http://localhost:3000/register`
    fetch(url, { method: 'POST', body })
        .then(res => res.json())
        .then(res => console.log(res));
});