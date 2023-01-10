interface IRowLogic {
    MoveToRow(rowId: string, assignmentID : string)
    ReorderItem(assignmentID: string, index: number)
} export default IRowLogic;