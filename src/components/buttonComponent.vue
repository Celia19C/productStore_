<template>
      <div class="btn-container">
        <button type="submit">{{ this.textbtn }}</button>
      </div>
</template>

<script>
export default {
  name: 'buttonComponent',
  props: ['textbtn'],
  data: function () {
    return {

    }
  }, 
  // methods: {
  //   sendData: function(){
  //     this.$emit('createevent')
  //   }
  // }
}
</script>

<style scoped>

* {
	box-sizing: border-box;
}
.btn-container{
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100px
}
button{
  text-align: center;
  font-size: 17px;
  background-color:#fAFFa1;
  min-width: 180px;
  height: 50px;
  margin: 15px auto;
  border: none;
  color: #747887;
  border-radius: 6px;
}
</style>