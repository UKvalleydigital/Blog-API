// Login authentication

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const data = { email, password };
    const jsonData = JSON.stringify(data);

    const url = 'http://localhost:3000/login';
    fetch(url, {
        method: 'POST',
        body: jsonData,
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(res => res.token)
        .then(token => {
            localStorage.removeItem('token');
            localStorage.setItem('token', token);
            window.location.href = 'home.html';
        })
        .catch(err => {
            let temp = document.querySelector('.error');
            if (temp) temp.remove();

            const error = document.createElement('div');
            error.textContent = `Login failed: ${err.message}`;
            err.style.color = 'red';

            document.querySelector('.form_container').appendChild(error);
        });
});