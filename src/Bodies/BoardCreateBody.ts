import { ApiProperty } from '@nestjs/swagger';
import { node } from 'webpack';

class BoardCreateBody {
    @ApiProperty()
    courses: number[];

    @ApiProperty()
    name: string;

    @ApiProperty()
    rows: string[];
  }
  
  export { BoardCreateBody };