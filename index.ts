import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routes/user.ts';
import { config } from "https://deno.land/x/dotenv/mod.ts";

const app = new Application();

const env= config()
app.use(router.routes());
app.use(router.allowedMethods());


// const port = 8000
console.log(`server run on port ${env.PORT}`)

await app.listen( {port :+env.PORT});
