const icon = document.querySelector('i');
const input = document.querySelector('#password');

console.log(icon);
icon.onclick = handleClick;

function handleClick() {
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');

    if (icon.classList.contains('fa-eye-slash')) {
        input['type'] = 'text';
    } else {
        input['type'] = 'password';
    }
};
