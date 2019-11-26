# Whiteboard

## Overview

Sometimes you wanna draw. Sometimes your friends wanna draw. And sometimes, you and your friends want to draw together! But other times you just need to share a board with some colleagues to keep track of important tasks.

Whiteboard is a web app that will allow users to draw on an online whiteboard together in real-time, with the option of drawing solo as well.  Users can register and log in. Unregistered users are able to use a whiteboard with others, but only registered users are able to save their boards with the option to view, edit, or delete them as they please.


## Data Model

The application will store Boards and Notes

* each board has a note attached by reference

An Example Note:

```JavaScript
{
  title: "the title",
  noteBody: "the body"
}
```

An Example Board:

```JavaScript
{
  board: , // the saved board in base64
  createdAt: // timestamp
  notes: Note
}
```

## [Link to Commented First Draft Schema](src/db.js)


## Wireframes

/home - page for user managing boards

![home](documentation/_home.jpg)

/draw - page for solo/collaborative whiteboard

![list](documentation/_draw.jpg)

/register - page for user registration/login

![register](documentation/_register.jpg)

## [Site map](documentation/sitemap.jpg)

## User Stories or Use Cases

1. As a user, I can start a new board and draw in real-time
2. As a user, I can export my boards as images
3. As a user, I can see my notes in a list
4. As a user, I can search through my notes by title

## Research Topics

* (4 points) Integrate drawing tool
    * p5.js for canvas
    * different brush tools - size, color, clear

* (4 points) Integrate real-time communication
    * Socket.io for real-time communication
    * Live canvas

* (3 points) Perform client side form validation using a JavaScript library
    * Will be a search bar based on titles

* (2 points) Use CSS framework
    * Bootstrap MD as framework


## [Link to Initial Main Project File](src/app.js)

## Annotations / References Used
