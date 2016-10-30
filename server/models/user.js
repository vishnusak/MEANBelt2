console.log(`BucketList - user model loaded`)

var mg = require('mongoose'),
    schema = mg.Schema

var UserSchema = new schema({
  userName: {type: String, required: true, unique: true},
  listItems: [{type: schema.Types.ObjectId, ref:"List"}]
},
{
  timestamps: true
})

var Users = mg.model("User", UserSchema)

module.exports = Users
