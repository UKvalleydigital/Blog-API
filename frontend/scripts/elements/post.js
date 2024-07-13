function Post () {
    let postList = [];
    const returnPosts = () => postList;

    const createPost = () => {
        const form = document.querySelector('.post_form');
        if (!form) return;

        const create = document.querySelector('create');
        create.addEventListener('submit', (e) =>{
            e.preventDefault();

            const comments = [];
        })

        // To be continued...
    };

    const getPosts = () => {
        const url = `http://localhost:3000/posts`
        fetch(url, { method: 'GET', mode: 'cors' })
            .then(res => res.json())
            .then(res => res.allPosts)
            .then(posts => postList.push(posts))
            .catch(err => console.error(err));
    };

    return { createPost, getPosts, returnPosts };
};

function givePostForm (e) {
    e.preventDefault();

    const postArray = [
        { name: 'Title', input: 'text' },
        { name: 'Published', input: 'checkbox' },
        { name: 'Text', input: 'text' }
    ];

    const add = document.querySelector('#create');
    add.style.visibility = 'hidden';

    const div = document.createElement('div');
    div.classList.add('form_container');

    const form = document.createElement('form');
    form.method = 'POST';
    
    postArray.forEach(element => {
        const label = document.createElement('label');
        let input = document.createElement('input');
        let boolean = true;
        
        label.for = element.name;
        label.textContent = `${element.name}: `;

        if (element.input === 'text') {
            input = document.createElement('textarea');
            input.name = element.name;
            boolean = false;
        }

        input.id = element.name;
        if (boolean) input.type = element.input;
        
        form.appendChild(label);
        form.appendChild(input);
    });

    const create = document.createElement('button');
    create.classList.add('create');
    const cancel = document.createElement('button');
    cancel.onclick = deletePostForm;

    create.textContent = 'Create';
    cancel.textContent = 'Cancel';

    form.appendChild(create);
    form.appendChild(cancel);
    form.classList.add('post_form');

    div.appendChild(form);
    document.body.appendChild(div);
}

function deletePostForm (e) {
    e.preventDefault();

    const add = document.querySelector('#create');
    add.style.visibility = 'visible';

    const div = document.querySelector('.form_container');
    div.remove();
}

export { Post, givePostForm, deletePostForm };