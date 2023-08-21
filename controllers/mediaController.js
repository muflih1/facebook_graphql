import Media from "../models/Media.js";

export const mediaController = async (req, res) => {
  const { altText, actorId } = req.body;
  try {
    if (!actorId)
      return res
        .status(400)
        .json({ success: false, error: "User id is required" })
    
    const media = new Media({
      actorId,
      altText,
      mediaPath: process.env.SERVER_URL + 'media/' + req.file.filename,
    })

    await media.save()

    res.status(200).json({ mediaId: media._id })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to upload file." + error });
  }
};
