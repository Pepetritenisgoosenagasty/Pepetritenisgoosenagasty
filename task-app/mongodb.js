const { MongoClient, ObjectID } = require('mongodb') 

const connectionUrl = 'mongodb://127.0.0.1:27017';
const database = 'task-app';

const id = new ObjectID();

// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true,}, (error, client) => {
  if (error) {
      return console.log('Unable to connect to database!');
  }

  const db = client.db(database);

//   db.collection('users').insertOne({
//       name: "Edward Nagai",
//       age: 24

//   }, (error, result) => {
//     if(error) {
//       return console.log('Unable to insert ibto database!');
//     }

//     console.log(result.ops);
//   });
// });

  // db.collection('tasks').insertMany(
  //   [{
  //     description: "Laundry",
  //     completed: true

  //   }, 
  //   {
  //     description: "learning Python",
  //     completed: true

  //   }, 
  //   {
  //     description: "Learning nodejs",
  //     completed: true

  //   }], (error, result) => {
  //     if(error) {
  //       return console.log('Unable to insert ibto database!');
  //     }

  //     console.log(result.ops);
  //   });

  // db.collection('users').findOne({_id: new ObjectID("5f4071c74b4b402d34632194")}, (error, user) => {
  //   if(error) {
  //    return console.log("Unable to fetch");
  //   }

  //    console.log(user);
  // });
  // db.collection('users').find({age: 24}).toArray((error,users) => {
  //   console.log(users);
  // })
  // db.collection('users').find({age: 24}).count((error,count) => {
  //   console.log(count);
  // })

  // db.collection('tasks').findOne({_id: new ObjectID("5f3fedf6974fd73b582a0b43")}, (error, task) => {
  //   console.log(task);
  // });

  // db.collection('tasks').find({completed: true}).toArray((error, tasks) => {
  //   console.log(tasks);
  // });

  // db.collection('users').updateOne(
  //   { 
  //     _id: new ObjectID('5f4071c74b4b402d34632194')
  //   },
  //   {
  //     $set: {
  //       name: "Hulkkamedise"
  //     }
  //   }).then((res) => {
  //     console.log(res)
  //   }).catch((error) => {
  //     console.log(error)
  //   })

  // db.collection('tasks').updateMany({
  //   completed: false
  // },
  // {
  //   $set: {
  //     completed: true
  //   }
  // }).then((res) => {
  //     console.log(res.modifiedCount);
  //   }).catch(err =>  console.log(err))

  db.collection('users').deleteOne({
    age: 24,
  }).then(res => console.log(res))
    .catch(err => console.log(err));
  });