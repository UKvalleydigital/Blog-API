// import axiosInstance from "../utils/axios_instance";

// Sign up authentication

const button = document.querySelector('button');
button.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    axios.post('http://localhost:3000/register', {
        email: email,
        password: password
    })  .then(res => console.log(res))
        .catch(error => console.log(error));
});