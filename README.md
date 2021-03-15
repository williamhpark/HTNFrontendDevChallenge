# Hack the North 2021 Frontend Developer Challenge

My submission for the Hack the North 2021 Frontend Developer Challenge.  
**URL:** https://htn-frontend-challenge.herokuapp.com/

## Tech Stack

**Front end:** React  
**Back end:** Node.js/Express.js  
**Database:** MongoDB  
Deployed using Heroku.

## Writeup

### How did you plan out the structure and design of it?

My first step when creating web applications or websites is to list out some of the pages and components I know I'll need for the project and set up a basic template for them. For example, from reading the challenge description for this project, I knew that a few of the components/pages I would need were a header component, a search bar component, and login/register pages. After setting up my project directory structure and configuring all the URL routes I needed using React Router, I began defining state for each page based on the functionality I wanted for each page. For instance, I knew that the main page would display all or part of the data fetched from the Hack the North API, so I defined an "events" state variable in the Event List Page which stores all the data. Then, I began implementing the smaller components, such as the search bar and the keyword tags, so I could use them in the bigger page components.  
For the aesthetic side of the project, I mostly went off of the Hack the North website to give me inspiration for the UI. I tried to match the theme and several UI elements on my site with the Hack the North site as best I could.

### How did you decide on the tools you've used?

I decided to use the tools that I'm most familiar with. React is my go-to choice for creating interactive UIs, so it was a no-brainer to use it to create the site's front end. On the back end side, one of my past personal projects required authentication (login/register) and I used Node.js/MongoDB to accomplish that, so I decided to use some of the code I wrote for that project and integrate it into this one. This is called the MERN stack, and I like using this stack because of its relative ease of use compared to some other tech stacks I've had exposure to. Node.js and MongoDB, especially, integrate very well together.  
I deployed the application using Heroku because with Heroku you can deploy a front end as well as a Node server, which you can't do with some services like GitHub Pages.

### Did you encounter any problems? And if so, how did you solve them?

The biggest issue I ran into was during deployment. While running the application locally during development, I had no issues retrieving data from the Hack the North API that was provided for this project. However, once I tried deploying to Heroku, I kept getting a CORS (Cross-origin resource sharing) error, and as a result, none of the API data would get displayed. I tried building a proxy in my Node.js internal server, but after fiddling with it for around an hour I still couldn't get it to work. So, I ended up following a tutorial I found online where I used Heroku to create a proxy server that adds CORS headers to a request, so I could make GET requests to the Hack the North API through the proxy server I set up. This ended up working, but apparently, this method can cause latency when retrieving the data, which isn't ideal.

### Are there any areas of your code that you're particularly proud of or want to point out?

Logging in and registering is completely functional, so try that out! You also don't have to worry about me seeing or accessing your password because I used the bcryptjs library to hash the passwords stored in the database. The passwords stored in MongoDB aren't readable to me or anyone else with access to the database, even though password verification still works as expected.  
On the front end, I'm proud of my attention to detail for the Event List Page (the main page). I took the time to brainstorm some potential edge cases and test the site to make it as easy for the user to use as possible, so test out the keyword search and event type drop down both while logged in and not logged in. I also made the site responsive on mobile devices using CSS Media Queries.

### Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event?

I would definitely improve the UI. Although I'm generally happy with how the UI turned out, I can definitely make it less plain by adding more images and animations.  
I also need to handle edge cases better, both on the front end and the back end. For example, on the front end I decided not to consider the edge case where an event could run over the course of two days (e.g. January 3, 11pm - January 4, 12am) since none of the events from the provided data set were like this. Even so, the case should be taken into consideration.  
As I mentioned in a previous question, I would also build my own proxy in my Node.js server to retrieve data from the Hack the North API instead of creating a proxy server using Heroku, to reduce latency when retrieving data.
