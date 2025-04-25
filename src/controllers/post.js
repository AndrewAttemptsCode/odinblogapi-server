const prisma = require('../../config/prismaClient');

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json({ posts });
}

module.exports = {
  getAllPosts
}