import { Prisma } from '@prisma/client';

export const isDuplicateKeyError = (error: any, key: string) => {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002' &&
    error.meta.target === key
  );
};
