<template>
    <v-app>
        <v-card class="elevation-0">
            <v-row align="center" justify="center">
                <v-col cols="11">
                    <Banner></Banner>
                </v-col>
                <v-col cols="11">
                    <v-card>
                        <v-card-text>
                            <v-row align="center" justify="center" class="mx-5">
                                <v-col cols="12" sm="6">
                                    <v-text-field label="Buscar" v-model="search">
                                    </v-text-field>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="registrar">Registrar nuevo plantel</v-btn>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="11">
                    <v-card>
                        <v-card-text>
                            <v-data-table
                            :headers="headers"
                            :items="items"
                            :search="search"
                            >
                            <!--Actions de Editar y Eliminar items -->  
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-row align="center" justify="center">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on, attrs}">
                                            <v-icon @click="eliminar(item.idPlantel)" small class="mr-2" v-bind="attrs" v-on="on">mdi-delete</v-icon>
                                        </template>
                                        <span>Eliminar</span>
                                    </v-tooltip>
                                    <v-tooltip top>
                                        <template v-slot:activator="{on, attrs}">
                                            <v-icon @click="Editar(item)" small class="mr-2" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
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
        <!-- Dialogo para Editar o Registrar un Plantel -->
        <v-dialog
            v-model="dialog"
            persistent
            max-width="800px"
            transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    {{editar ? 'Editar plantel' : 'Registrar nuevo plantel'}} plantel
                </v-card-title>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                    >
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field 
                                    label="Nombre del plantel" 
                                    v-model="datos.nombrePlantel"
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field 
                                    label="Dirección" 
                                    v-model="datos.direccion"
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field 
                                    label="Colonia" 
                                    v-model="datos.colonia"
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field 
                                    label="Código Postal" 
                                    v-mask="maskCodigoP" 
                                    v-model="codigoPostal"
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field 
                                    label="Telefono 1" 
                                    v-mask="maskTelefono" 
                                    v-model="telefono1"
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Telefono 2" v-mask="maskTelefono" v-model="telefono2"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    label="Entidad"
                                    :items="entidades"
                                    v-model="entidad"
                                    :rules="[rules.required]"
                                    item-text="nombre"
                                    item-value="idEntidadFederativa"> 
                                </v-select>
                            </v-col>
                             <v-col cols="12" sm="6" md="4">
                                <v-select
                                    :loading="loadingMunicipio"
                                    label="Municipio"
                                    :rules="[rules.required]"
                                    :items="municipios"
                                    v-model="municipio"
                                    item-text="nombre"
                                    item-value="idMunicipio"> 
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <!--Actions de cancelar y guardar -->
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" @click="cancelar">Cancelar</v-btn>
                    <v-btn color="primary" @click="guardar">Guardar</v-btn>
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


<script src="./js/Planteles.js"></script>