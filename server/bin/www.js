if (process.env.NODE_ENV !== "production") require("dotenv").config();
const port = process.env.PORT || 3000;
const app = require("../app");

app.listen(port, () => {
    console.log("listening on port", port);
});
