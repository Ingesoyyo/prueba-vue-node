'use strict'

class DefaultController {

	// Extractor de datos
	read_input({request}){
		

		if ('action' in request.params){
			this.input_data = request.body['data'];
			
		}else{
			this.code = 400;
			this.errors.push("El formato del json entrante no es correcto.")
		}

		if ('action' in request.params){
			this.action = request.params["action"];
		}else{
			this.code = 403;
			this.errors.push("La url espcificada no es valida.")
		}
	}

	// Formalizo la respuesta
	generate_output(){
		return {
			'codigo': this.code,
			'data': this.output_data,
			'errors': this.errors
		}
	}

	dispatch({ request, response }){
		// Declaro las variables que espero para entrada y para salida.
		this.input_data = {};
		this.action = '';

		this.code = 200;
		this.output_data = {};
		this.errors = [];

		this.async = false;

		// Distribuyo las peticiones según el metodo
		if (request.method() == 'GET'){
			this.get({request, response})

		}else if(request.method() == 'POST'){

			this.read_input({ request });
			if (this.code === 200){
				return this.post({request, response})
				
			}
		}else{
			this.code = 400;
			this.errors.push("Tipo no soportado: " + request.method())
		}

		if (!this.async){
			return response.json(this.generate_output());
		}
		
	}

	// Metodos declarado para devolver un error formalizado
	get({ request, response }){
		this.code = 401;
		this.errors.push("Metodo no definido")

	}

	post({ request, response }){
		this.code = 401;
		this.errors.push("Metodo no definido")
	}

}

module.exports = DefaultController
