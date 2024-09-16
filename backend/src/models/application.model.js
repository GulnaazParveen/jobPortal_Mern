import mongoose from "mongoose";
import mongooseAggrigatePaginate from "mongoose-aggregate-paginate-v2"
const userApplicationSchema=mongoose.Schema({

},{timestamps:true})

// we are adding plugin so that we can do aggerigation query
userApplicationSchema.plugin(mongooseAggrigatePaginate)

const userApplication=mongoose.model("userApplication",userApplicationSchema)
export default userApplication