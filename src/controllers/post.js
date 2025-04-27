const { validationResult } = require('express-validator');
const prisma = require('../../config/prismaClient');

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
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
      comments: {
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  res.json({ post });
};

const createPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { title, text } = req.body;
  const authorId = req.user.id;

  const post = await prisma.post.create({
    data: {
      title,
      text,
      authorId,
    },
  });
  res.json({ message: 'Post created', post });
};

const publishPost = async (req, res) => {
  const { postId } = req.params;

  const existingPost = await prisma.post.findUnique({
    where: { id: Number(postId) },
  });

  if (!existingPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const updatedPost = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      published: !existingPost.published,
    },
  });
  res.json({ message: `Post ${updatedPost.published ? 'published' : 'unpublished'}`, post: updatedPost });
};

const createComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { postId } = req.params;
  const { text } = req.body;
  const authorId = req.user.id;

  const comment = await prisma.comment.create({
    data: {
      text,
      postId: Number(postId),
      authorId,
    },
  });
  res.json({ message: 'Comment created', comment });
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  publishPost,
  createComment,
};
