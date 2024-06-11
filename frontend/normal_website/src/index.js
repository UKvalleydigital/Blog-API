function component() {
    const element = document.createElement('p');

    element.textContent = 'Hello world'
    return element;
}

document.body.appendChild(component());