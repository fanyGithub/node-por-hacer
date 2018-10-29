const fs = require('fs');




let listadoPorHacer = [];

const crear = (descripcion) =>{

	cargarDB();

	let porHacer =  {

		descripcion,
		completado: false
	};

	listadoPorHacer.push(porHacer);
	guardarDB();

	return porHacer;
}

const getListado = () => {
	/*let data = JSON.stringify(listadoPorHacer);

		fs.readFile('db/data.json', data, (err) => {
			  if (err)throw new Error ('No se pudo leer', err);
		});*/

	cargarDB();

	return listadoPorHacer;

}

const actualizar = (descripcion, completado= true) =>{
	cargarDB();

	let index = listadoPorHacer.findIndex(tarea=>{
		return tarea.descripcion === descripcion;
	});
	//let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
 
 	if( index >= 0){
 		listadoPorHacer[index].completado= completado;
 		guardarDB();
 		return true;
 	}else{

 		return false;
 	}
}

const guardarDB = () => {
	let data = JSON.stringify(listadoPorHacer);

		fs.writeFile('db/data.json', data, (err) => {
			  if (err)throw new Error ('No se pudo grabar', err);
		});

}

const cargarDB = () => {

	try{
		listadoPorHacer = require('../db/data.json'); 
	}catch(error){
		listadoPorHacer = [];
	}	
}


const borrar =  (descripcion) => {
	cargarDB();

	let nuevoListado = listadoPorHacer.filter( tarea => {

		return tarea.descripcion !== descripcion
	});

	if(listadoPorHacer.length  === nuevoListado.length){
		return false;
	}else {
		listadoPorHacer = nuevoListado;
		guardarDB();

		console.log('Si lo borrro ',true);
	}

	/*let index = listadoPorHacer.findIndex(tarea=>{
		return tarea.descripcion === descripcion;
	});
 
 	let resultado = false
 	if( index >= 0){
 		let resultado = removeElement(listadoPorHacer, index);
 		return true;
 	}

 		return resultado;*/
 	
}



module.exports ={
	crear,
	getListado,
	actualizar,
	borrar

}

