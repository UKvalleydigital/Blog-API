import { Post, givePostForm } from './elements/post.js';
import User from './elements/account.js';

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

// Display post list
Post().getPosts()
    .then(allPosts => console.log(allPosts))
    .catch(err => console.log(err));

// Save post data
const titles = document.querySelectorAll('.post_list > li');

titles.forEach(title => title.onclick = () => {
    Post().findPostID(title.children)
        .then(id => {
            localStorage.setItem('postID', id)
            window.location.href = 'post_page.html';
        })
        .catch(err => console.log(err));
});



/*--ACCOUNT ONLY OPERATIONS--*/

// Show user profile
User().getProfileInfo()
    .then(userEmail => User().createUserProfile(userEmail))
    .catch(err => console.log(err));

// Display form and create post
const create = document.querySelector('#create');
create && create.addEventListener('click', (e) => {
    givePostForm(e);
    const form = document.querySelector('.post_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        Post().createPost()
            .then(createdPost => console.log(`Created post ${createdPost}`))
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
