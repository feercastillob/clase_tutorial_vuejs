<template>
  <v-app>
  	<v-card class="elevation-0">
  	  <v-row align="center" justify="center">
  	  	<v-col cols="11">
  	  		<Banner :isCobros="true"></Banner>
  	  	</v-col>
  	  	<v-col cols="11">
  	  	  <v-card>
  	  		<v-card-text>
  	  		   <v-data-table
  	  		     :headers="headers"
  	  		     :items="items"
				 :search="search"
  	  		   >
				   <template v-slot:top>
					   <v-row align="center" justify="end" class="mx-5">
						   <v-col cols="12" sm="6" md="4">
							   <v-text-field laber="Buscar" v-model="search" prepend-inner-icon="mdi-magnify">
							   </v-text-field>
						   </v-col>
						   <v-spacer></v-spacer>
							   <v-btn class="primary" @click="dialog=true">Realizar Cobro</v-btn> 
					   </v-row>
				   </template>
				   <template v-slot:[`item.actions`]="{ item }">
  	  		      	<v-row align="center" justify="center">
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
		persistent
		max-width="800px"
		transition="dialog-transition">
		<v-card>
			<v-card-title primary-title>
				{{editar ? 'Editar' : 'Ingresar Nuevo Cobro'}} cobro	
			</v-card-title>

			<v-card-text>
				<v-form 
					ref="form" 
					v-model="valid" 
					lazy-validation
					>
					<v-row align="center" justify="center">
						<v-col cols="12" sm="6" md="4">
							<v-autocomplete
								item-text="nombre" 
								item-value="idAlumno"
								:rules="[rules.required]"
								v-model="alumno" 
								:items="alumnos" 
								label="Alumno"
							></v-autocomplete>
						</v-col>

						<v-col cols="12" sm="6" md="4">
							<v-menu ref="menu" v-model="menu" max-width="290px" min-width="290px">
								<template v-slot:activator="{on, attrs}">
									<v-text-field 
										label="Fecha de cobro" 
										v-model="dateFormatted" 
										prepend-icon="adi-calendar" 
										v-bind="attrs" 
										readonly v-on="on"
										:rules="[rules.required]">
									</v-text-field>
									
								</template>
								<v-date-picker v-model="date" @input="menu = false"></v-date-picker>
							</v-menu>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-select
								:items="cursos"
								v-model="curso"
								label="Curso"
								item-text="nombre"
								item-value="idCatalogo">
							</v-select>

						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-select
								:items="conceptos"
								v-model="concepto"
								label="Concepto"
								item-text="nombre"
								:rules="[rules.required]"
								item-value="idCatalogo">
							</v-select>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								label="Cantidad"
								v-model="cantidad"
								:rules="[rules.required]"
								type="number" onkeydown="javascript: return event.keyCode == 69 ? false : true">
							</v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								label="Total"
								v-model="total"
								:rules="[rules.required]"
								type="number" onkeydown="javascript: return event.keyCode == 69 ? false : true">
							</v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								label="Recibido"
								v-model="recibido"
								:rules="[rules.required]"
								type="number" onkeydown="javascript: return event.keyCode == 69 ? false : true">
							</v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								:rules="[rules.required]"
								label="Cambio" readonly persistent-hit hint="Solo Lectura"
								v-model="cambio"
								type="number">
							</v-text-field>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn class="accent" @click="cancelar">Cancelar</v-btn>
				<v-btn :loading="dialogLoading" class="primary" @click="guardar">Aceptar</v-btn>
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

<script src="./js/Cobros.js"></script>