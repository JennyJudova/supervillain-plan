const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true } // the user who is making the comment, this is a referenced relationship
  },
  {
    timestamps: true
  }
);

const Evilplan = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
      // autopopulate: true
    },
    success: { type: Boolean, required: false },
    resources: { type: String, required: false },
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
);

// Evilplan.plugin(require('mongoose-autopopulate'));
Evilplan.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Evilplan', Evilplan);
