import { Token } from "../../../../models/index.js";
import { errorHelper, getText, logger } from "../../../../utils/index.js";

export default async (req, res) => {
  await Token.updateOne(
    { userId: req.user._id },
    {
      $set: { status: false, expiresIn: Date.now() },
    }
  ).catch((err) => {
    return res.status(500).json(errorHelper("00049", req, err.message));
  });

  logger("00050", req.user._id, getText("00050"), "Info", req);
  return res.status(200).json({
    resultMessage: getText("00050"),
    resultCode: "00050",
  });
};

