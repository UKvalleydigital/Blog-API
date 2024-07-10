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
        li.textContent = element;
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

Post().getPosts();
const allPosts = Post().returnPosts();
allPosts.push('post 4');

createList(allPosts, true, 'post_list');



/*--ACCOUNT ONLY OPERATIONS--*/

// Show user profile
User().getProfileInfo()
    .then(userEmail => User().createUserProfile(userEmail))
    .catch(err => console.log(err));


// Display form 
const create = document.querySelector('#create');
create.onclick = givePostForm;

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



