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
  images: [
    {
      public_id: { type: String }, // Public ID of the image
      secure_url: { type: String }, // Secure URL of the image
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);

module.exports = Notice;
