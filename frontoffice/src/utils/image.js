import { Buffer } from 'buffer';

export const bufferToBase64 = (buffer) => {
  return Buffer.from(buffer).toString('base64');
};
