async function getPostData (id) {
    const data = { postID: id };
    const jsonData = JSON.stringify(data);

    const url = `http://localhost:3000/post_get`;

    fetch(url, {
        method: 'POST',
        body: jsonData
    })
        .then(res => res.json())
        .then(json => json.post)
        .then(post => createPage(post))
        .catch(err => console.log(err));
};

function createPage (data) {
    const h2 = document.createElement('h2');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p')
    const ul = document.createElement('ul');
    const div = document.querySelector('.post_data');

    if (!data) {
        p1.textContent = 'Post not available';
        div.appendChild(p1);
    }

    ul.classList.add('.comment_data');
    p1.classList.add('.user');

    h2.textContent = data.title;
    p2.textContent = data.text;
    if (data.comments.length <= 0) {
        const li = document.createElement('li');
        li.textContent = 'Nothing to see here. Wanna comment?';

        ul.appendChild(li);
    }

    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(ul);
}

const postID = localStorage.getItem('postID')

getPostData(postID)
