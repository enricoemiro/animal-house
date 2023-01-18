import { basename, dirname, extname } from 'path';

import { Prisma } from '@prisma/client';

export const isDuplicateKeyError = (error: any, key: string) => {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002' &&
    error.meta.target === key
  );
};

export function extractPath(path: string) {
  return {
    dirname: dirname(path),
    basename: basename(path),
    extension: extname(path),
  };
}
