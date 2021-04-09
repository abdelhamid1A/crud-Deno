import db from '../config/db.ts';
// import Bson from '../config/db.ts';
import { Bson } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import User from '../models/User.ts'


import { Context } from 'https://deno.land/x/oak/mod.ts'

interface Usershema {
  _id: { $oid: string };
  name: string;
  email: string;
  password: string;
}

const user = db.collection("users")
export default{
     
    async getId({ request, response }: { request: any; response: any }){
            // request.response.body=request.params.id;
            
          //  const data = await User.all()
           const data = await user.find()
           response.body = data

           
    },

   async postData  ({ request, response }: Context) {
        const body = await request.body(); //Returns { type: "json", value: Promise { <pending> } }
        if (!request.hasBody) {
          response.status = 400;
          response.body = { message: "No data provided" };
          return;
        }
        const values = await body
        // let newQuote: Quote = {
        //   id: v4.generate(),
        //   philosophy: values.philosophy,
        //   author: values.author,
        //   quote: values.quote,
        // };
    
        // quotes.push(newQuote);
        response.body = values;
    },
    async signUp({ request, response }: Context){
      const body  = await request.body()
      const data = await body.value;
      const {name,email,password} = await body.value
      const insertUser = await user.insertOne({
        name,
        email,
        password
      })
      response.body = insertUser
      
    },
    async updateData({params,request,response}:{params:{id:string},request: any,response:any}){
      const id = await params.id;
      const body = await request.body().value
      console.log(body);
      // const findUser = await user.findOne({_id: new Bson.ObjectId(id) })
      const uodateuser = await user.updateOne({_id:new Bson.ObjectId(id)},{$set:{name:body.name}})
      response.body =  uodateuser
      
    },

    async deleteUser (
     {
      request,
      response,
      params,
    }: Context | any){
      const id  = params.id;
      console.log(id);
      const deletUser = await user.deleteOne({_id:new Bson.ObjectId(id)})
      response.body = deletUser
      
    }
    
}