import { Post, givePostForm } from './elements/post.js';
import User from './elements/account.js';

/*--NO ACCOUNT OPERATIONS--*/

// Display posts
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
}

Post().getPosts();
const allPosts = Post().returnPosts();
allPosts.push('post 4');

createList(response, true, 'post_list');

/*--ACCOUNT ONLY OPERATIONS--*/

// Show user profile
User().getProfileInfo;
const info = User().returnEmail();
if (info) {
    User().createUserProfile();
}

// Display form 
const create = document.querySelector('#create');
create.onclick = givePostForm;

// Display personal user posts
User().getUserPosts();
const myPosts = User().returnUserPosts();

if (myPosts.length > 1) {
    createList(myPosts, false, 'user_list');
};
