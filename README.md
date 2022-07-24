# Support-desk

Support-desk is a MERN application, where you can be helped from the stuff about any technical problem with your devices.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

[here is the Demo](https://reemasupportdesk.herokuapp.com/)

## 1. Setup

First, to setup all the directories run the following in the main directory:

`npm install`

This command will install small libraries needed for running the rest of the commands.

### In the main directory there is `.env` file. Create this file. And fill in those values:

- NODE_ENV=development
- PORT=5000
- MONGO_UI= Your mongodb connect string
- JWT_SECRET= Your Jason Web Token Secret Variable.

To run the app in dev mode you can run the following command in the main directory:

`npm run dev`

## 2. Code structure

```
client
├── public
└── src
|   └── app
|       └── store.js
|   └── components
|   └── features
|       └── authentication
|       └── notes
|       └── tickets
|   └── hooks
|   └── pages
|   app.jsx
|   index.jsx
|   index.css
|   setupProxy.js
server
└── config
└── controllers
└── middleware
└── models
└── routes
    index.js
```

### 2.1 Client structure

- `public` || public facing client code
- `src/app/store.js` || where we have our store manager for the whole app.
- `src/components` || all of the shared components that are used over pages.
- `src/features ` || the store manager slices and services that are coming from server.
- `src/hooks/useAuthStatus.jsx` || checks if user exists and used in the private routes.
- `src/pages` || the pages components of the app, any routing will go between these components.

### 2.3 Server structure

- `config` || configuration for the database
- `controllers` || all of our controller functions that interact with the database
- `middleware` || handling errors middleware and protect middleware for private routes.
- `models` || all of `mongoose` models will be placed here
- `routes` || code to match up the API with controllers
- `index.js` || the start point of the server
