import app from "./app";
import { AppDataSource } from "./db/conexion";

async function main() {
    try {
        await AppDataSource.initialize()
        console.log('Base de datos conectada')
        app.listen(6565, () => {
            console.log("server activo");
        })
    } catch (error) {
        if (error instanceof Error){
            console.log(error.message)
        }

    }
   
}
main()

