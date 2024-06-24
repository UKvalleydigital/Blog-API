const url = 'http://localhost:3000/register'
fetch(url, { method: 'POSt', mode: cors })
    .then(res => res.json())
    .then(res => console.log(res));