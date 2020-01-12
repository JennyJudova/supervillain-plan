const mongoose = require('mongoose');

const Evilplan = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// Evilplan.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Evilplan', Evilplan);
