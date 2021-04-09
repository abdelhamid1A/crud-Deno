import db from '../config/db.ts'
const collec = "users"
const database = db.collection(collec)
export default {
    all(){
        return database.find().toArray()
    },
    async create(data:any){
        return await database.insert(data)
    }
}