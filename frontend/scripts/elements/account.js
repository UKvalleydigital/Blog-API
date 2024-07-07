export default function User () {
    let userPostList = [];
    const returnUserPosts = () => userPostList;

    const createUserProfile = () => {
    };

    const getUserPosts = () => {
        const url = 'http://localhost:3000/user_posts'
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(res => res.posts)
            .then(posts => userPostList.push(posts))
            .catch(err => console.log(err));
    }

    return { createUserProfile, getUserPosts, returnUserPosts };
}