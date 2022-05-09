"use strict";

const {db, User, Post} = require('../db');

const me = {
  username: 'bek',
  wallet: '0x83f2dbfa576bdba1C148484B43d07354A1fbed77',
  bio: 'yerrrrr',
}
const post = [
  {
    content: 'this is some quality content',
    likes: 54,
    userId: 1,
  },
  {
    content: 'this is not some quality content',
    likes: 3,
    userId: 1,
  },
  {
    content: 'this quality content should have the default image',
    likes: 987,
    postImage: true,
    userId: 1,
  },
  {
    content: 'this quality content should have a custom image',
    likes: 987,
    postImage: true,
    imageUrl:'/assets/test_monke.png',
    userId: 1,
  },
]
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
 async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating User
  await User.create(me);

  //adding posts
  await Promise.all(post.map((p)=>{
    return Post.create(p)
  }))

  console.log(`seeded 1 user`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
