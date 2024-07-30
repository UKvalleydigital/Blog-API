import Comment from "./elements/comment.js";
import User from "./elements/account.js";

// Get profile info
User().getProfileInfo()
    .then(userEmail => User().createUserProfile(userEmail))
    .catch(err => console.log(err));

// Post data function
async function getPostData (id) {
    const data = { postID: id };
    const jsonData = JSON.stringify(data);
    
    const url = `http://localhost:3000/post_get`;
    
    const response = await fetch(url, {
        method: 'POST',
        body: jsonData
    })
    
    const json = await response.json();
    const post = await json.post;
    return post;
};

// Create comment function
function createPageComments(comment, ul) {
    User().getUser(comment.user)
        .then(user => {
            const li = document.createElement('li');
            li.textContent = comment.text;

            const div1 = document.createElement('div');
            const div2 = document.createElement('div');
            div1.classList.add('comment_container');
            div2.classList.add('icon');

            const editIcon = document.createElement('i');
            editIcon.onclick = (e) => editComment(e.target, comment);
            const deleteIcon = document.createElement('i');
            deleteIcon.id = 'deleteIcon';

            editIcon.classList.add('fa');
            editIcon.classList.add('fa-pencil-square-o');
            
            deleteIcon.classList.add('fa');
            deleteIcon.classList.add('fa-trash');

            const h4 = document.createElement('h4');
            h4.textContent = `Commented by ${user.email}`;
            div1.appendChild(h4);
            div2.appendChild(editIcon);
            div2.appendChild(deleteIcon);
            div1.appendChild(div2);

            li.classList.add('comment');
            li.appendChild(div1);
            const section = document.querySelector('.comment_data');
            
            ul.appendChild(li);
            section.appendChild(ul);
        })
        .catch(err => console.log(err))
}

// Create page with post data
function createPage (data, comments) {
    const h2 = document.createElement('h2');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p')
    const ul = document.createElement('ul');
    const ul2 = document.createElement('ul');
    const div = document.querySelector('.post_data');

    if (!data) {
        p1.textContent = 'Post not available';
        div.appendChild(p1);
    }

    ul.classList.add('.comment_data');

    h2.textContent = data.title;
    p2.textContent = data.text;

    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);
    
    if (comments.length <= 0) {
        const li = document.createElement('li');
        li.textContent = 'Nothing to see here. Wanna comment?';
        const section = document.querySelector('.comment_data');
        
        ul2.appendChild(li)
        section.appendChild(ul);
        div.appendChild(section);
    } else {
        // Loop through and display each comment
        comments.forEach(comment => {
            createPageComments(comment, ul2);
        });
    }
};

const postID = localStorage.getItem('postID');

// Get post data
getPostData(postID)
    .then(post => {
        if (post.comments.length >= 0) {
            Comment().getComments(postID)
                .then(comments => createPage(post, comments))
                .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))

// Get post comments
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    getPostData(postID)
        .then(post => {
            Comment().createComment(post);
            e.target.submit();
        })
        .catch(err => console.log(err))
});

// Edit comment function
function editComment(data, comment) {
    const commentElement = data
        .parentElement
        .parentElement
        .parentElement


    const text = commentElement.childNodes[0].wholeText;
    const container = commentElement.childNodes[1].outerHTML.toString();
    commentElement.innerHTML = 
    `<form class="textComment_form">
        <textarea class="text">${text}</textarea>
        <button type="submit" class="edit">Edit</button>
        <button class="cancel">Cancel</button>
    </form>${container}`;


    const cancel = document.querySelector('.cancel');
    cancel.onclick = () => {
        window.location.href = `post_page.html`;
    }

    const form = document.querySelector('.textComment_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        Comment().updateComment(document.querySelector('.text').value, comment._id, postID)
            .then(() => e.target.submit())
            .catch(err => {
                if ((err.status === 403) && document.querySelector('.one')) {
                    return;
                }

                const span = document.createElement('span');
                span.style.color = 'red';
                span.classList.add('one');

                if (err.status === 403) {
                    span.textContent = 'Something went wrong';
                    commentElement.appendChild(span);
                } else {
                    span.textContent = 'Not authorised: you cannot edit this comment';
                    commentElement.appendChild(span);
                }
            });
    });
}

