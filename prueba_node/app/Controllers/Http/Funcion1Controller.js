'use strict'

var DefaultController = require('./DefaultController');
var await = require('asyncawait/await');

const Agenda = use('App/Models/Agenda');
const Database = use('Database')

class Funcion1Controller extends DefaultController {

	post ({ request, response }) {
		return this.manage_action({ request, response });
  	}

  	// Gestiono las peticiones
  	manage_action({ request, response}){

  		if (this.action === 'listar'){
  			this.async = true;
			return this.listar({ request, response});
  		}else if(this.action === 'crear'){
			this.crear();
  		}else if(this.action === 'borrar'){
  			this.async = true;
			return this.borrar({ request, response});

  		}else{
  			this.code = 404;
  			this.errors.push('Page not found');
  		}
  		return response.status(200).json(this.generate_output());
  	}


  	async listar({ request, response}){
		var contactos = await Database.table('agenda');
	    var final_result = []
	    for (var contacto of contactos){
	    	final_result.push(
	    		{
	    			'id': contacto.id,
		  			'name': contacto.name,
		  			'last_name': contacto.last_name,
		  			'phone_number': contacto.phone_number
  				}
	    	);
	    }
	    this.code = 200;
	    this.output_data = final_result;
	    return response.status(200).json(this.generate_output());
  	}

  	async crear(){
  		if (('name' in this.input_data) && ('last_name' in this.input_data) && ('phone_number' in this.input_data)){
  			const agenda = new Agenda()
			agenda.name = this.input_data['name'];
			agenda.last_name = this.input_data['last_name'];
			agenda.phone_number = this.input_data['phone_number'];
			await agenda.save()

			this.code = 200;
	    	this.output_data = {'result': 'true'};
  		}else{
  			this.code = 410;
	    	this.errors.push = "estructura mal formada";
  		}
  		return response.status(200).json(this.generate_output());
	}

  	async borrar({ request, response}){
  		if ('id_agenda' in this.input_data){
  			const affectedRows = await Database
			  .table('agenda')
			  .where('id', this.input_data['id_agenda'])
			  .delete();

			this.code = 200;
	    	this.output_data = {'result': 'true'};
  		}else{
  			this.code = 410;
	    	this.errors.push = "estructura mal formada";
  		}

  		return response.status(200).json(this.generate_output());
  	}

}

module.exports = Funcion1Controller
