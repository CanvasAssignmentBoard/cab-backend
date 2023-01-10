import DB from 'src/Data/db';
import IRowLogic from './IRowLogic';

export class RowLogic implements IRowLogic {
  constructor(private readonly dataBaseService: DB) {}

  async MoveToRow(rowId: string, assignmentID: string) {
    if (await this.dataBaseService.DoesRowExist(rowId)) {
      return false;
    }

    if (this.dataBaseService.DoesAssignmentExist(assignmentID)) {
      return false;
    }
    await this.dataBaseService.RemoveRowConnection(
      await (
        await this.dataBaseService.GetAssignment(assignmentID)
      ).rowId,
      assignmentID,
    );
    await this.dataBaseService.AddRowConnection(rowId, assignmentID);
  }

  async ReorderItem(assignmentID: string, index: number) {
    if (this.dataBaseService.DoesAssignmentExist(assignmentID)) {
      return false;
    }

    const a = await this.dataBaseService.GetAssignment(assignmentID);

    if (a.index === index) {
      console.log("why")
      return;
    }
    const assignments: any[] = [];
    if (a.index < index) {
      assignments.forEach(async (assignment) => {
        if (assignment.index > a.index && assignment.index <= index) {
          this.dataBaseService.ReorderItem(assignment.id, assignment.index - 1);
        } else if (assignment.index == null) {
          this.dataBaseService.ReorderItem(
            assignment.id,
            await this.dataBaseService.GenerateNewIndex(assignment.rowId),
          );
        }
      });
    } else {
      assignments.forEach(async (assignment) => {
        if (assignment.index <= a.index && assignment.index > index) {
          this.dataBaseService.ReorderItem(assignment.id, assignment.index + 1);
        } else if (assignment.index == null) {
          this.dataBaseService.ReorderItem(
            assignment.id,
            await this.dataBaseService.GenerateNewIndex(assignment.rowId),
          );
        }
      });
    }

    await this.dataBaseService.ReorderItem(assignmentID, index);
  }
}
