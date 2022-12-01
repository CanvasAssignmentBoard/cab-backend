import { ApiProperty } from '@nestjs/swagger';

class CreateTaskBody {
    @ApiProperty({type: String})  
    AssignmentId : string;
    @ApiProperty({type: String})  
    Status : string;
    @ApiProperty({type: String})  
    Name : string;
  }
  
  export { CreateTaskBody };