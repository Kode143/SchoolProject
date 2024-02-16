const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  noticeType: {
    type: String,
    enum: ['text', 'image'],
    required: true,
  },
  textNotice: {
    type: String,
    required: function () {
      return this.noticeType === 'text';
    },
  },
  imageNotice: {
    type: [String], // Change the type to an array of strings
    required: function () {
      return this.noticeType === 'image';
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);

module.exports = Notice;