export default function User () {
    let userPostList = [];
    const returnUserPosts = () => userPostList;

    let userEmail = null;
    const returnEmail = () => userEmail;

    const getProfileInfo = () => {
        const url = 'http://localhost:3000/user_profile_info';
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(res => res.email)
            .then(email => userEmail = email)
            .catch(err => console.log(err));
    };

    const createUserProfile = () => {
        const email = returnEmail();
        const container = document.createElement('div');
        const div = document.createElement('div');

        div.classList.add('profile');
        const initial = email[0];
        div.textContent = initial;

        let array = [];
        const p = document.createElement('p');
        for (let i = 0; i < email.length - 1; i++) {
            if (email[i] === '@') break;
            array.push(email[i]);
        }

        let name = array.toString();
        p.textContent = name;

        container.appendChild(div);
        container.appendChild(p);

        const ul = document.querySelector('.header_list');
        ul.appendChild(container);
    };

    const getUserPosts = () => {
        const url = 'http://localhost:3000/user_posts'
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(res => res.posts)
            .then(posts => userPostList.push(posts))
            .catch(err => console.log(err));
    }

    return { getProfileInfo, returnEmail, createUserProfile, getUserPosts, returnUserPosts };
}