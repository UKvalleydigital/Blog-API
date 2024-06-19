export default function Post () {
    let postList = [];
    const returnPosts = () => postList;

    const createPost = () => {
        const list = document.createElement('ul');
        const point = document.createElement('li');
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