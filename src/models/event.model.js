import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    dateTime: {
      type: Date,
      required: [true, 'Date and time are required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    capacity: {
      type: Number,
      required: true,
      max: [1000, 'Capacity cannot exceed 1000'],
      min: [1, 'Capacity must be at least 1'],
    },
    registrations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  } , { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event
