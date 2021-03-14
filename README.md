# Hack the North 2021 Frontend Developer Challenge

My submission for the Hack the North 2021 Frontend Developer Challenge.  
**URL:** https://htn-frontend-challenge.herokuapp.com/

## Tech Stack

**Frontend:** React  
**Backend:** Node.js/Express.js  
**Database:** MongoDB  
The project was deployed using Heroku.

## Writeup

### How did you plan out the structure and design of it?

My first step when creating web applications or websites is to list out some of the pages and components I know I'll need for the project. For example, from reading the challenge description for this project, I knew that a few of the components/pages I would need were a header component, a search bar component, and login and register pages. After setting up my project directory structure and setting up all the URL routes I needed using React Router, I began defining state for each page based on the functionality I wanted for each page. For instance, I knew that the main page would display all or part of the data fetched from the Hack the North API, so I defined an "events" state variable in the Event List Page which stores all the data. Then, I began implementing the smaller components, such as the search bar and the keyword tags, so I could use them in the bigger page components.  
For aethetic inspiration, I mostly went off of the actual Hack the North website to give me ideas for the UI. I tries to match the theme and several UI elements as best I could.

### How did decide on the tools you've used?

I decided to use the tools that I'm most familiar with. React is my go-to choice for creating interactive UIs, so it was a no-brainer to use it for the front end. Also, one of my past personal projects required authentication (login/register) and I used Node.js/MongoDB to accomplish that, so I decided to use some of the code I wrote for that project and implement it into this one. This is called the MERN stack, and I like using this stack because of its relative ease of use compared to some other teach stacks I've had exposure to. Node.js and MongoDB, expecially, integrate very well together.  
I deployed teh application using Heroku because with Heroku you can deploy a front end as well as a Node server, which you can't do with some services like Github pages and Netlify.

### Did you encounter any problems? And if so, how did you solve them?

The biggest issue I ran into was during deployment. While running the application locally during development, I had no issues retreiving data from the Hack the North API that was provided for this project. However, once I tried deploying to Heroku, I kept getting a CORS orgin error. I tried setting up a proxy in my Node.js internal server, but I couldn't get it to work. I ended up following a tutorial I found online where I created.

### Are there any areas of your code that you're particularly proud of or want to point out?

Logging in and registering is completely functional. You also don't have to worry about me seeing your password, because I used bcryptjs to hash the passwords stored in the database. The passwords stored in MongoDB are not readable to myself or anyone else with access to the database, even though password verification still works as expected.  
On the frontend, I'm proud of my attention to detail for the Event List Page (the main page). I took the time to brainstorm some potential edge cases and test the site to make it as easy for the user to use as possible. I also made the site mobile-responsive using CSS Media Queries.

### Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event?

I would definitely improve the UI. Although I'm generally happy with how the UI turned out, I can definitely make it less plain.  
I also need to handle edge cases better, both on the front end and the back end. For example, in several of the routes in my Node.js server, I don't consider
