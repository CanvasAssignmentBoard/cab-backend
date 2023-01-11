import DB from 'src/Data/db';
import IRowLogic from './IRowLogic';

export class RowLogic implements IRowLogic {
  constructor(private readonly dataBaseService: DB) {}

  async MoveToRow(assignmentID: string, rowId: string) {
    console.log(rowId);
    if (!(await this.dataBaseService.DoesRowExist(rowId))) {
      console.log(await this.dataBaseService.DoesRowExist(rowId));
      return false;
    }

    if (!(await this.dataBaseService.DoesAssignmentExist(assignmentID))) {
      return false;
    }

    await this.dataBaseService.RemoveRowConnection(
      (
        await this.dataBaseService.GetAssignment(assignmentID)
      ).rowId,
      assignmentID,
    );
    await this.dataBaseService.AddRowConnection(rowId, assignmentID);
  }

  async ReorderItem(assignmentID: string, index: number) {
    if (!(await this.dataBaseService.DoesAssignmentExist(assignmentID))) {
      return false;
    }

    const a = await this.dataBaseService.GetAssignment(assignmentID);

    if (a.index === index) {
      console.log('why');
      return;
    }
    const assignments: any[] = [];
    if (a.index < index) {
      console.log("ai")
      assignments.forEach(async (assignment) => {
        if (assignment.index > a.index && assignment.index <= index) {
          this.dataBaseService.ReorderItem(assignment.id, assignment.index - 1);
        } else if (assignment.index == null) {
          console.log('re');
          this.dataBaseService.ReorderItem(
            assignment.id,
            await this.dataBaseService.GenerateNewIndex(assignment.rowId),
          );
        }
      });
    } else {
      console.log("bi")
      console.log(assignments)
      assignments.forEach(async (assignment) => {
        if (assignment.index <= a.index && assignment.index > index) {
          console.log(assignment.index);
          this.dataBaseService.ReorderItem(assignment.id, assignment.index + 1);
        } else if (assignment.index == null) {
          console.log('re');
          this.dataBaseService.ReorderItem(
            assignment.id,
            await this.dataBaseService.GenerateNewIndex(assignment.rowId),
          );
        }
      });
    }

    console.log(index);
    await this.dataBaseService.ReorderItem(assignmentID, index);
  }
}
