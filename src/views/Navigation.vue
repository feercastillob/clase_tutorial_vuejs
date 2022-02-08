<template>
  <v-app>
	<v-card style="height: 100vh">
	  <v-navigation-drawer permanent expand-on-hover app dark class="primary">
		  <v-list nav dense>
		    <v-list-item to="/cobros" active-class=“white--text”>
		      <v-list-item-icon>
		      	<v-icon>mdi-currency-usd</v-icon>
		      	<v-list-item-title>Cobro</v-list-item-title>
		      </v-list-item-icon>
		    </v-list-item>
		    <v-list-item to="/planteles" active-class=“white--text”>
		      <v-list-item-icon>
		      	<v-icon>mdi-domain</v-icon>
		      	<v-list-item-title>Planteles</v-list-item-title>
		      </v-list-item-icon>
		    </v-list-item>
		    <v-list-item to="/alumnos" active-class=“white--text”>
		      <v-list-item-icon>
		      	<v-icon>mdi-account-multiple</v-icon>
		      	<v-list-item-title>Alumnos</v-list-item-title>
		      </v-list-item-icon>
		    </v-list-item>
		  </v-list>
		  <v-divider></v-divider>
		  <template v-slot:append>
		  	<v-list nav dense>
			    <v-list-item @click="logout">
			      <v-list-item-icon>
			      	<v-icon>mdi-login-variant</v-icon>
			      	<v-list-item-title>Cerrar sesion</v-list-item-title>
			      </v-list-item-icon>
			    </v-list-item>
			</v-list>
		  </template>
	  </v-navigation-drawer>
	  <v-main>
        <router-view></router-view>
      </v-main>
	</v-card>
  </v-app>
</template>

<script src="./js/Navigation.js"></script>