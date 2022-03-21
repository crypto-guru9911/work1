var express = require("express");
var path = require("path");
var cros = require("cors");

var app = express();

app.use(express.json());
app.use(cros());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/users", function (request, response) {
  try {
    const query = request.query.query;
    if (query) {
      response.send({
        result: "success",
        users: users.filter(
          (user) =>
            user.firstName
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()) ||
            user.lastName
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()) ||
            user.email.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        ),
      });
    } else {
      response.send({ result: "success", users: users });
    }
  } catch (error) {
    response.send({ result: "fail", message: "Unknown error" });
  }
});

app.get("/users/:id", function (request, response) {
  try {
    const user = users.find((user) => user.id === request.params.id);
    if (user) {
      response.send({ result: "success", user: user });
    } else {
      response.send({ result: "fail", message: "User doesn't exist" });
    }
  } catch (error) {
    response.send({ result: "fail", message: "Unknown error" });
  }
});

app.post("/users", function (request, response) {
  console.log(request.body);
  try {
    users.push({ id: `${new Date().getTime()}`, ...request.body });
    response.send({
      result: "success",
      message: "User created successfully.",
      users: users,
    });
  } catch (error) {
    response.send({ result: "fail", message: "Unknown error" });
  }
});

app.get("/", function (request, response) {
  response.sendFile("/sandbox/views/index.html");
});

// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});

// TEMP USER LIST
let users = [
  {
    id: new Date().getTime().toString(),
    firstName: "Luisa",
    lastName: "Stokes",
    email: "luisa.stokes@gmail.com",
  },
];
