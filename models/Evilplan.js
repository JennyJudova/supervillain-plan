const mongoose = require('mongoose');

const Evilplan = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: true
    },
    resources: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

Evilplan.plugin(require('mongoose-autopopulate'));
Evilplan.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Evilplan', Evilplan);
