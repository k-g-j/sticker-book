const faker = require('faker');

const db = require('../config/connection');
const { Goal, User } = require('../models');

db.once('open', async () => {
  await Goal.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = (Math.floor(Math.random() * 50)).toString();
    const { _id: userId } = createdUsers.insertedIds[randomUserIndex];
    let friendId = userId;
    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
      friendId = createdUsers[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create goals
  let createdGoals = [];
  for (let i = 0; i < 100; i += 1) {
    const goalText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = (Math.floor(Math.random() * 50)).toString();
    const { _id: userId } = createdUsers.insertedIds[randomUserIndex];
    const { username } = userData[randomUserIndex];

    const goalTypes = ['Physical Health', 'Mental Health', 'Financial', 'Educational', 'Personal']
    const randomGoalTypeIndex = Math.floor(Math.random() * goalTypes.length);
    const type = goalTypes[randomGoalTypeIndex];

    const createdGoal = await Goal.create({ goalText, type, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { goals: createdGoal._id } }
    );

    createdGoals.push(createdGoal);
  }

  // create steps
  for (let i = 0; i < 100; i += 1) {
    const stepBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = (Math.floor(Math.random() * 50)).toString();
    const { username } = userData[randomUserIndex];

    const randomGoalIndex = (Math.floor(Math.random() * createdGoals.length)).toString();
    const { _id: goalId } = createdGoals[randomGoalIndex];

    await Goal.updateOne(
      { _id: goalId },
      { $push: { steps: { stepBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});