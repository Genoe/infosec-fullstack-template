# Fullstack evaluation template
This repo is for a take-home project given out for an interview.
The app follows the template given. Instructions to run are in the section below.
On the backend, PHP is used to fetch data from the REST Countries API, get the needed values, and 
sort by population in descending order. On the frontend, React.js (along with Babel) is used to handle state and make
a simple single-page application. The Axios libray is used to make HTTP requests to the backend.
Bootstrap CSS is used to create a basic UI that works well on different screen sizes. 
## How to use
To start the server open a terminal window on unix/linux based systems and change
directory to the project root. Then execute this command:

```
  ./server
```

The command assumes you have a PHP binary in your system path. If you don't you
will get an error and the server will not start.

After starting the server go to:

```
http://localhost:8765/index.html  
```
