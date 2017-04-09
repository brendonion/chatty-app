

### Project Description


## Goal

Chatty will allow users to communicate with each other without having to register accounts. It will use React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

![Final ChatyApp](http://d.pr/i/uwnJ/2burf8M1+)

## Functional Requirements

*   Primarily a client-side SPA (single-page app) built with ReactJS

    *   Based on the HTML and CSS provided
    *   Contains a chat log displaying messages and notifications
    *   Contains an input field to change your name and an input field to send a message
*   The client-side app communicates with a server via WebSockets for multi-user real-time updates
*   No persistent database is involved; the focus is on the client-side experience

Behaviour:

*   When any connected user sends a chat message, all connected users receive and display the message
*   When any connected user changes their name, all connected users are notified of the name change

    *   Notifications are styled differently from chat messages
*   Header will display the count of connected users
*   When the number of connected users changes, this count will be updated for all connected users
*   (STRETCH) Different users' names will each be coloured differently

    *   Bonus: the colouring is consistent between connected user instances or is calculated algorithmically based on their name, or is manually selectable by users, or any other interesting approach!

## Technical Specifications

Stack:

*   Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
*   WebSockets using Node package `ws` on the server-side, and native `WebSocket` on client side
*   ReactJS
