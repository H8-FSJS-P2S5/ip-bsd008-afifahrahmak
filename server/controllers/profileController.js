//create for profile controller
const { Profile } = require("../models");
const { User } = require("../models");

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
      ],
    });
    res.status(200).json(profiles);
  } catch (err) {
    next(err);
  }
};

const getProfileById = async (req, res, next) => {
  try {
    let profile = await Profile.findByPk(req.params.id, {
      include: [User],
    });

    if (!profile) {
      profile = await Profile.create({ userId: req.params.id });
    }

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

const createProfile = async (req, res, next) => {
  try {
    const profileData = req.body; // Directly use req.body
    const profile = await Profile.create(profileData);
    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profileData = req.body;
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    await profile.update(profileData);
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfiles, getProfileById, createProfile, updateProfile };
