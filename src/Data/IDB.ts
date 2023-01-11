export default interface IBS{
    CreateBoard(_name: string, _id: string, _owner: number, _description: string, _lastUpdate: string)

    UpdateLastBoardUpdate(_id: string, _lastUpdate: string)
    
    CreateAssignment(_id: string, _rowID: string, _canvasId: number, _courseId: number, _name: string)
    
    GetAssignment(_id: string)
    
    CreateTasks(_Id: string, _AssignmentId: string, _Status: string, _Name: string, _dueDate: string)
    
    EditTask(_Id: string, _AssignmentId: string, Status: string, Name: string, _dueDate: string,)
    
    DeleteTask(_Id: string)
    
    GetTasks(Id: string)
    
    DoesAssignmenthaveTask(Id: string)
    
    DoesTaskExist(Id: string)
    
    DoesAssignmentExist(Id: string)
    
    DoesRowExist(Id: string)
    
    GetAllBoard(_owner: number)
    
    GetBoard(_id: string)
    
    CreateRow(_id: string, _defaultRow: boolean, _name: string, _boardID: string)
    
    RemoveRowConnection(_rowID: string, _assignmentId: string);
    
    AddRowConnection(_rowID: string, _assignmentId: string);
}