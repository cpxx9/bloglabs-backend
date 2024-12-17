const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const listUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      created: true,
      updated: true,
      username: true,
      email: true,
      firstname: true,
      lastname: true,
      posts: true,
      comments: true,
    },
  });
  res.status(200).json({ success: true, data: users });
};

module.exports = { listUsers };
