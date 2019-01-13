require("dotenv").config();
const Koa = require("koa");

const logger = require("./logger.js");
const endpoint = require("./endpoint");

const app = new Koa();
const PORT = 8002;

app.use(endpoint.routes()).use(endpoint.allowedMethods());

app.use(async (ctx, next) => {
    ctx.state.logger = logger;
    logger.info(ctx.method, ctx.url);
    await next();
    logger.info(ctx.body);
});

app.on("error", (err, ctx) => {
    logger.error(err);
    logger.info(ctx);
});

const server = app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));

module.exports = server;
