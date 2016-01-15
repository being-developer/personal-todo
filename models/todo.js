var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var todo = mongoose.Schema({
    text:String,
    location:String,
    date:Date,
    done:Boolean
});

// define the schema for our user model
var TodoSchema = mongoose.Schema({

        email        : String,
        password     : String,
        token:   String,
        provider : String, // facebook or google
        todo: [todo]

    //facebook         : {
    //    id           : String,
    //    token        : String,
    //    email        : String,
    //    name         : String
    //    , todo: [
    //        {
    //            text:String,
    //            location:String,
    //            date:String,
    //            done:Boolean
    //        }
    //    ]
    //},
    //google           : {
    //    id           : String,
    //    token        : String,
    //    email        : String,
    //    name         : String
    //    , todo: [
    //        {
    //            text:String,
    //            location:String,
    //            date:String,
    //            done:Boolean
    //        }
    //    ]
    //}

});

// methods ======================
// generating a hash
TodoSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
TodoSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Todo', TodoSchema);
