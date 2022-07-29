import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'node:fs';
import { unlink, writeFile } from 'node:fs/promises';

import { extractPath } from '@app/utils/helpers';

import { DiskFileNotFound } from './disk.exception';

@Injectable()
export class DiskService {
  /**
   * Save a file in the disk storage.
   *
   * @param obj.path File path.
   * @param obj.buffer File buffer.
   */
  public async save(path: string, buffer: Buffer) {
    const { dirname } = extractPath(path);

    if (!existsSync(dirname)) {
      mkdirSync(dirname, { recursive: true });
    }

    return writeFile(path, buffer);
  }

  /**
   * Delete a file from the disk storage.
   *
   * @param path File path.
   */
  public async delete(path: string) {
    try {
      return await unlink(path);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new DiskFileNotFound();
      }

      throw error;
    }
  }
}
