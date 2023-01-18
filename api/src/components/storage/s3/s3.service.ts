import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  public constructor(private configService: ConfigService) {
    this.s3Client = this.createS3Client();
  }

  /**
   * Save a file inside the S3 bucket.
   *
   * @param path File path.
   * @param buffer File buffer.
   * @returns the file created.
   */
  public async save(path: string, buffer: Buffer) {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: path,
        Body: buffer,
      }),
    );
  }

  /**
   * Delete a file from the s3 storage.
   *
   * @param path File path.
   */
  public async delete(path: string) {
    return this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: path,
      }),
    );
  }

  /**
   * Create the S3Client instance.
   *
   * @returns the S3Client instance.
   */
  private createS3Client() {
    return new S3Client({
      region: this.configService.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      },
    });
  }
}
