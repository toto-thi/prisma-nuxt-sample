import prisma from '../prisma';

export default defineEventHandler(async () => {
  const users = await prisma.user.findMany();
  
  return { users };
});
