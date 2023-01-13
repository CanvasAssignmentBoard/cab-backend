interface IRowLogic {
    MoveToRow(assignmentID: string, rowId : string)
    ReorderItem(assignmentID: string, index: number)
} export default IRowLogic;