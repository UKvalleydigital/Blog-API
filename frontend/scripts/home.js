import { Post, givePostForm } from './elements/post.js';
import User from './elements/account.js';

function createList(list, container, className) {
    const DOMList = (ul, list) => {
        list.forEach(element => {
            const li = document.createElement('li');
            
            const h3 = document.createElement('h3');
            h3.textContent = element.title;
            
            const p = document.createElement('p');
            p.textContent = element.text;
            
            li.appendChild(h3);
            li.appendChild(p);

            li.onclick = () => {displayPostData(li)};

            ul.appendChild(li);
        })
    }
    if (!container) {
        const ul = document.createElement('ul');
        ul.classList.add(className);
        
        const div = document.querySelector('.lists');
        let current = document.querySelector('.recent');
        DOMList(ul, list);
        div.insertBefore(ul, current);
    } else {
        const ul = document.querySelector(`.${className}`);
        DOMList(ul, list);
    }
}



/*--NO ACCOUNT OPERATIONS--*/

// Display post list
Post().getPosts()
    .then(allPosts => {
        createList(allPosts, true, 'post_list')
    })
    .catch(err => console.log(err));

// Save post data
function displayPostData (title) {
    Post().findPostID(title.children)
        .then(id => {
            localStorage.setItem('postID', id)
            window.location.href = 'post_page.html';
        })
        .catch(err => console.log(err));
};



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
    form.addEventListener('submit', () => {
        Post().createPost()
            .then(post => console.log(post))
            .catch(err => console.log(err));
    });
});

// Display personal user posts
User().getUserPosts()
    .then(myPosts => {
        if (myPosts.length >= 1) {
                createList(myPosts, false, 'user_list');
                const h2 = document.createElement('h2');
                h2.textContent = 'My Posts';

                const ul = document.querySelector('.user_list');
                ul.classList.add('post_list');

                const lists = document.querySelector('.lists');
                lists.insertBefore(h2, ul);
            };
       })
    .catch(err => console.log(err));