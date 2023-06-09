const express = require("express");
const {
  authorizeMiddleware,
  validationMiddleware,
} = require("../../middlewares");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { experience } = require("../../controllers");
const {
  addUserExperienceSchema,
  updateUserExperienceSchema,
} = require("../../models/users.model");

const router = express.Router();

router.post(
  "/",
  authorizeMiddleware,
  validationMiddleware(addUserExperienceSchema),
  controllerWrapper(experience.addExperience)
);

router.patch(
  "/:id",
  authorizeMiddleware,
  validationMiddleware(updateUserExperienceSchema),
  controllerWrapper(experience.updateExperience)
);

router.delete(
  "/:id",
  authorizeMiddleware,
  controllerWrapper(experience.deleteExperience)
);
module.exports = router;
