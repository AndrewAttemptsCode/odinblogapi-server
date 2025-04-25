const prisma = require('../../config/prismaClient');

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          username: true,
        }
      }
    }
  });
  res.json({ posts });
};

const getPost = async (req, res) => {
  const { postId } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  res.json({ post });
}

const createPost = async (req, res) => {
  const { title, text } = req.body;
  const authorId = 1; // when login set up, change to req.user.id

  const post = await prisma.post.create({
    data: {
      title,
      text,
      authorId,
    },
  });
  res.json({ message: 'Post created', post });
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
};
