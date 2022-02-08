import Banner from '@/components/Banner.vue'
import {postData, getData, putData, deleteData } from './axios.js'

export default{
    components:{
        Banner,
    },
    data: () => ({
        search: '',
        dialog: false,
        valid: false,
        editar: false,
        dialogLoading: false,
        loadingMunicipio: false,
        //Ejem. de arreglo de datos para acceder a el se utiliza el .datos.nombre
         datos: {
            idPlantel: 0,
            nombrePlantel: '',
            direccion: '',
            colonia: '',
        }, 
        //Datos declarados sin arreglo
        codigoPostal: '',
        telefono1: '',
        telefono2: '',
        entidad: '',
        municipio: '',
 
        //Mascara 
        maskCodigoP: '#####',
        maskTelefono: '(###) ###-####',

        items: [],
        //Declaración de los select, estos se llenan por medio del Web Services 
        entidades: [],
        municipios: [],

        //Regla de validación para que los campos sean requeridos.
        rules: {
			required: value => !!value || 'Este campo es necesario',
        },

        // Encabezado de la tabla (Value -> debe de ser igual al del servicio)
        headers: [
			{ text: 'Actions', value: 'actions', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Nombre del plantel', value: 'nombrePlantel', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Direccion', value: 'direccion', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Colonia', value: 'colonia', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Código Postal', value: 'cp', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Teléfono 1', value: 'telefono1', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Teléfono 2', value: 'telefono2', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Entidad Federativa', value: 'nombreEntidad', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Municipio', value: 'nombreMunicipio', align: 'center', sortable: false, class: 'indigo lighten-5' },
        ],
    }),

    //Este watch se implementa para siempre estar escuchando si se selecciona un municipio automaticamente 
    //debe de mostrar también la entidad dentro del otro select.
    watch: {
        entidad(val) {
            if(val!=null){
                this.loadingMunicipio = true;
                this.municipios = [];
                console.log(val);
                getData('catalogo/getMunicipios/' + this.entidad)
                .then(data => {
                    this.loadingMunicipio = false;
                    //this.municipio = '';
                    this.municipios = data;
            })
            }
        }
    },

    //Para que siempre se carguen los datos 
    mounted() {
        this.iniciar(); 
    },

    methods: {
            //Carga el select de Entidades dentro del formulario 
            iniciar() {
                getData('catalogo/getEntidadesFederativas')
                    .then(data => {
                        this.entidades = data;
                    })
                    this.getPlanteles();
            },
            //Carga el select de Planteles dentro del formulario 
            getPlanteles() {
                getData('plantel/getPlantelesVue')
                    .then(data => {
                        this.items = data;
                })
             },
             
            cancelar() {
			    this.$refs.form.reset()
                this.dialog = false;
                this.municipio = '';
		    },
            //Dentro de esta función se encuentra el registrar y editar.
            guardar(){
                if (this.$refs.form.validate() && !this.editar) {
                    this.dialogLoading = true;
                    var params = new URLSearchParams();
				    params.append('nombrePlantel', this.datos.nombrePlantel)
				    params.append('direccion', this.datos.direccion)
				    params.append('colonia', this.datos.colonia)
				    params.append('cp', this.codigoPostal)
				    params.append('telefono1', this.telefono1.replace(/\D+/g,""))
				    params.append('telefono2', this.telefono2.replace(/\D+/g,""))
				    params.append('idEntidadFederativa', this.entidad)
                    params.append('idMunicipio', this.municipio)
                    postData(params, 'plantel/registrarPlantelvue')
                        .then(data => {
                            this.dialogLoading = false;
                            this.cancelar();
                            this.getPlanteles();
                    })
                }
                //Editar el plantel (se agrega el idPlantel para saber qué item se esta editando)
                if (this.$refs.form.validate() && this.editar) {
                    this.dialogLoading = true;
                    var params = new URLSearchParams();
                    params.append('idPlantel', this.datos.idPlantel)
				    params.append('nombrePlantel', this.datos.nombrePlantel)
				    params.append('direccion', this.datos.direccion)
				    params.append('colonia', this.datos.colonia)
				    params.append('cp', this.codigoPostal)
				    params.append('telefono1', this.telefono1.replace(/\D+/g,""))
				    params.append('telefono2', this.telefono2.replace(/\D+/g,""))
				    params.append('idEntidadFederativa', this.entidad)
                    params.append('idMunicipio', this.municipio)
                    putData(params, 'plantel/updatePlantelVue')
                        .then(data => {
                            this.dialogLoading = false;
                            this.cancelar();
                            this.getPlanteles(); 
                    })

                }
            },

            Editar(item){
                this.editar = true;
                console.log(item);

                this.datos.idPlantel = item.idPlantel;
                this.datos.nombrePlantel = item.nombrePlantel;
                this.datos.direccion = item.direccion;
                this.datos.colonia = item.colonia;
                this.telefono1 = item.telefono1;
                this.telefono2 = item.telefono2;
                this.codigoPostal = item.cp;
                this.entidad = item.idEntidadFederativa;
                this.municipio = item.idMunicipio;
                
                
                this.dialog = true;
        },
            
        eliminar(idEliminar) {
            this.dialogLoading = true;
            var params = new URLSearchParams();
            params.append('idPlantel', idEliminar)
            deleteData(params, 'plantel/deletePlantel')
                .then((data => {
                    console.log(data);
                    this.dialogLoading = false;
                    this.getPlanteles();
            }))
            },

            registrar() {
                this.editar= false;
                //this.$refs.form.reset()
                this.dialog = true;
            },
        }

    
}