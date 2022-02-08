import { postData } from './axios.js'

export default{
    data:() =>({
        usuario: '',
        password: '',
        valid: false,
        rules: {
            required: value => !!value || 'Requerido',
            min: value => value > 10 || 'Minimo 10 caracteres',
        },

    }),
    computed: {

    },

    methods: {
        login(){
            console.log(this.usuario)
            if(this.$refs.form.validate()){
                var params = new URLSearchParams();
                //primero va el key y despues el value
                params.append('email', this.usuario);
                params.append('password', this.password);

                postData(params, 'usuario/loginWeb')
                .then(data => {
                    if (data.error){
                        console.log('Imprimir mensaje de error');
                        //console.log(data.mensaje);

                    }else{
                        this.$session.start();
                        this.$session.set('idUsuario', data.usuario.idUsuario);
                        this.$session.set('nombre', data.usuario.nombre +'' + data.usuario.apellidoPaterno + '' +data.usuario.apellidoMaterno);
                        this.$session.set('objeto', data.usuario);
                        this.$router.push({name: 'Cobros'}); 
                    }
                    console.log(data);
                })
            }
           
        }
    }
}