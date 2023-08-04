import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
  sector:{
    type:String
  },
  relevance:{
    type:Number
  },
  intensity:{
    type:Number
  },
  likelihood:{
    type:Number
  },
  end_year:{
    type:Number
  },
  country:{
    type:String
  },
  region:{
    type:String
  },
  topic:{
    type:String
  },
  source:{
    type:String
  },
  insight:{
    type:String
  },
  url:{
    type:String
  },
  start_year:{
    type:Number
  },
  added:{
    type:String
  },
  published:{
    type:String
  },
  pestle:{
    type:String
  },
  title:{
    type:String
  }
});

const dataModel=new mongoose.model('jsonData',mySchema)
export default dataModel