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
  	  		   <v-data-table
  	  		     :headers="headers"
  	  		     :items="items"
  	  		   >
  	  		   </v-data-table>
  	  		</v-card-text>
  	  	  </v-card>
  	  	</v-col>
  	  </v-row>
  	</v-card>
  </v-app>
</template>

<script src="./js/Cobros.js"></script>