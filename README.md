# Project LGCDevChallenge

## Introduction

 LetsGetChecked Front End Coding Challenge for Angular Developer

## Project Setup

 npm install

## Run Project

 npm run start

 ## Tests

 npm run test

## Description

The objective is to develop an web application which interacts with a database through a REST API to present a list of blog posts and related comments.
The application should present the list of blog posts in the main page and then, when a post is selected, the contents of the post are presented as well as the list of related coments. 

Following a thorough analysis of the data provided, other requirements came to light, the field slug be used on SEO friendly urls, the way comments are linked doesn’t limit how they are related, meaning that there came be an infinity of comments within comments. Also, given the fact that the interface not only allow adding new comments but also update the ones thar already exist this operation was also address.

To address SEO friendly urls the angular routing with parameters feature was used, fecthing the post slug id from the url to get the post information. 
To be able to present the comments struture with no limits, although the interface will impose its graphic limitations eventually, a new structure was divise to allow lists of comments within comments. It starts with an array of comments where each comment object can have a new array with a list of comments and so on...   

## Resources

This is application was developed to address the requirements of the Front End coding challenge, it was developed using the following tecnologies

    * NodeJs 16 
    * Angular 13
    * rxjs 7.4
    * Typescript 4.5.4
    * postcss 8.4
    * Tailwindcss 3

## Presentation 

The application is based on 5 functional components and an auxiliary one to deal with not-found addresses, there are also two services, the main one “DataInterfaceService” handles the REST API calls and builds the internal comments structure that passes on to the components. By using routing-module resources, the app is divided in three different sections where the components lay. 

Main Layer (app.component)

Given the simplicity of the application and its objective, the header and footer are part of the component template, in the middle is the router-outlet where other layers components will be rendered. 

Top Layer (posts-list.component)

This component corresponds to the landing page, reaches out to data interface service to get the list of posts, each post details are presented on clickable section that will allow the selection of a specific post to show its contents and comments.

Inner Layer (posts-item.component, comments-list.component, comments-form.component)

Using these three components the app shows all details and contents of the post as well as the comments structure, to show all the comments the comments-list component will call itself in a recursive fashion, each comment level will have a add button to trigger comments-form for a new comment, and each comment has a button to update its contents and username  using the same form.component. To avoid having several forms open, a simple util-interface service provides a subject that informs the state of the form window and with it synchronizes the button accessibility.

Carlos Barata, Apple Beach, January 2022