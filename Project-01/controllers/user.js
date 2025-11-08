const User = require("../models/user");
//Get All Users
const handlegetAllUsers = async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
};
//Get User By Id
const handlegetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }
  return res.json(user);
};
//Create NewUser
const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All field are required." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "success", id: result._id });
};
//Update User By Id
const handleUpdateUserById = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
      },
      { new: true }
    );
    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    } else {
      return res.json({ status: "success", message: "User updated", user });
    }
  } catch (error) {
    console.error(error);
    return res.json({ status: "error", message: "Something went wrong" });
  }
};
//Delete User By Id
const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success", message: "User deleted" });
};

module.exports = {
  handlegetAllUsers,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
