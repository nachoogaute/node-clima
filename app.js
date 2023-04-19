require("dotenv").config();

const { inquirerMenu, pausa, leerInptu, listarLugares } = require('./helpers/inquirer')
const Busquedas = require('./models/busquedas')



const main = async()=>{

    let opt= ""
    const busquedas= new Busquedas
    


    do{
        opt= await inquirerMenu()

        switch(opt){
            case 1:
                //MOSTRAR MENSAJE
                const terminos= await leerInptu("Ciudad: ")
                //BUSCAR LOS LUGARES
                const lugares= await busquedas.ciudad(terminos)
                //SELECCIONAR LUGAR
                const id= await listarLugares(lugares)
                if(id==="0")continue;
                const lugarSel= lugares.find(l => l.id===id)
                //GUARDAR DB
                busquedas.agregarHistorial(lugarSel.nombre)
                //CLIMA
                const clima= await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)

                
                console.clear()
                console.log("\nInformacion de la ciudad\n".bgRed)
                console.log("Ciudad: ",lugarSel.nombre.red)
                console.log("Lat: ",lugarSel.lat)
                console.log("Lng: ",lugarSel.lng)
                console.log("Temperatura: ",clima.temp)
                console.log("Minima: ",clima.min)
                console.log("Maxima: ",clima.max)
                console.log("¿Como esta el clima?: ",clima.desc.red)
            break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i)=>{
                    const idx= `${i + 1}.`.blue
                    console.log(`${idx} ${lugar}`)
                })
            break
        }

        await pausa()

    }while(opt !== 0)
}

main();