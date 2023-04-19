const inquirer = require('inquirer');
require('colors');


const inquirerMenu = async() => {

    console.clear();
    console.log('=========================='.blue);
    console.log('  Seleccione una opción'.grey );
    console.log('==========================\n'.blue);

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                {
                    value: 1,
                    name: `${ '1.'.blue } Buscar ciudad`
                },
                {
                    value: 2,
                    name: `${ '2.'.blue } Historial`
                },
                {
                    value: 0,
                    name: `${ '0.'.blue } Salir`
                }
            ]
        }
    ];

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}
 const pausa = async()=>{

    const question= [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"ENTER".green} para continuar`
        }
    ]

    await inquirer.prompt(question);

 }

 const leerInptu= async(message)=>{

    const question= [
        {
            type: "input",
            name: "desc",
            message: message,
            validate(value){
                if(value.length === 0){
                    return "Por favor ingrese un valor"
                }
                return true
            }
    
        }
    ]
    const {desc}= await inquirer.prompt(question)
    return desc

 }  

 const listarLugares=async (lugares=[])=>{

    const choices = lugares.map((lugar, i) =>{

        const idx= `${i+1}.`.blue

        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: "0",
        name: "0.". blue + "Cancelar"
    })

    const preguntas= [
        { 
            type:"list",
            name: "id",
            message: "Seleccione lugar: ",
            choices:choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id
 }

 const confirmar= async(message)=>{

    const question= [
        {
            type: "confirm",
            name: "ok",
            message: message
        }
    ]
    const { ok } = await inquirer.prompt(question);
    return ok

 }

 const mostrarListadoChecklist=async (lugars=[])=>{

    const choices = lugars.map((lugar, i) =>{

        const idx= `${i+1}.`.blue

        return{
            value: lugar.id,
            name: `${idx} ${lugar.desc}`,
            checked: (lugar.completadaEn) ? true : false
        }
    })

    const preguntas= [
        { 
            type:"checkbox",
            name: "ids",
            message: "Selecciones",
            choices:choices
        }
    ]
    const { ids } = await inquirer.prompt(preguntas);
    return ids
 }



    

module.exports = {
    inquirerMenu,
    pausa,
    leerInptu,
    confirmar,
    mostrarListadoChecklist,
    listarLugares
}
