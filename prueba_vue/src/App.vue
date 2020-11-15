<template>
  <div id="app">
    
    <div class="container-fluid">
      <div class="col-lg-6 offset-lg-3" style="margin-top: 100px">
        <h4>Agenda Telefónica</h4>
        <div class="container-fluid">
          
          <div class="alert alert-danger" role="alert" v-if="mensaje_error !== ''">
           {{mensaje_error}} <button style="float: right" @click="cerrar_error()">x</button>
          </div>
          <div class="alert alert-success" role="alert" v-if="mensaje_correcto !== ''">
           {{mensaje_correcto}} <button style="float: right" @click="cerrar_correcto()">x</button>
          </div>
        </div>
        <div class="container-fluid">
          <input type="text" style="margin: 10px; float: left" placeholder="Nombre" v-model="nuevo_nombre"/>
          <input type="text" style="margin: 10px; float: left" placeholder="Apellidos" v-model="nuevo_apellido"/>
          <input type="text" style="margin: 10px; float: left" placeholder="Telefono" v-model="nuevo_telefono"/>
          <button style="margin: 10px; float: left" @click="nuevo()">Añadir</button>
      
          <table class="table">
            <thead>
              <tr >
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Telefono</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(persona, index) of personas">
                <td>{{persona.nombre}}</td>
                <td>{{persona.apellido}}</td>
                <td>{{persona.telefono}}</td>
                <td><button @click="borrar(persona.id)">Borrar</button></td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      titulo: 'Gestor de personas',
      nuevo_nombre: '',
      nuevo_apellido: '',
      nuevo_telefono: '',
      mensaje_error: '',
      mensaje_correcto: '',
      personas: [
      ]
    }
  },
  methods: {
    listar () {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {}
        })
      }
      fetch('http://localhost:3333/agenda/listar', requestOptions)
        .then(async response => {
          this.personas = []
          const data = await response.json()
          console.log(data)
          var values = data.data
          for (var index in values) {
            console.log(index)
            this.personas.push({
              nombre: values[index].name,
              apellido: values[index].last_name,
              telefono: values[index].phone_number,
              id: values[index].id
            })
          }
        })
    },
    borrar (index) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            id_agenda: index
          }
        })
      }
      var self = this
      fetch('http://localhost:3333/agenda/borrar', requestOptions)
        .then(async response => {
          console.log(response.json())
          self.listar()
          this.mensaje_correcto = 'Registro borrado'
        })
    },
    nuevo () {
      this.mensaje_correcto = ''
      if (this.nuevo_nombre !== '' && this.nuevo_apellido !== '' && this.nuevo_telefono !== '') {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              name: this.nuevo_nombre,
              last_name: this.nuevo_apellido,
              phone_number: this.nuevo_telefono
            }
          })
        }
        var self = this
        fetch('http://localhost:3333/agenda/crear', requestOptions)
          .then(async response => {
            console.log(response.json())
            self.listar()
            this.mensaje_error = ''
            this.nuevo_nombre = ''
            this.nuevo_apellido = ''
            this.nuevo_telefono = ''
            this.mensaje_correcto = 'Añadido correctamente'
          })
      } else {
        this.mensaje_error = 'Debe rellenar los 3 campos'
      }
    },
    cerrar_error () {
      this.mensaje_error = ''
    },
    cerrar_correcto () {
      this.mensaje_correcto = ''
    }
  },
  created () {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {}
      })
    }
    fetch('http://localhost:3333/agenda/listar', requestOptions)
      .then(async response => {
        this.personas = []
        const data = await response.json()
        console.log(data)
        var values = data.data
        for (var index in values) {
          console.log(index)
          this.personas.push({
            nombre: values[index].name,
            apellido: values[index].last_name,
            telefono: values[index].phone_number,
            id: values[index].id
          })
        }
      })
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
