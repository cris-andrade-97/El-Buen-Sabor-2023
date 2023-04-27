import { readFile,writeFile } from "fs";

const path = "src/app/components/rubros/grilla-rubro-ingredientes/Rubro Ingredientes.json"

export function lecturaDatos(id: number, nombre: string, estado: boolean){
    readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(data)
        
        const parsedData = JSON.parse(data.toString());

        parsedData["Ingredientes No Vendibles"][id].nombre = nombre;
        parsedData["Ingredientes No Vendibles"][id].estado = estado;

        writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
                console.log("Failed to write updated data to file");
                return;
            }
            console.log("Updated file successfully");
        });    
        
    });

    
}
