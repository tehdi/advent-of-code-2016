module.exports = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Advent of Code 2016",
            version: "1.0.0"
        },
        servers: [
            { "name": "local", "url": "http://localhost:12016" }
        ]
    },
    apis: [
        "./routes/*.js"
    ]
};
