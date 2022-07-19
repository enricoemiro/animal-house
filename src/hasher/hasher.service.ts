import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Options, argon2id, hash, verify } from 'argon2';
import { randomUUID } from 'node:crypto';

@Injectable()
export class HasherService {
  private options: Options & { raw?: false } = {};

  public constructor(private configService: ConfigService) {
    this.options = {
      type: argon2id,
      timeCost: this.configService.get('ARGON2_TIME_COST'),
      hashLength: this.configService.get('ARGON2_HASH_LENGTH'),
      memoryCost: this.configService.get('ARGON2_MEMORY_COST'),
      parallelism: this.configService.get('ARGON2_PARALLELISM'),
    };
  }

  public async compare(
    plain: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return verify(encrypted, plain, this.options);
  }

  public async hash(plain: string | Buffer): Promise<string> {
    return hash(plain, this.options);
  }

  public uuidv4(): string {
    return randomUUID();
  }
}
