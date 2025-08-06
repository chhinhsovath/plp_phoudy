import { SetMetadata } from '@nestjs/common';

export const isPublic_KEY = 'isPublic';
export const Public = () => SetMetadata(isPublic_KEY, true);
