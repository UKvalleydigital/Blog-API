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

    const updateComment = async (text, commentID, postID) => {
        const url = `http://localhost:3000/comment_update/`;

        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ text, commentID, postID }),
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        const json = await response.json();
        if (json.error) {
            console.log(json);
        }

        return json;
    };

    const deleteComment = async () => {
        const url = `http://localhost:3000/comment_delete`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        const json = await response.json();
        if (json.error) {
            console.log(json);
        }

        const deletedComment = json.deletedComment;
        if (deletedComment) {
            return;
        } else {
            return { msg: 'Server connected, failure in frontend' }
        }
    };

    return { getComments, createComment, updateComment, deleteComment };
};