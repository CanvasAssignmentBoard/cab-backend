import { BoardCreateBody } from "src/Bodies/BoardCreateBody";

interface IBoardLogic{
    CreateBoard(body : BoardCreateBody);
    getBoardById(boardID : String);
    getAllBoards();
} export default IBoardLogic;