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

module.exports = {
  getComments,
}