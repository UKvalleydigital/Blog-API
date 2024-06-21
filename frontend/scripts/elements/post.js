function Post () {
    let postList = [];
    const returnPosts = () => postList;

    const createPost = () => {

    };

    const getPosts = () => {
        const url = `http://localhost:3000/posts`
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(res => res.allPosts)
            .then(res => postList.push(res));
    };

    return { createPost, getPosts, returnPosts };
};

function givePostForm () {
    const postArray = [
        { name: 'Title', input: 'text' },
        { name: 'Published', input: 'checkbox' },
        { name: 'Text', input: 'text' }
    ];

    const form = document.createElement('form');
    
    postArray.forEach(element => {
        const label = document.createElement('label');
        const input = document.createElement('input')

        label.for = element.name;
        label.textContent = `${element.name}: `;
        input.id = element.name;
        input.type = element.input;

        if (input.type === 'radio') input.value = 'True';
        
        form.appendChild(label);
        form.appendChild(input);
    });

    const create = document.createElement('button');
    const cancel = document.createElement('button');
    cancel.onclick = deletePostForm;

    create.textContent = 'Create';
    cancel.textContent = 'Cancel';

    form.appendChild(create);
    form.appendChild(cancel);
    form.classList.add('post_form');

    document.body.appendChild(form);
}

function deletePostForm () {
    const form = document.querySelector('.post_form');
    form.remove();
}

export { Post, givePostForm, deletePostForm };