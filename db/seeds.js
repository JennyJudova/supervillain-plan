const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
const Evilplan = require('../models/Evilplan');
const User = require('../models/User');

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    // if (err) return console.log(err);

    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'JJ',
            email: 'jj@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          }
        ]);
      })
      .then((users) => {
        return Evilplan.create([
          {
            name: 'Evil plan',
            description: 'my Evil plan',
            user: users[0]
          },
          {
            name: 'very Evil plan',
            description: 'my very Evil plan',
            user: users[0]
          }
        ]);
      })

      .then((plans) => console.log(`${plans.length} evil plans created`))
      .catch((error) => console.log(error))
      .finally(() => mongoose.connection.close());
  }
);
