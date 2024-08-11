export default function User () {
    const colorArray = ['pink', 'peachpuff', 'lightgoldenrodyellow', 'palegreen',
    'paleturquoise', 'lightskyblue', 'thistle'];

    const getProfileInfo = async () => {
        const url = 'http://localhost:3000/profile_info/';
        const response = await fetch(url, { 
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const json = await response.json();

        if (json.error) {
            throw new Error(json.msg);
        }

        const email = await json.email;
        return email;
    };

    const getUser = async (id) => {
        const url = 'http://localhost:3000/user_get';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ id })
        })

        const json = await response.json();

        if (json.error) {
            throw new Error(json.msg);
        }

        const user = await json.user;
        return user;
    }
    
    const createUserProfile = (email) => {
        const container = document.createElement('div');
        container.classList.add('profile_container');
        
        const div = document.createElement('div');
        div.classList.add('profile');
        const initial = email[0];
        div.textContent = initial;
        
        const index = randomIntFromInterval(0, colorArray.length - 1);
        
        if (!localStorage.getItem('color')) {
            div.style.backgroundColor = colorArray[index];
            localStorage.setItem('color', colorArray[index]);
        } else {
            div.style.backgroundColor = localStorage.getItem('color');
        }

        const logOutButton = document.createElement('button');
        logOutButton.type = 'submit';
        logOutButton.textContent = 'Log out?';
        logOutButton.classList.add('log_out');
        logOutButton.onclick = logOut;

        container.appendChild(div);
        container.appendChild(logOutButton);

        const ul = document.querySelector('.header_list');
        ul.appendChild(container);
    };

    const getUserPosts = async () => {
        const url = 'http://localhost:3000/user_posts/'
        const response =  await fetch(url, { 
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        const json = await response.json();
        if (json.error) {
            throw new Error(json.msg);
        }

        const posts = await json.posts;
        return posts;
    }

    return { getProfileInfo, getUser, createUserProfile, getUserPosts };
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function logOut() {
    localStorage.clear();
    window.location.href = 'home.html';
}
