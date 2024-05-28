
import { create } from 'domain';
import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number,
    public_path?: string,
    routes: Router
}

export class Server {

    
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){
        const { routes, port, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }



    async start(){
        
        //* Middleware
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true}));

        //* Routes
        this.app.use(this.routes);
        

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        this.app.get('*', (request, response)=>{
            console.log(request.url);
            const indexPath = path.join(__dirname + `${this.publicPath}/index.html` );
            console.log(indexPath, 'path')
            response.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Sever running on por ${ 3000 }`);
        })
    }
}