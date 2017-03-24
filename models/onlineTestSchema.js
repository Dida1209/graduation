// /**
//  * Created by lenovo-pc on 2017/3/9.
//  */
// var mongoose = require('mongoose');
// var ObjectId=mongoose.Schema.Types.ObjectId;
//
// var OnlineTestSchema = new mongoose.Schema({
//     resourId:{
//         type:ObjectId,
//         ref:'Resource'
//     },
//     question: {
//         type: String,
//         unique: true
//     },
//     A: {
//         type: String,
//         "default": ''
//     },
//     B: {
//         type: String,
//         "default": ''
//     },
//     C: {
//         type: String,
//         "default": ''
//     },
//     D: {
//         type: String,
//         "default": ''
//     },
//     answer: {
//         type: String,
//         unique: true
//     },
//     why: {
//         type: String
//     }
// })
//
// var OnlineTest = mongoose.model('OnlineTest', OnlineTestSchema);
// module.exports = OnlineTest;