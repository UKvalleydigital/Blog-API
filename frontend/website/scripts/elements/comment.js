export default function Comment () {
    const getComments = async (postID) => {
        const data = { postID };
        const url = `http://localhost:5000/comments_post`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const json = await response.json();
        if (json.error) {
            throw new Error(json.msg);
        }

        const comments = await json.postComments;
        return comments;
    };

    const createComment = async (post) => {
        const url = `http://localhost:5000/comment_form`;
        const text = document.querySelector('#comment').value;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ post, text }),
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const json = await response.json();
        if (json.error) {
            throw new Error(json.msg);
        }
        console.log(json);
    };

    const updateComment = async (text, commentID) => {
        const url = `http://localhost:5000/comment_update/`;

        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ text, commentID }),
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        const json = await response.json();
        if (json.error) {
            throw new Error(json.msg);
        }

        return json;
    };

    const deleteComment = async (commentID, postID) => {
        const url = `http://localhost:5000/comment_delete`;

        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify({ commentID, postID }),
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        
        const json = await response.json();
        if (json.error) {
            throw new Error(json.msg);
        }

        return json;
    };

    return { getComments, createComment, updateComment, deleteComment };
};