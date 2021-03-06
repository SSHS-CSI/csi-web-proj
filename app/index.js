const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const Koa = require("koa");
const session = require("koa-session");

const logger = require("./logger.js");
const api = require("./api");

const app = new Koa();
const PORT = process.env.PORT || 8000;

app.keys = ["key"];

app.use(async (ctx, next) => {
    ctx.state.logger = logger;
    logger.info(ctx.method, ctx.url);
    await next();
    logger.info(ctx.body);
});

app.use(session(app));
app.use(api.routes());
app.use(api.allowedMethods());

app.on("error", (err, ctx) => {
    logger.error(err);
    logger.info(ctx);
});

const server = app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));

module.exports = server;
