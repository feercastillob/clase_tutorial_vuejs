export default{
    beforeCreate() {
        //Si no existe ninguna sesion no dejará entrar
        if(!this.$session.exists()){
            this.$router.push({name: 'Login'});
        }

    },
    methods: {
        //Metodo que destruye la sesion
        logout() {
            this.$session.destroy();
            this.$router.push({name: 'Login'});
        }
    }
    
}