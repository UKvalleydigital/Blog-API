export default function Comment () {
    const getComments = async (postID) => {
        const data = { postID };
        const url = `http://localhost:3000/comments_post`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const json = await response.json();
        const comments = await json.postComments;

        return comments;
    };

    const createComment = async (post) => {
        const url = `http://localhost:3000/comment_form`;
        const text = document.querySelector('#comment').value;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ post, text }),
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const json = await response.json();
        console.log(json);
    };

    const updateComment = async (commentID) => {
        const url = `http://localhost:3000/comment_update/`;

        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ commentID }),
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        const json = await response.json();
        if (json.error) {
            console.log(json);
        }

        return json;
    };

    const deleteComment = async (commentID) => {
        const url = `http://localhost:3000/comment_delete`;

        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify({ commentID }),
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        const json = await response.json();
        if (json.error) {
            console.log(json);
        }

        return json;
    };

    return { getComments, createComment, updateComment, deleteComment };
};