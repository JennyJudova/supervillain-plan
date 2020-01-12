const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
const Evilplan = require('../models/Evilplan');

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    // if (err) return console.log(err);

    db.dropDatabase()
      .then(() => {
        return Evilplan.create([
          {
            name: 'Evil plan',
            description: 'my Evil plan'
          },
          {
            name: 'very Evil plan',
            description: 'my very Evil plan'
          }
        ]);
      })

      .then((plans) => console.log(`${plans.length} evil plans created`))
      .catch((error) => console.log(error))
      .finally(() => mongoose.connection.close());
  }
);
