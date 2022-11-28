import { randomUUID } from "crypto";
import DB from "src/Data/db";
import { BoardCreateBody } from "../Bodies/BoardCreateBody";
import Board from "../models/Board"
import Assignment from "../models/Assignment"
import Canvas from "src/canvas/canvas";
import IBoardLogic from "./IBoardLogic";

export class BoardLogic implements IBoardLogic {
    constructor(private readonly canvasService : Canvas, private readonly dataBaseService : DB){
    }

    async CreateBoard(body : BoardCreateBody){
        let board : Board = new Board();
        let boardID = randomUUID();
        await this.dataBaseService.CreateBoard(body.name, boardID , "owner");
        
        board.name = body.name;
        board.id = boardID;
        for (let course of body.courses){
          await this.dataBaseService.LinkBoardToCourse(board.id, course); //
          let assignments = await this.canvasService.GetAssignments(course);
          for(let assignment of assignments){
            board.assignments.push(assignment);
            await this.dataBaseService.CreateAssignment(randomUUID(), boardID, assignment.id);
          }      
        }
        return board;
      }
    
    
      async getBoardById(boardID : string){
        let assignments : Assignment[] = [];
        for(let D of await this.dataBaseService.GetCourses(boardID)){
          for(let Y of await this.dataBaseService.GetAssignments(boardID)){
            assignments.push(await this.canvasService.GetAssignment(Y.canvasId, D.canvasId));
          }
        }
        return assignments;
      }
    
    
      async getAllBoards(){
        return await this.dataBaseService.GetAllBoard("owner");;
      }
}
  