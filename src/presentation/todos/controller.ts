
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoEntity, TodoRepository } from "../../domain";

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: null },
    { id: 3, text: 'Buy butter', createdAt: new Date() }
];

export class TodosController{
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}
         public getTodos = async (request: Request, response: Response) => {

            // const todos = await prisma.todo.findMany();
            // return response.json(todos);
            const todos = await this.todoRepository.getAll();
            
            return response.json(todos);
        }

        public getTodoById = async (request: Request, response: Response) => {
            try{
                const id = +request.params.id;
                const todo = await this.todoRepository.findById(id);
                return response.json(todo);
            }catch(error){
                console.log(error, 'este es el error');
                return response.json({mensaje: 'El id ingresado no se encuentra en los registros'})
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

        public updateTodo = async (request: Request, response: Response) => {
            const id = +request.params.id;
            const [ error, updateTodoDto] = UpdateTodoDto.update({
                ...request.body, id
            });

            if(error) return response.status(404).json({ error: `Todo with id ${ id } not found`});


            const todo = await prisma.todo.findFirst({
                where: { id }
            });

            

            if(!todo) {  return response.status(404).json({ error: `TODO with id ${id} not found`});}

            const { text, completedAt } = request.body;
            const updateTodo = await prisma.todo.update({
                where: { id },
                data: {
                    text,
                    completedAt: (completedAt) ? new Date(completedAt) : null
                }
            });
            
            response.json( updateTodo)

            
        }
    
}