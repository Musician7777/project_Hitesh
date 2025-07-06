  import mongoose, {Schema} from "mongoose";
  import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

  const videoSchema = new Schema(
    {
      videoFile: {
        type: String, //Cloutnary URL.
        required: true
      },
      thumbnail: {
        type: String,
        required: true
      },
      titile: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      duration: {
        type: Number, //Cloudnary gives the data about the video.
        require: true
      },
      views: {
        type: Number,
        default: 0,
      },
      isPublished: {
        type: Boolean, //Video is private or public.
        default: true
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  , { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);