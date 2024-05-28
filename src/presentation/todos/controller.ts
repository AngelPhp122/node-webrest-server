
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: null },
    { id: 3, text: 'Buy butter', createdAt: new Date() }
];

export class TodosController{
    constructor(){}
         public getTodos = async (request: Request, response: Response) => {

            const todos = await prisma.todo.findMany();
            return response.json(todos);
        }

        public getTodoById = (request: Request, response: Response) => {
            try{
                const id = +request.params.id;
            
           
                const todo = todos.find((todo => todo.id === id));
               
    
                (todo) ? response.json(todo) : response.status(404).json({ error: `TODO with id ${ id } not found`})
                
            }catch(error){
                console.log(error, 'este es el error')
            }
            
        }

        public createTodo = async (request: Request, response: Response) => {
            
            const [error ,createTodoDto] = CreateTodoDto.create(request.body);

            if(error) return response.status(400).json({ error})

            const todo = await prisma.todo.create({
                data: createTodoDto!
            });
            // todos.push({
            //     id: todos.length + 1,
            //     text,
            //     createdAt: null,
            // })
            response.json(todo);
        }

        public updateTodo = (request: Request, response: Response) => {
            const id = +request.params.id;
            if( isNaN(id)){ return response.status(400).json({ error: 'ID argument is not a number'});}

            const todo = todos.find( todo => todo.id === id);

            if(!todo) {  return response.status(404).json({ error: `TODO with id ${id} not found`});}

            const { text } = request.body;

            if(!text){ return response.status(400).json({ error: 'Text property is required'});}

            todo.text = text || todo.text;


            
            response.json('actualizado con exito');
        }
    
}