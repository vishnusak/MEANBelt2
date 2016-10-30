console.log(`BucketList - db config loaded`)

var mg = require('mongoose')

mg.connect('mongodb://localhost/bucketListDB', function(err){
  if (err){
    console.log(`Unable to establish connection`)
    console.log(err)
  } else {
    console.log(`Connection to bucketListDB established`)
  }
})
