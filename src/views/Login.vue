<template>
  <v-app>
  	<v-row align="center" justify="center">
  		<v-col cols="12" sm="6" md="6" class="pa-0 d-none d-sm-flex">
  			<v-img :src="require('../assets/portadaLogin.jpg')" style="height: 100vh"></v-img>
  		</v-col>	
  		<v-col cols="12" sm="6" md="6">
  			<v-card class="elevation-0">
  				<v-card-title>
  				  <v-row align="center" justify="center">
  				  	<v-col cols="12">
  				  	  <v-img aspect-ratio="4" contain :src="require('../assets/logo_16.png')"></v-img>
  				  	</v-col>
  				  	<v-col cols="12" class="py-0">
  				  		<p class="headline text-center">Portal de cobros</p>
  				  	</v-col>
                        <v-col cols="12">
  				  		<p class="headline text-center">Por favor escribe tu usuario y password</p>
  				  	</v-col>
  				  </v-row>
  				</v-card-title>
			  
              <v-card-text>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >
			  	        <v-row align="center" justify="center">
				  	        <v-col cols="11" sm="10" md="4">
				  		        <v-text-field
                                    :rules="[rules.required]"
                                    v-model="usuario" 
                                    label="Usuario">
                                </v-text-field>
				  	        </v-col>
				        </v-row>
				        <v-row align="center" justify="center">
				  	        <v-col cols="11" sm="10" md="4">
				  		        <v-text-field 
                                    :rules="[rules.required]"
                                    v-model="password"
                                    label="Password"
									type="password">
                                </v-text-field>
				  	        </v-col>
				        </v-row>
                  </v-form>
			  </v-card-text>
              
              <v-card-actions>
                    <v-row align="center" justify="center">
				  	    <v-col cols="12" sm="10" md="4">
			                <v-btn block @click="login" class="primary">Login</v-btn>
                        </v-col>
                     </v-row>
			  </v-card-actions>
                    
			</v-card>
  		</v-col>
  	</v-row>
  </v-app>
</template>

<script src="./js/Login.js"></script>