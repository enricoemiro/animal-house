import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HasherService {
  async compare(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async hash(plain: string | Buffer) {
    return await bcrypt.hash(plain, 14);
  }
}
