# Blog App
This is a full stack blog website. You can create, edit and delete accounts, posts and comments. 

## Brief structure for frontend directory:

! [.gitignore
README.md
backend
   |__ app.js
   |__ /bin
   |__ /config
   |   |__ passport.js
   |__ /controllers
   |   |__ commentController.js
   |   |__ postController.js
   |   |__ userController.js
   |__ /models
   |   |__ comment.js
   |   |__ post.js
   |   |__ user.js
   |__ package-lock.json
   |__ package.json
   |__ /public
   |
   |__ /routes
   |   |__ comments.js
   |   |__ index.js
   |   |__ posts.js
   |   |__ users.js
/frontend
   |__ package-lock.json
   |__ package.json
   |__ /website
   |   |__ home.html
   |   |__ login.html
   |   |__ post_page.html
   |   |__ /scripts
   |   |   |__ /elements
   |   |   |__ home.js
   |   |   |__ login.js
   |   |   |__ post_page.js
   |   |   |__ sign-up.js
   |   |__ sign-up.html
   |   |__ /styles
   |   |   |__ default.css
   |   |   |__ form.css
   |   |   |__ page.css
   |   |   |__ post.css]

## How to use
- The home page allows you to view recent posts.
- Go to the register page if you would like to create an account. Input your details and submit. This will redirect you back to the home page.
- Go to the login page if you have already created an account.
- Click on posts to redirect to a page specific to that posts, and view comments on it.

### Once logged in:
- A profile will show up on the top right side of your screen.
- You can create, edit, or delete your own posts.
- View your posts on the home page.
- You can create, edit, or delete your own comments.
- Click the logout button on your profile to logout.

## Run locally on your own computer:

Run these commands in your terminal:
> cd backend < br/>
> npm run start < br/>

Open home.html file in browser < br/>

## Screenshots:


