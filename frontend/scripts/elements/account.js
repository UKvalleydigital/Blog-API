export default function User () {
    const getProfileInfo = async () => {
        const url = 'http://localhost:3000/profile_info/';
        const response = await fetch(url, { 
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const json = await response.json();

        if (json.error) {
            console.log(response);
        }

        const email = await json.email;
        return email;
    };

    const createUserProfile = (email) => {
        const container = document.createElement('div');
        const div = document.createElement('div');

        div.classList.add('profile');
        const initial = email[0];
        div.textContent = initial;

        let array = [];
        const p = document.createElement('p');
        if (email.length > 6) {
                for (let i = 0; i < email.length; i++) {
                if (email[i] === '@') break;
                array.push(email[i]);
            }
        } else {
            array = email.split('');
        }

        let name = array.join('');
        p.textContent = name;

        container.appendChild(div);
        container.appendChild(p);

        const ul = document.querySelector('.header_list');
        ul.appendChild(container);
    };

    const getUserPosts = async () => {
        const url = 'http://localhost:3000/user_posts/'
        const response =  await fetch(url, { 
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message)
        }

        const json = await response.json();
        const posts = await json.posts;
        return posts;
    }

    return { getProfileInfo, createUserProfile, getUserPosts };
}

