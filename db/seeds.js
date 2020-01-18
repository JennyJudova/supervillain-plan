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
            passwordConfirmation: 'pass',
            universe: 'marvel',
            bio: 'bad guy'
          }
        ]);
      })
      .then((users) => {
        return Evilplan.create([
          {
            name: 'Evil plan',
            description: 'my Evil plan',
            image:
              'https://i.pinimg.com/originals/d1/b0/e2/d1b0e2ee4beb712ccff7065cb43f65ed.jpg',
            resources: 'billions',
            user: users[0]
          },
          {
            name: 'very Evil plan',
            description: 'my very Evil plan',
            image:
              'https://www.syfy.com/sites/syfy/files/styles/1200x680/public/2019/09/ceasar-joker-batman.jpg',
            resources: 'millions',
            user: users[0]
          }
        ]);
      })

      .then((plans) => console.log(`${plans.length} evil plans created`))
      .catch((error) => console.log(error))
      .finally(() => mongoose.connection.close());
  }
);
