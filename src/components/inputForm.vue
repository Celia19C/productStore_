<template>
      <form class="input-container" id="input-container" v-bind:class="sendInfo">
        <input type="text" placeholder="Nombre del producto"
        class="input-name" maxlength="20"
        v-model="dataAdd.name" required />
        <textarea id='info' class="info" placeholder="Descripción del producto" cols="30" rows="10"  maxlength="120" 
        v-model="dataAdd.description" required></textarea>
        <select class="stock">
            <option>En stock</option>
            <option>Fuera de stock</option>
        </select>
      </form>
</template>

<script>
module.exports = {
  props: ['data', 'newData'],
  data() {
    return {
      dataAdd:{
        name: '',
        description: '',
        stock:true,
      }
    }
  }, 
  mounted: function (){
      if(this.newData){
        return this.dataAdd = this.newData
      }
    },
    
  computed: {
    sendInfo: function(){
      this.$emit('updatedata', this.dataAdd)
    }
  }
}
</script>

<style scoped>

* {
	box-sizing: border-box;
  border-radius: 6px;
}
/* *:focus {
  outline: none;
  cursor: pointer;
} */

.input-container{
  text-align: center;
  display: flex;
  flex-direction: column;
}

.info{
  resize: none;
  width: 320px;
  height: 100px;
  margin: 0 auto;
  font-size: 16px;
  text-indent: 10px;
  border: none;
  background-color:#EAFAF1
}

input, .stock {
  font-size: 17px;
  background-color:#EAFAF1;
  min-width: 100px;
  width: 320px;
  height: 50px;
  margin: 15px auto;
  border: none;
  text-indent: 10px;
  color: #747887;
}
</style>