import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
  name: {
    type: String,
    requred: true
  },
  discription: {
    type: String
  },
  videos: [
    {
    type: Schema.Types.ObjectId,
    ref: "Video",
    required: true
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},{timestamps: true});

export const Playlist = mongoose.model('Playlist', playlistSchema);