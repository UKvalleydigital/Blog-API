import Post from './elements/post.js';

// Display posts
function createList(list) {
    if (list.length <=  0) return;
    const ul = document.querySelector('.post_list');

    list.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element;
        ul.appendChild(li);
    });
}

Post().getPosts();
const response = Post().returnPosts();
response.push('post 4');

createList(response);

