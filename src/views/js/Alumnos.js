import Banner from '@/components/Banner.vue'
import {postData, getData, putData, deleteData } from './axios.js'

export default{
	components: {
		Banner
	},
	data: () => ({
		search: '',
		editar: false,
		dialog: false,
		dialogLoading: false,
		valid: false,
		//Mascara 
		maskTelefono: '(###) ###-####',
		//Para paginación 
		pagination: {},
		totalAlumnos: 0,
		sortBy: 'nombre',
		
		//Arreglo de datos alumno
		datos: {
			idAlumno: 0,
        	nombre: '',
        	apellidoPaterno: '',
        	apellidoMaterno: '',
        	curp: '',
        	matricula: '',
        	direccion: '',
        	telefono1:'',
        	telefono2: '',
        	email: '',
		},

		items: [],
		alumnos: [],

		//Regla de validación para que los campos sean requeridos.
		rules: {
			required: value => !!value || 'Este campo es necesario',
		},
		// Encabezado de la tabla (Value -> debe de ser igual al del servicio)
		headers: [
            { text: 'Actions', value: 'actions', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Nombre', value: 'nombre', align: 'center', class: 'indigo lighten-5' },
            { text: 'Apellido Paterno', value: 'apellidoPaterno', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Apellido Materno', value: 'apellidoMaterno', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'CURP', value: 'curp', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Matricula', value: 'matricula', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Dirección', value: 'direccion', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Teléfono 1', value: 'telefono1', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Teléfono 2', value: 'telefono2', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Correo Electrónico', value: 'email', align: 'center', sortable: false, class: 'indigo lighten-5' },
        ],
	}),

	//Listener de la paginación
	watch: {
		pagination: {
			handler() {
				console.log(this.pagination);
				//metodoLlenado de alumnos
				this.getAlumnosPagination();
			},
			deep: true
		},
	},

	mounted() {
		this.iniciar();	
	},

	methods: {
		iniciar() {
			getData("alumnos/getAlumnos")
				.then(data => {
					console.log(data);
					this.items = data;
					this.totalAlumnos = data.length;
			})
		},

		getTotalAlumnos() {
			getData("alumnos/getTotalAlumnos")
				.then(data => {
					console.log(data);
					this.items = data;
					this.totalAlumnos = data.length;
			})
			
		},

		getAlumnosPagination() {
			var sortbyTemp = 1;
			switch(this.sortby) {
				case 'nombre':
					sortbyTemp = 1;
					break;
				case 'apellidoPaterno':
					sortbyTemp = 2;
					break;
				case 'apellidoMaterno':
					sortbyTemp = 3;
					break;
				case 'email':
					sortbyTemp = 4;
					break;	
			}
			var directionTemp = 2;
			if (this.pagination.sortDesc.length != 0) {
				if (this.pagination.sortDesc[0]) {
					directionTemp = 1;
				} else {
					directionTemp = 2;
				}
			} else {
				directionTemp = 2;
			}
			//alumnos/getAlumnosByPagination/page,rowsperpage,direction,sortby
			getData('alumnos/getAlumnosByPagination/'+this.pagination.page+','+this.pagination.itemsPerPage+','
													+directionTemp+','+sortbyTemp)
			.then(data => {
				console.log(data);
				this.alumnos = data;
			})
		},

		registrar(){
			this.editar = false;
			this.dialog = true;
		},
		cancelar(){
			this.dialog = false;
			this.$refs.form.reset();
		},
		Editar(item) {
			this.datos.idAlumno = item.idAlumno;
			this.datos.nombre = item.nombre;
			this.datos.apellidoPaterno = item.apellidoPaterno;
			this.datos.apellidoMaterno = item.apellidoMaterno;
			this.datos.curp = item.curp;
			this.datos.matricula = item.matricula;
			this.datos.direccion = item.direccion;
			this.datos.telefono1 = item.telefono1;
			this.datos.telefono2 = item.telefono2;
			this.datos.email= item.email;

			this.editar=true;
			this.dialog = true;
		},

		guardar() {
			// .replace para remplazar los espacios y parentesis de la mask y no se agreguen a la bd modificados
			if(this.$refs.form.validate() && !this.editar){
				this.dialogLoading = true;
				var params = new URLSearchParams();
				params.append("nombre",this.datos.nombre);
				params.append("apellidoPaterno",this.datos.apellidoPaterno);
				params.append("apellidoMaterno",this.datos.apellidoMaterno);
				params.append("curp",this.datos.curp);
				params.append("matricula",this.datos.matricula);
				params.append("direccion",this.datos.direccion);
				params.append("telefono1",this.datos.telefono1.replace(/\D+/g,""));
				params.append("telefono2",this.datos.telefono2.replace(/\D+/g,""));
				params.append("email",this.datos.email);
				postData(params,'alumnos/registrarAlumno')
				.then(data => {
					this.dialogLoading = false;
					console.log(data);
					if (!data.error) {
							this.items = [];
							this.cancelar();
							this.iniciar();
					}
				})
			}

			if (this.$refs.form.validate() && this.editar) {
				this.dialogLoading = true;
				var params = new URLSearchParams();
				params.append("idAlumno", this.datos.idAlumno);
				params.append("nombre", this.datos.nombre);
				params.append("apellidoPaterno", this.datos.apellidoPaterno);
				params.append("apellidoMaterno", this.datos.apellidoMaterno);
				params.append("curp", this.datos.curp);
				params.append("matricula", this.datos.matricula);
				params.append("direccion", this.datos.direccion);
				params.append("telefono1", this.datos.telefono1.replace(/\D+/g, ""));
				params.append("telefono2", this.datos.telefono2.replace(/\D+/g, ""));
				params.append("email", this.datos.email);
				putData(params, 'alumnos/updateAlumno')
					.then(data => {
						this.dialogLoading = false;
						console.log(data);
						if (!data.error) {
							this.items = [];
							this.cancelar();
							this.iniciar();
						}
					})
			}
		},
		Eliminar(item) {
			this.dialogLoading = true;
			var params = new URLSearchParams();
			params.append("idAlumno", item.idAlumno);
			deleteData(params, 'alumnos/deleteAlumno')
				.then(data => {
					this.dialogLoading = false;
					console.log(data);
					if (!data.error) {
						this.items = [];
						this.iniciar();
					}
			})
		}
	}
}