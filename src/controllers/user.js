const { validationResult } = require('express-validator');
const prisma = require('../../config/prismaClient');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();

  res.json({ message: 'Users found', users });
}

const getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  })

  if (user) {
    res.json({ message: 'User found', user });
  } else {
    res.json({ message: 'No user found' });
  }
}

const createUser = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {username, password, email} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    }
  })

  res.json({ message: 'User created', user });
}

module.exports = {
  getAllUsers,
  getUser,
  createUser
}