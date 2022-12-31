import { resolve } from 'path';

import { Test } from '@nestjs/testing';
import { Prisma, User } from '@prisma/client';
import { omit } from 'lodash';
import { generatePrismock } from 'prismock';

import { PrismaService } from '@/config/prisma/prisma';

import { mockUser } from '@mocks/user.mock';

import { EmailAlreadyInUseException } from './exceptions/email-already-in-use.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let prismaService: PrismaService;
  let userService: UserService;

  beforeEach(async () => {
    const prismock = await generatePrismock({
      schemaPath: resolve(__dirname, '../../config/prisma/schema.prisma'),
    });

    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
      providers: [
        {
          provide: PrismaService,
          useValue: prismock,
        },
      ],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('createOne', () => {
    let user: Omit<User, 'id'>;
    let userCreateSpy: jest.SpyInstance<Promise<Omit<User, 'id'>>, [{ data: any }]>;

    beforeEach(() => {
      user = omit(mockUser(), 'id');
      userCreateSpy = jest.spyOn(prismaService.user, 'create');
    });

    it('should create a new user.', async () => {
      userCreateSpy.mockResolvedValue(user);

      const response = await userService.createOne(user);
      expect(userCreateSpy).toHaveBeenCalledWith({ data: user });
      expect(response).toBe(user);
    });

    it('should throw an EmailAlreadyInUseException if the email is already in use.', async () => {
      const error = new Prisma.PrismaClientKnownRequestError('message', {
        code: 'P2002',
        clientVersion: 'clientVersion',
        meta: { target: 'users_email_key' },
      });
      userCreateSpy.mockRejectedValue(error);

      expect(async () => await userService.createOne(user)).rejects.toBeInstanceOf(
        EmailAlreadyInUseException,
      );
    });

    it('should propagate other errors.', async () => {
      const error = new Error('message');
      userCreateSpy.mockRejectedValue(error);

      expect(async () => await userService.createOne(user)).rejects.toBeInstanceOf(Error);
    });
  });

  describe('findOneByEmail', () => {
    let user: User;
    let userFindFirstSpy: any;

    beforeEach(() => {
      user = mockUser();
      userFindFirstSpy = jest.spyOn(prismaService.user, 'findFirst');
    });

    it('should return the user with the specified email.', async () => {
      userFindFirstSpy.mockResolvedValue(user);

      const response = await userService.findOneByEmail(user.email);
      expect(userFindFirstSpy).toHaveBeenCalledWith({ where: { email: user.email } });
      expect(response).toBe(user);
    });

    it('should throw a UserNotFoundException if no user with the specified email is found.', async () => {
      userFindFirstSpy.mockRejectedValue(new UserNotFoundException());

      expect(
        async () => await userService.findOneByEmail('invalid@email.com'),
      ).rejects.toBeInstanceOf(UserNotFoundException);
    });
  });
});
