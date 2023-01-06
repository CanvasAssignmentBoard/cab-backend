import DB from 'src/Data/db';
import IRowLogic from './IRowLogic';

export class RowLogic implements IRowLogic {
  constructor(
    private readonly dataBaseService: DB,
  ) {}

  async MoveToRow(rowId: string, assignmentID : string) {
    if(await this.dataBaseService.DoesRowExist(rowId)){
      return false;
    }

    if(this.dataBaseService.DoesAssignmentExist(assignmentID)){
      return false;
    }
    await this.dataBaseService.RemoveRowConnection(await (await this.dataBaseService.GetAssignment(assignmentID)).rowId, assignmentID);
    await this.dataBaseService.AddRowConnection(rowId, assignmentID);
  }
}
