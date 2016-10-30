console.log(`BucketList - users controller loaded`)

var List = require('../models/list.js'),
    User = require('../models/user.js')

// Common Error logging function. Called from all functions in the controller to handle an error response from the DB
function dbError(action, error){
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(`Error in ** ${action} **`)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(error)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

module.exports = {
  addUser: function(req, res, next){
    if (!req.body['userName']){
      res.json({error: "The name cannot be empty"})
    } else {
      User.findOne({userName: req.body['userName']})
          .exec(function(err, user){
            if (!err){
              if (user){
                res.json({})
              } else {
                var newUser = new User()
                newUser.userName = req.body['userName']

                newUser.save(function(err, addedUser){
                  if (!err){
                    res.json(addedUser)
                  } else {
                    dbError("User:addUser:save", err)
                    res.json({error: "Cannot login right now. try again later"})
                  }
                })
              }
            } else {
              dbError("User:addUser:findOne", err)
              res.json({error: "Cannot login right now. try again later"})
            }
          })
    }
  },
  // ------------------------------------------------------------
  getAllUsers: function(req, res, next){
    User.find({})
        .populate('listItems')
        .exec(function(err, users){
          if (!err){
            res.json(users)
          } else {
            dbError("User:getAllUsers:find", err)
            res.json({error: "Unable to retrieve user list"})
          }
        })
  },
  // ------------------------------------------------------------
  getList: function(req, res, next){
    User.findOne({userName: req.params['user']})
        .populate('listItems')
        .exec(function(err, user){
          if (!err){
            res.json(user)
          } else {
            dbError("User:getList:findOne", err)
            res.json({error: "Unable to retrieve bucket list for user"})
          }
        })
  },
  // ------------------------------------------------------------
  getListById: function(req, res, next){
    User.findOne({_id: req.params['userId']})
        .populate('listItems')
        .exec(function(err, user){
          if (!err){
            res.json(user)
          } else {
            dbError("User:getList:findOne", err)
            res.json({error: "Unable to retrieve bucket list for user"})
          }
        })
  },
  // ------------------------------------------------------------
  addList: function(req, res, next){
    if (!req.body['title']){
      res.json({error: "Title cannot be empty"})
    } else if (req.body['title'].length < 5){
      res.json({error: "Title too short. Must be at least 5 characters long"})
    }

    if (!req.body['desc']){
      res.json({error: "Descripton cannot be empty"})
    } else if (req.body['desc'].length < 10){
      res.json({error: "Description too short. Must be at least 10 characters long"})
    }

    var newList = new List()
    newList.title = req.body['title']
    newList.desc = req.body['desc']
    newList.status = false

    User.findOne({userName: req.params['user']})
        .exec(function(err, user){
          user['listItems'].push(newList)
          newList['users'].push(user)
          newList.save(function(err, addedList){
            if (!err){
              user.save(function(err, updatedUser){
                if (!err){
                  if (req.body['tag']){
                    console.log("inside tag");
                    User.findOne({userName: req.body.tag['userName']})
                        .exec(function(err, user){
                          user['listItems'].push(newList)
                          newList['users'].push(user)
                          newList.save(function(err, addedList){
                            if (!err){
                              user.save(function(err, updatedUser){
                                if (!err){
                                  res.json(updatedUser)
                                } else {
                                  dbError("User:addList:usersave", err)
                                  res.json({error: "Unable to update. Please try later"})
                                }
                              })
                            } else {
                              dbError("User:addList:newListsave", err)
                              res.json({error: "Unable to update. Please try later"})
                            }
                          })
                        })
                  } else {
                    res.json(updatedUser)
                  }
                } else {
                  dbError("User:addList:usersave", err)
                  res.json({error: "Unable to update. Please try later"})
                }
              })
            } else {
              dbError("User:addList:newListsave", err)
              res.json({error: "Unable to update. Please try later"})
            }
          })
        })

  },
  // ------------------------------------------------------------
  updateListStatus: function(req, res, next){
    List.findOne({_id: req.params['listId']})
        .exec(function(err, list){
          if (!err){
            list['status'] = !list['status']

            list.save(function(err, updatedList){
              if (!err){
                res.json(updatedList)
              } else {
                dbError("User:updateListStatus:listsave", err)
                res.json({error: "Unable to update. Please try later"})
              }
            })
          } else {
            dbError("User:addList:findOne", err)
            res.json({error: "Unable to update. Please try later"})
          }
        })
  }
}
