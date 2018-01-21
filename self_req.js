const request = require("request");

request(
    {
        url: "http://localhost:8000/json",
        json: true
    },
    (error, response, body) =>
    {
        console.log(body);
    }
);