const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
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
    type: {
      data: Buffer,
      contentType: String,
    },
    required: function () {
      return this.noticeType === 'image';
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
