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
            bio: 'bad guy',
            image:
              'data:image/jpeg;base64,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'
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
