import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contacts: [
      {
        name: {
          type: String,
          required: true,
        },
        number: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
