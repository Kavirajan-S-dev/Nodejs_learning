const app = require("./index");

const { PORT, HOST } = process.env;

app.listen(PORT, HOST, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Success");
});