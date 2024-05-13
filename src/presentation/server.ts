
import express from 'express';
import path from 'path';

interface Options {
    port: number,
    public_path?: string
}

export class Server {

    
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options){
        const { port, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
    }



    async start(){
        
        //* Middleware

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