console.log(`BucketList - list model loaded`)

var mg = require('mongoose'),
    schema = mg.Schema

var ListSchema = new schema({
  title: String,
  desc: String,
  status: {type: Boolean, default: false},
  users: [{type: schema.Types.ObjectId, ref: 'User'}]
},
{
  timestamps: true
})

var Lists = mg.model("List", ListSchema)

module.exports = Lists
