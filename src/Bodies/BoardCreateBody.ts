import { ApiProperty } from '@nestjs/swagger';

class BoardCreateBody {
    @ApiProperty()
    courses: number[];

    @ApiProperty()
    name: string;
  }
  
  export { BoardCreateBody };