//Here bellow starts the requirements of your app as well as the server starting

/**REMEMBER TO UNCOMMENT EVERYTHING YOU NEED */

const db = require("./db/db");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
//const propiedadesRouter = require("./routes/propiedades");
const passport = require("passport");
const session = require("express-session");
const Router = require("./routes/index"); 

//Find the meaning of...
app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
//...this code

app.use("/", Router);


app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/public/" + "index.html");
}); //send the html file to render it

//Passport config starts here...
app.use(express.static("public"));

//session() is used before passport.session() to ensure that the login session is restored in the correct order:
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//In order to support login sessions (with the unique cookie of the session), Passport will serialize and deserialize user instances to and from the session:
app.use(passport.initialize());
app.use(passport.session());
//and ends here

//Syncronize db and run the server:
db.sync({
  logging: false,
  force: false
})
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is listening on port 3000!");
    });
  })
  .catch(console.error);
