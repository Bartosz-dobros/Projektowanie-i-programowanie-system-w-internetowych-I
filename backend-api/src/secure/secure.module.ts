// src/secure/secure.module.ts
import { Module } from '@nestjs/common';
import { SecureController } from './secure.controller';

@Module({
    controllers: [SecureController]
})
export class SecureModule {}
