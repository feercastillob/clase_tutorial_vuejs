<template>
  <v-card class="elevation-3 mt-5 py-9" rounded="lg">
    <v-card-text>
      <v-btn v-if="!isCobros" color="success" rounded icon class="botonatras" @click="atras"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="4" lg="3">
          <v-row justify="center" align="center">
            <v-img contain height=100 :src="require('../assets/logo1.jpg')"></v-img>
          </v-row>
        </v-col>

        <v-col cols="12" sm="5" md="4" lg="5">
          <p class="text-center mt-2 display-1" style="color: #43425D;">Portal de Cobros</p>
          <p v-if="isCobros" class="display-1 text-center">11 de Febrero de 2021</p>
        </v-col>

        <v-col cols="10" sm="5" md="3" lg="3" xl="2">
          <v-row align="center" justify="center">
            <img src="../assets/perfil.png" class="imagenperfil ml-4"/>
            <v-col>
              <div class="subtitle-1 font-weight-bold text-center">
                {{nombre}}
              </div>
              <div class="subtitle-1 font-weight-bold text-center">{{telefono | VMask('(###) ###-####')}}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style type="text/css">

  .imagenperfil {
    width: 60px !important;
  }

  @media screen and (max-width: 600px) {
    .imagenperfil {
      width: 50px !important;
    }
  }
  .botonatras{
    position: absolute !important;
    top: 10px !important;
    left: 10px !important;
  }

</style>

<script>

export default {
 props: {
    isCobros: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      // Para  poner el nombre y telefono de la persona que inicio sesion en el banner
      nombre: '',
      telefono: '',
    }
  },
  mounted(){
    if(this.$session.exists()){
      this.nombre = this.$session.get('nombre');
      this.telefono = this.$session.get('objeto').telefono;
    }
  },


  methods: {
    atras(){
      this.$router.push({name: 'Cobros'})
    }
  }
};
</script>