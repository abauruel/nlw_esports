import express from "express";

const app = express();

const port = process.env.PORT ?? 3333;
app.listen(port, () => console.info(`app running on ${port} port`));
