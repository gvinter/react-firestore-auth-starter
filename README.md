This is a boilerplate for a React (CRA) + Firestore project that includes Firebase authentication.

## Features

- uses:
  - React (create-react-app)
  - firestore
  - react-router
- features:
  - Sign In
  - Sign Up
  - Sign Out
  - Password Forget
  - Password Change
  - Verification Email
  - Protected Routes with Authorization
  - Roles-based Authorization
  - Social Logins with Google, Facebook and Twitter
  - Linking of Social Logins on Account dashboard
  - Auth Persistence with Local Storage
  - Database with Users and Messages

## Installation

- `git clone git@github.com:the-road-to-react-with-firebase/react-firestore-authentication.git`
- `cd react-firestore-authentication`
- `npm install`
- `npm start`
- visit http://localhost:3000

### Firebase Configuration

- copy/paste your configuration from your Firebase project's dashboard into one of these files
  - _src/components/base/Firebase/firebase.js_ file
  - _.env_ file
  - _.env.development_ and _.env.production_ files

The _.env_ or _.env.development_ and _.env.production_ files could look like the following then:

```
REACT_APP_API_KEY=AIzaSyBtxZ3phPeXcsZsRTySIXa7n33NtQ
REACT_APP_AUTH_DOMAIN=react-firebase-s2233d64f8.firebaseapp.com
REACT_APP_DATABASE_URL=https://react-firebase-s2233d64f8.firebaseio.com
REACT_APP_PROJECT_ID=react-firebase-s2233d64f8
REACT_APP_STORAGE_BUCKET=react-firebase-s2233d64f8.appspot.com
REACT_APP_MESSAGING_SENDER_ID=701928454501
```

Then activate the sign-in methods: Email/password, Google, Facebook, Twitter.

### Activate Verification E-Mail

- add a redirect URL for redirecting a user after an email verification into one of these files
  - _src/components/base/Firebase/firebase.js_ file
  - _.env_ file
  - _.env.development_ and _.env.production_ files

The _.env_ or _.env.development_ and _.env.production_ files could look like the following then (excl. the Firebase configuration).

**Development:**

```
REACT_APP_CONFIRMATION_EMAIL_REDIRECT=http://localhost:3000
```

**Production:**

```
REACT_APP_CONFIRMATION_EMAIL_REDIRECT=https://mydomain.com
```

### Security Rules

```
service cloud.firestore {
  match /databases/{database}/documents {

    // Custom functions
    function signedIn() {
        return request.auth != null;
    }

    function isAdmin() {
        return signedIn() &&
        	'ADMIN'in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles.values();
    }

    function isOwner() {
        return signedIn() && request.auth.uid == resource.data.userId;
    }

    function isSelf() {
    	    return signedIn() && request.auth.uid == resource.id;
    }

    // Rules
    match /users/{userId} {
        allow list: if isAdmin();
    	   allow get, update, delete: if isSelf() || isAdmin();
    	   allow create: if signedIn();
    }

    match /messages/{messageId} {
        allow read: if signedIn();
        allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
        allow update, delete: if signedIn() && isOwner();
    }
  }
}
```

---

This is an augmented version of [`react-firestore-authentication`](https://github.com/the-road-to-react-with-firebase/react-firestore-authentication) boilerplate by Robin Wieruch.
