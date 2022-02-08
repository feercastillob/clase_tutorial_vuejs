import Banner from '@/components/Banner.vue'
import { getData, postData } from './axios';


export default {
    components: {
        Banner,
    },
    data: () => ({
        search: '',
        valid: false,
        dialog: false,
        menu: false,
        editar: false,
        dialogLoading: false,
        //Formato de la fecha se utiiza en funcion formateDate
        dateFormatted: '',
        //Datos formulario
        alumno: '',
        cantidad: '',
        total: '',
        recibido: '',
        cambio: '',
        curso: '',
        concepto: '',
        date: '',
        idCobro: 0, //Se utiliza para eliminar 
        //Declaración de los select, estos se llenan por medio del Web Services 
        items: [], 
        cursos: [],
        conceptos: [],
        alumnos: [],
        
        //Regla de validación para que los campos sean requeridos.
        rules: {
			required: value => !!value || 'Este campo es necesario',
        },
        // Encabezado de la tabla (Value -> debe de ser igual al del servicio)
        headers: [
            { text: 'Actions', value: 'actions', align: 'center', sortable: false, class: 'indigo lighten-5' },
			{ text: 'Folio de cobro', value: 'idCobro', align: 'center', sortable: false, class: 'indigo lighten-5', filterable: false, },
            { text: 'Alumno', value: 'nombreAlumno', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Fecha de cobro', value: 'fecha', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Curso', value: 'nombreCurso', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Concepto', value: 'nombreConcepto', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Cantidad', value: 'cantidad', align: 'center', sortable: false, class: 'indigo lighten-5' },
            { text: 'Total', value: 'total', align: 'center', sortable: false, class: 'indigo lighten-5' },
        ],          
    }),

    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        },
        cantidad(val) {
            this.calcularCambio();
        },
        total(val) {
            this.calcularCambio();
        },
        recibido(val) {
            this.calcularCambio();
        },
    },

    mounted() {
        console.log(this.$session.get('idUsuario'));
        console.log(this.$session.get('objeto'));
        this.iniciar();
    },

    methods: {
        iniciar() {
            getData('catalogo/getCatalogo/1')
                .then(data => {
                    console.log(data);
                    this.cursos = data;
                })
            getData('catalogo/getCatalogo/2')
                .then(data => {
                    console.log(data);
                    this.conceptos = data;
                })
            getData('alumnos/getAlumnos')
                .then(data => {
                    console.log(data);
                    this.alumnos = data;
                })
            this.llenarTablaCobro();

        },
        Editar(item) {
            this.idCobro = item.idCobro;
            this.alumno = item.idAlumno;
            this.date = item.fecha;
            this.curso = parseInt(item.idCurso);
            this.concepto = item.idConcepto;
            this.cantidad = item.cantidad;
            this.total = item.total;

            this.editar = true;
            this.dialog = true
        },

        llenarTablaCobro() {
            getData('cobro/getCobrosvue')
                .then(data => {
                    console.log(data);
                    this.items = data;
          })  
        },
        cancelar() {
            this.dialog = false,
            this.$refs.form.reset();
        },
        guardar() {
            if (this.$refs.form.validate() && !this.editar) {
                this.dialogLoading = true;
                var params = new URLSearchParams();
                params.append('idAlumno', this.alumno)
                params.append('fecha', this.date)
                params.append('idCurso', this.curso)
                params.append('idConcepto', this.concepto)
                params.append('cantidad', this.cantidad)
                params.append('total', this.total)
                postData(params, 'cobro/registrarCobro')
                    .then(data => {
                        this.dialogLoading = false;
                        console.log(data);
                        if (!data.error) {
                            this.cancelar();
                            this.llenarTablaCobro();
                        }
                })

            }
            if (this.$refs.form.validate() && this.editar) {
                this.dialogLoading = true;
                var params = new URLSearchParams();
                params.append('idCobro', this.idCobro)
                params.append('idAlumno', this.alumno)
                params.append('fecha', this.date)
                params.append('idCurso', this.curso)
                params.append('idConcepto', this.concepto)
                params.append('cantidad', this.cantidad)
                params.append('total', this.total)
                postData(params, 'cobro/updateCobro')
                    .then(data => {
                        this.dialogLoading = false;
                        console.log(data);
                        if (!data.error) {
                            this.cancelar();
                            this.llenarTablaCobro();
                        }
                })

            }
        },

        calcularCambio(){
            if(this.cantidad !='' && this.total!='' && this.recibido!=''){
                this.cambio= this.recibido - (this.cantidad * this.total);
            }else{
                this.cambio = "Ingrese valores para calcular"
            }
        },  

        formatDate(date){
            if(!date) return null;
            const[year,month,day] = date.split('-');
            return '${day}/${month}/${year}';
        }
    }
}