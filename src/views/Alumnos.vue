<template>
  <v-app>
  	<v-card class="elevation-0">
  	  <v-row align="center" justify="center">
  	  	<v-col cols="11">
  	  		<Banner></Banner>
  	  	</v-col>
		<!--Tabla con paginacion -->
		<v-col cols="11">
  	  		<v-card>
  	  		  <v-card-text>
  	  		    <v-data-table
  	  		    	:headers="headers"
  	  		    	:items="items"
					:loading="dialogLoading"
					:options.sync="pagination"
					:server-items-length="totalAlumnos"
					:sort-by.sync="sortBy"
					
  	  		    >
  	  		      <template v-slot:top>
  	  		      	<v-row align="center" justify="center" class="mx-5">
  	  		      		<v-col cols="12" sm="6" md =4>
  	  		      			<v-text-field label="Buscar" v-model="search"
  	  		      			></v-text-field>
  	  		      		</v-col>
  	  		      		<v-spacer></v-spacer>
  	  		      			<v-btn @click="dialog=true" color="primary">Registar nuevo alumno</v-btn>
  	  		      	</v-row>
  	  		      </template>

  	  		      <template v-slot:[`item.actions`]="{ item }">
  	  		      	<v-row align="center" justify="center">
  	  		      		<v-tooltip top>
  	  		      		  <template v-slot:activator="{ on, attrs }">
  	  		      		  	<v-icon small class="mr-2" @click="Eliminar(item)" v-bind="attrs" v-on="on">mdi-delete</v-icon>
  	  		      		  </template>
  	  		      		  <span>Eliminar</span>
  	  		      		</v-tooltip>

  	  		      		<v-tooltip top>
  	  		      		  <template v-slot:activator="{ on, attrs }">
  	  		      		  	<v-icon small class="mr-2" @click="Editar(item)" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
  	  		      		  </template>
  	  		      		  <span>Editar</span>
  	  		      		</v-tooltip>
  	  		      	</v-row>
  	  		      </template>
  	  		    </v-data-table>
  	  		  </v-card-text>
  	  		</v-card>
  	  	</v-col>
		
  	  	<v-col cols="11">
  	  		<v-card>
  	  		  <v-card-text>
  	  		    <v-data-table
  	  		    	:headers="headers"
  	  		    	:items="items"
					:loading="dialogLoading"
  	  		    >
  	  		      <template v-slot:top>
  	  		      	<v-row align="center" justify="center" class="mx-5">
  	  		      		<v-col cols="12" sm="6" md =4>
  	  		      			<v-text-field label="Buscar" v-model="search"
  	  		      			></v-text-field>
  	  		      		</v-col>
  	  		      		<v-spacer></v-spacer>
  	  		      			<v-btn @click="dialog=true" color="primary">Registar nuevo alumno</v-btn>
  	  		      	</v-row>
  	  		      </template>

  	  		      <template v-slot:[`item.actions`]="{ item }">
  	  		      	<v-row align="center" justify="center">
  	  		      		<v-tooltip top>
  	  		      		  <template v-slot:activator="{ on, attrs }">
  	  		      		  	<v-icon small class="mr-2" @click="Eliminar(item)" v-bind="attrs" v-on="on">mdi-delete</v-icon>
  	  		      		  </template>
  	  		      		  <span>Eliminar</span>
  	  		      		</v-tooltip>

  	  		      		<v-tooltip top>
  	  		      		  <template v-slot:activator="{ on, attrs }">
  	  		      		  	<v-icon small class="mr-2" @click="Editar(item)" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
  	  		      		  </template>
  	  		      		  <span>Editar</span>
  	  		      		</v-tooltip>
  	  		      	</v-row>
  	  		      </template>
  	  		    </v-data-table>
  	  		  </v-card-text>
  	  		</v-card>
  	  	</v-col>
  	  </v-row>
  	</v-card>

  	<v-dialog
  	  v-model="dialog"
  	  scrollable 
  	  persistent
  	  max-width="800px"
  	  transition="dialog-transition"
  	>
  	  <v-card>
  	    <v-card-title primary-title>
  	      {{editar ? 'Editar' : 'Registrar nuevo'}} alumno
  	    </v-card-title>
  	    <v-card-text>
  	    	<v-form 
			  ref="form" 
			  v-model="valid"
			>
	  	      <v-row align="center" justify="center">
	  	      	<v-col cols="11" sm="6" md="4">
	  	      		<v-text-field 
						label="Nombre" 
						v-model="datos.nombre"
						:rules="[rules.required]"
	  	      		></v-text-field>
	  	      	</v-col>

	  	      	<v-col cols="11" sm="6" md="4">
	  	      		<v-text-field 
						label="Apellido Paterno" 
						v-model="datos.apellidoPaterno"
						:rules="[rules.required]"
	  	      		></v-text-field>
	  	      	</v-col>

	  	      	<v-col cols="11" sm="6" md="4">
	  	      		<v-text-field 
						label="Apellido Materno" 
						v-model="datos.apellidoMaterno"
						:rules="[rules.required]"
	  	      		></v-text-field>
	  	      	</v-col>

	  	      	<v-col cols="11" sm="6" md="4">
	  	      		<v-text-field 
						label="Curp" 
						v-model="datos.curp"
						:rules="[rules.required]"
	  	      		></v-text-field>
	  	      	</v-col>

	  	      	<v-col cols="11" sm="6" md="4">
	  	      		<v-text-field 
						label="Matricula" 
						v-model="datos.matricula"
						:rules="[rules.required]"
	  	      		></v-text-field>
	  	      	</v-col>

	  	      	<v-col cols="11" sm="6" md="4">
	  	      		<v-text-field 
						label="Direccion" 
						v-model="datos.direccion"
						:rules="[rules.required]"
	  	      		></v-text-field>
	  	      	</v-col>

	  	      	<v-col cols="11" sm="6" md="4">
	  	      		<v-text-field 
						label="Telefono 1" 
						v-model="datos.telefono1"
						:rules="[rules.required]"
						v-mask="maskTelefono"
	  	      		></v-text-field>
	  	      	</v-col>

	  	      	<v-col cols="11" sm="6" md="4">
	  	      		<v-text-field 
						label="Telefono 2" 
						v-model="datos.telefono2"
						:rules="[rules.required]"
						v-mask="maskTelefono"
	  	      		></v-text-field>
	  	      	</v-col>

	  	      	<v-col cols="11" sm="6" md="4">
	  	      		<v-text-field 
						label="Email" 
						v-model="datos.email"
						:rules="[rules.required]"
	  	      		></v-text-field>
	  	      	</v-col>
	  	      </v-row>
  	  		</v-form>
  	    </v-card-text>
  	    <v-card-actions>
  	      <v-spacer></v-spacer>
  	      <v-btn @click="cancelar" class="accent">Cancelar</v-btn>
  	      <v-btn class="primary" @click="guardar">Guardar</v-btn>
  	    </v-card-actions>
  	  </v-card>
  	</v-dialog>
	  <!-- Dialogo de carga -->
	  <v-dialog
	  	v-model="dialogLoading"
	  	persistent
	  	width="300"
	  >
	  <v-card-text> 
		  Por favor espere...
		  <v-progress-linear
		  	indeterminate
			  color="white"
			  class="mb-0"
		  >
		  </v-progress-linear>
	  </v-card-text>
	  </v-dialog>
  </v-app>
</template>

<script src="./js/Alumnos.js"></script>