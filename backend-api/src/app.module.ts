// src/app.module.ts
import { Module } from '@nestjs/common';
import { SecureModule } from './secure/secure.module';

@Module({
  imports: [SecureModule],
})
export class AppModule {}
