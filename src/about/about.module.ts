import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from '../content/schemas/content.schema';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  controllers: [AboutController],
  providers: [AboutService],
  exports: [AboutService],
})
export class AboutModule {}
