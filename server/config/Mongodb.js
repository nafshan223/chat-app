const mongoose=require("mongoose")
 

const connection=async()=>
{
    try
    {
        const connect=await mongoose.connect ("mongodb+srv://shanafshan223:Zibinshan.123@cluster0.2rklokt.mongodb.net/?retryWrites=true&w=majority",{
        })
        console.log("DataBase is connected");
    }
    catch(err)
    {
        console.log(`error:${err}`)
        process.exit()
    }
}

module.exports=connection