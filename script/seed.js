"use strict";
const {db, User, Post, Comments} = require('../db');

const _users = [
  {
    username: 'bek',
    wallet: '0x83f2dbfa576bdba1C148484B43d07354A1fbed77',
    bio: 'nft degen',
  },
  {
    username: 'teman',
    wallet: '0xa05749a1A58E379A29ac0C5B8273cD0c2B662d93',
    bio: 'i was in the military. please don\'t tell me what to do.',
  },
  {
    username: 'elonmusk',
    wallet: '0x1AC1f0C79A9Bf849b7E038362ffa5351A922E52d',
    bio: 'tesla / spaceX / twitter / memes',
  },
  {
    username: 'france',
    wallet: '0x1362C69834d5B19ECbfBC6a643375394a4228D32',
    bio: 'i am satoshi',
  }
]
const _post = [
  {
    content: 'this is some quality content',
    likes: 54,
    userId: 1,
    createdAt: "2022-05-12T16:20:11.065Z"
  },
  {
    content: 'this is not some quality content',
    likes: 3,
    userId: 1,
    createdAt: "2022-05-12T16:20:12.065Z"
  },
  {
    content: 'this quality content should have the default image',
    likes: 987,
    postImage: true,
    userId: 1,
    createdAt: "2022-05-12T16:20:13.065Z"
  },
  {
    content: 'this quality content should have a custom image',
    likes: 987,
    postImage: true,
    imageUrl:'/assets/test_monke.png',
    userId: 1,
    createdAt: "2022-05-12T16:20:14.065Z"
  },
]

const _comments = [
  {
    content: 'Wow so nice!',
    likes: 2,
    userId: 1,
    postId: 1,
    createdAt: "2022-05-12T16:20:11.065Z"
  },
  {
    content: 'YO THIS IS GOING TO THE MOON!',
    likes: 541,
    userId: 1,
    postId: 1,
    createdAt: "2022-05-12T16:20:12.065Z"
  },
  {
    content: 'This is trash..',
    likes: 60,
    userId: 1,
    postId: 1,
    createdAt: "2022-05-12T16:20:13.065Z"
  },
  {
    content: 'BUY THE DIP!',
    likes: 9,
    userId: 1,
    postId: 2,
    createdAt: "2022-05-12T16:20:14.065Z"
  },
  {
    content: 'First!',
    likes: 46581,
    userId: 1,
    postId: 2,
    createdAt: "2022-05-12T16:20:15.065Z"
  },
  {
    content: 'Reminder that its just money',
    likes: -5,
    userId: 1,
    postId: 2,
    createdAt: "2022-05-12T16:20:16.065Z"
  },
  {
    content: 'Seems legit',
    likes: 0,
    userId: 1,
    postId: 3,
    createdAt: "2022-05-12T16:20:16.065Z"
  },
  {
    content: 'Were giving you a final coutesy call to extend your cars extended warranty',
    likes: 12,
    userId: 1,
    postId: 3,
    createdAt: "2022-05-12T16:20:17.065Z"
  },
  {
    content: 'I drained my mom\'s credit card to buy this NFT ^.^',
    likes: 9000,
    userId: 1,
    postId: 3,
    createdAt: "2022-05-12T16:20:18.065Z"
  },
]

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
 async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // adding users
  await Promise.all(_users.map((u) => {
    return User.create(u)
  }))

  //adding posts
  await Promise.all(_post.map((p)=>{
    return Post.create(p)
  }))
  await Promise.all(_comments.map((c)=>{
    return Comments.create(c)
  }))

  console.log(`seeded some users`);
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
