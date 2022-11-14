import express, {Application} from "express";
import userRoutes from "../routes/usuario";
import productRoutes from "../routes/product";
import categoryRoutes from "../routes/category";
import cors from "cors";
import db from './../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: "/api/usuarios",
        products: "/api/products",
        categorys: "/api/categorys"
    }
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";
        this.dbConnection();

        // Middleware
        this.middlewares();
        
        // Definir mis rutas
        this.routes();

    }

    // TODO: Conectar base de datos
    async dbConnection() {
        try {
            await db.authenticate();
            
            console.log("Database online")
        } catch (error: any) {
            throw new Error(error);
            
        }
    }


    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());
        
        // Carpeta publica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.products, productRoutes);
        this.app.use(this.apiPaths.categorys, categoryRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        })
    }
}

export default Server;