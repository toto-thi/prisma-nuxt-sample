import prisma from '../prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return { user };
});
