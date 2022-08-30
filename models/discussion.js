const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  date: { type: Date, default: Date.now },
});

const QuestionsSchema=new mongoose.Schema({
    question:{
        type: 'string',
        required:[true,"Question is mendetory while submitting"]
    },
    user:{
        type:userSchema,
        required:[true,"User object required"]
    },
    user_id:{
        type:'string',
        required:[true,"user id required"]

    },
    classroom_id:{
        type:'string',
        required:[true,"Classroom id required"]
    },
    tags:[String],
    date:{
        type:Date,
        reuired:true,
        default:Date.now
    },
})

const AnswerSchema=new mongoose.Schema({
    answer:{
        type: 'string',
        required:[true,"Answer is mendetory while submitting"]

    },
    user:{
        type:userSchema,
        required:[true,"User object required"]
    },
    user_id:{
        type:'string',
        required:[true,"user_id required"]

    },
    date:{
        type:Date,
        reuired:true,
        default:Date.now
    },
    question_id:{
        type:'string',
        required:[true,"Question id required"]
    }


})
const Questions=new mongoose.model('Questions',QuestionsSchema)
const Answers=new mongoose.model('Answers',AnswerSchema)

const discussion={
    question:Questions,
    answer:Answers,
}
module.exports=discussion