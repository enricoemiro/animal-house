import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

// Each name must have the following structure: {api_endpoint}:{action}
export enum PermissionName {
  PERMISSION_READ_ALL = 'permission:read_all',

  USER_READ = 'user:read',
  USER_BLOCK_ACCOUNT = 'user:block_account',
  USER_UNBLOCK_ACCOUNT = 'user:unblock_account',
  USER_UPDATE_PERMISSIONS = 'user:update_permissions',
  USER_DELETE_PERMISSIONS = 'user:delete_permissions',
}

@Schema({ timestamps: true, autoCreate: true })
export class Permission {
  @Prop({
    type: String,
    unique: true,
    required: true,
    immutable: true,
    enum: PermissionName,
  })
  name: PermissionName;

  @Prop({
    type: String,
    nullable: true,
  })
  description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
