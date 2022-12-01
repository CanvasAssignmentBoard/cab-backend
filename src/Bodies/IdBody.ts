import { ApiProperty } from '@nestjs/swagger';

class IdBody {
  @ApiProperty()
    id: number[];
  }
  
  export { IdBody };