# NodeJS-Express-MongoDB-App
The project aims to build a web application with Node.JS, Express, MongoDB, and Mongoose. The application includes the RESTful API and the CRUD operations to let customers make reservations and update the form. The project contains a service class to provide access to the various routes. It also integrates preflights, mimetypes, and CORS to ensure smooth transitions between the pages. 

**Run Application** 
| Command                     | Overview                                          |
| --------------------------- | --------------------------------------------------|
| `mkdir express_project`     | Create a new directory called express_project     |
| `cd express_project`        | Change the directory to express_project           |
| `npm init -y`               | Initializes new package.json for Node.js project  |
| `npm install express pug`   | Create a express application with pug template    |
| `npm start`                 | Run the start script in the package.json file     |
| `pm2 start npm -- start`    | Pm2 lets the application to run in the background |
| `express --view=pug project`| Utilize express-generator to create a new project |

**DEMO**

Run Express App on local server: http://localhost:8080 <br>
Test the REST API with the following URL: http://api/users:8080 <br>
![Video Demo](public/assets/video.gif)
