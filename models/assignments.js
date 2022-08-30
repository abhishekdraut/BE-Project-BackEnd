const mongoose = require("mongoose");

const AssignmentsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "user id is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  classroom_id: {
    type: String,
    required: [true, "user id is required"],
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    require: [true],
  },
  due_date: {
    type: Date, //'1987-09-28'
    required: [true, "due date is required"],
  },
  points: { type: String, required: [true, "points is required"] },
  // {
  //     "ETag": "\"7d4616cfb577ea6bad7eea018cf0522f\"",
  //     "Location": "https://academia-files.s3.ap-south-1.amazonaws.com/dcd1ef0eb6070b8db774d279ce2a89b7",
  //     "key": "dcd1ef0eb6070b8db774d279ce2a89b7",
  //     "Key": "dcd1ef0eb6070b8db774d279ce2a89b7",
  //     "Bucket": "academia-files"
  // }
  file: {
    type: Object,
    reuired: [true, "file referance from s3 required"],
  },
});
const SubmissionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "user id is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  classroom_id: {
    type: String,
    required: [true, "classroom id is required"],
  },
  assignment_id: {
    type: String,
    required: [true, "assignement id is required"],
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  // description: {
  //   type: String,
  //   require: [true],
  // },
  date: {
    type: String, //'1987-09-28',
    // default: Date.now,
    required: [true, "date is required"],
  },
  // late_submitted: {
  //   type: Boolean,
  //   default: false,
  //   required: [true, "Late Submission remark required"],
  // },
  // {
  //     "ETag": "\"7d4616cfb577ea6bad7eea018cf0522f\"",
  //     "Location": "https://academia-files.s3.ap-south-1.amazonaws.com/dcd1ef0eb6070b8db774d279ce2a89b7",
  //     "key": "dcd1ef0eb6070b8db774d279ce2a89b7",
  //     "Key": "dcd1ef0eb6070b8db774d279ce2a89b7",
  //     "Bucket": "academia-files"
  // }
  file: {
    type: Object,
    reuired: [true, "file referance from s3 required"],
  },
});
const AssignmentModel = new mongoose.model("Assignments", AssignmentsSchema);
const SubmissionModel = new mongoose.model("Submission", SubmissionSchema);

const Assignment = {
  Assignments: AssignmentModel,
  Submission: SubmissionModel,
};
module.exports = Assignment;
