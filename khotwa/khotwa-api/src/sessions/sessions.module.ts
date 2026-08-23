import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { Session, SessionSchema } from './session.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [MongooseModule],
})
export class SessionsModule {}
