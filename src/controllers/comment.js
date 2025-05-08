const prisma = require("../../config/prismaClient")

const getComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  if (comments.length <= 0) {
    return res.status(404).json({ msg: 'No comments found' });
  }

  res.json(comments);
}

const removeComment = async (req, res) => {
  const { commentId } = req.params;
  const comment = await prisma.comment.delete({
    where: { id: Number(commentId) },
  });

  if (!comment) {
    return res.status(404).json({ msg: 'No comment found' });
  }

  res.json({ msg: `Removed comment: ${comment}` });
}

module.exports = {
  getComments,
  removeComment,
}