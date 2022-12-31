import { resolve } from 'path';

import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { generatePrismock } from 'prismock';

import { UserService } from '@/components/user/user.service';
import { PrismaService } from '@/config/prisma/prisma';

import { mockUser, mockUserSession } from '@mocks/user.mock';

import { BlockedUserException } from '../user/exceptions/blocked-user.exception';
import { AuthController } from './auth.controller';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { LogoutException } from './exceptions/logout.exception';

describe('AuthController', () => {
  let authController: AuthController;
  let userService: UserService;

  beforeEach(async () => {
    const prismock = await generatePrismock({
      schemaPath: resolve(__dirname, '../../config/prisma/schema.prisma'),
    });

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: PrismaService, useValue: prismock }, UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('register', () => {
    let mockRegisterDTO: RegisterDTO;

    beforeEach(() => {
      mockRegisterDTO = { ...mockUser(), passwordConfirmation: 'test' };
    });

    it('should create a new user.', async () => {
      const createOneSpy = jest.spyOn(userService, 'createOne');
      const response = await authController.register(mockRegisterDTO);

      expect(response).toHaveProperty('message');
      expect(createOneSpy).toHaveBeenCalledWith(omit(mockRegisterDTO, 'passwordConfirmation'));
    });
  });

  describe('login', () => {
    let compareSpy: any;
    let findOneByEmailSpy: any;
    let user: User;
    let mockLoginDTO: LoginDTO;
    let session: Object;

    beforeEach(() => {
      compareSpy = jest.spyOn(bcrypt, 'compare');
      findOneByEmailSpy = jest.spyOn(userService, 'findOneByEmail');
      user = mockUser();
      mockLoginDTO = { email: user.email, password: user.password };
      session = {};
    });

    it('should throw an InvalidCredentialsException if the email and password do not match', () => {
      compareSpy.mockResolvedValue(false);
      findOneByEmailSpy.mockResolvedValue(mockUser({ password: 'invalidPassword' }));
      const response = async () => await authController.login(mockLoginDTO, session as any);

      expect(response).rejects.toBeInstanceOf(InvalidCredentialsException);
    });

    it('should throw a BlockedUserException if the user has been suspended.', () => {
      compareSpy.mockResolvedValue(true);
      findOneByEmailSpy.mockResolvedValue(mockUser({ isBlocked: true }));
      const response = async () => await authController.login(mockLoginDTO, session as any);

      expect(response).rejects.toBeInstanceOf(BlockedUserException);
    });

    it('should authenticate the user and store the user session.', async () => {
      compareSpy.mockResolvedValue(true);
      findOneByEmailSpy.mockResolvedValue(mockUser());
      const response = await authController.login(mockLoginDTO, session as any);

      expect(response).toHaveProperty('message');
      expect(session).toEqual(mockUserSession());
    });
  });

  describe('logout', () => {
    let session: { destroy: jest.Mock<void, [(error: any) => void]> };

    beforeEach(() => {
      session = { destroy: jest.fn() };
    });

    it('should destroy the session and return a success message.', () => {
      session.destroy.mockImplementation((callback: (error: any) => void) => callback(null));
      const response = authController.logout(session as any);

      expect(response).toHaveProperty('message');
      expect(session.destroy).toHaveBeenCalled();
    });

    it('should throw a LogoutException if there is an error destroying the session.', () => {
      session.destroy.mockImplementation((callback: (error: any) => void) => callback(new Error()));

      expect(() => authController.logout(session as any)).toThrow(LogoutException);
    });
  });
});
