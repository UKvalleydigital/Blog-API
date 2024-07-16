import { Post, givePostForm } from './elements/post.js';
import User from './elements/account.js';

let posts = [];

function createList(list, container, className) {
    if (list.length <=  0) return;
    let ul = null;

    if (!container) {
        ul = document.createElement('ul');
        ul.classList.add(className);
    } else {
        ul = document.querySelector(`.${className}`);
    }

    list.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element.title;
        ul.appendChild(li);
    });

    if (!container) {
        const heading = document.querySelector('.recent');
        const body = document.querySelector('body');
        body.insertBefore(ul, heading);
    }
}



/*--NO ACCOUNT OPERATIONS--*/

// Display posts
Post().getPosts()
    .then(allPosts => {
        posts = allPosts;
        return posts;
    })
    .then(posts => createList(allPosts, true, 'post_list'))
    .catch(err => console.log(err));

/*--ACCOUNT ONLY OPERATIONS--*/

// Show user profile
User().getProfileInfo()
    .then(userEmail => User().createUserProfile(userEmail))
    .catch(err => console.log(err));

// Display form and create post
const create = document.querySelector('#create');
create.addEventListener('click', (e) => {
    givePostForm(e);
    const form = document.querySelector('.post_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        Post().createPost()
            .then(createdPost => posts.push(createdPost))
            .catch(err => console.log(err));
    });
});

// Display personal user posts
User().getUserPosts()
    .then(myPosts => {
        if (myPosts.length >= 1) {
            createList(myPosts, false, 'user_list');
        
            const h2 = document.createElement('h2');
            h2.textContent = 'My Posts'
        
            const ul = document.querySelector('.user_list');
            const body = document.querySelector('body');
            body.insertBefore(h2, ul);
        };
    })
    .catch(err => console.log(err));

