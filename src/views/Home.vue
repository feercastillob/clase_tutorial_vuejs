<template>
  <div id="app"> 
	  {{ message }} 
    <br>
    <p>Mensaje invertido computado: "{{ reversedMessage }}"</p>
    <br>

    <button v-on:click="reverseMessage">Reverse 	Message</button>
    <input v-model="age" @change="someHandler" type="number">
    
  </div>
</template>

<script>

export default {
  data: () => ({
	  message: 'Hello Vue! modificado', 
    age: 0,
  }),
  computed: {
	  // un getter computado	          
	  reversedMessage: function () {
	  // `this` apunta a la instancia vm
	  return this.message.split('').reverse().join('')	 
    }         
	},	
  watch: {
	  age (val) {
		  //this.mensaje = "cambio"
		  console.log("this.age")
  	}	
  },
  methods: { 
    reverseMessage: function () { 
	  this.message = this.message.split('').reverse().join('') 
    },
    
    someHandler(){
    console.log(this.age);
    }  
    
  },

  beforeCreate () {
    console.log('beforeCreate')
  }, 
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  }, 
  mounted () {
    console.log('Mounted')
  },

  

}
</script>
