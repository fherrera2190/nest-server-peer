import { PartialType } from '@nestjs/mapped-types';
import { CreateWebcamWDto } from './create-webcam-w.dto';

export class UpdateWebcamWDto extends PartialType(CreateWebcamWDto) {
  id: number;
}
