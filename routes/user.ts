import { Router } from "https://deno.land/x/oak/mod.ts";
import userController from "../controllers/UserController.ts"
// import { v4 } from "https://deno.land/std/uuid/mod.ts";

const router = new Router();

router.get('/',userController.getId)
.post('/insc',userController.postData)
.post('/signup',userController.signUp)
.patch('/updateuser/:id',userController.updateData)
.delete('/delete/:id',userController.deleteUser)

  export default router