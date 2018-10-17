<template>
  <div id="app">
    <header>
      <div class="optionsBtn">
        <buttonComponent 
          v-bind:textbtn="textBtn1"
          @click.native="showform()">
        </buttonComponent>
        <!-- <buttonComponent 
          v-bind:textbtn="textBtn2"
          @createevent="sendData()">
        </buttonComponent>
         <buttonComponent 
          v-bind:textbtn="textBtn3"
          @createevent="sendData()">
        </buttonComponent> -->
      </div>
    </header>
    <div class="home">
    <div class="title-container">Gestiona tus productos</div>
    <div class="form-view" v-if="showOn">
      <inputForm @click.prevent="sendData" 
        v-model="data"
        v-bind:data="data"
        @updateproduct="updateproduct($event)"
        @updatedata="updatedata($event)">
      </inputForm>
      <buttonComponent 
        v-bind:textbtn="textBtn4"
        @click.native="sendData(data)">
      </buttonComponent>
    </div>
      <itemList v-bind:products="products" v-model="products" v-else></itemList>
    </div>
  </div>
</template>

<script>
import inputForm from './components/inputForm.vue';
import buttonComponent from './components/buttonComponent.vue';
import itemList from './components/itemList.vue'
const db = firebase.database();


export default {
  name: 'App', 
  components: {
    inputForm,
    itemList,
    buttonComponent,
 
  },
  data() {
    return {
      textBtn1:'Añadir',
      textBtn2:'Editar',
      textBtn3:'Eliminar',
      textBtn4:'Guardar',
      showOn:false,
      products: [],
      data: {
          // nameUpdated: '',
          description: '',
          name: '',
          stock:true
      }
    }
  }, created(){
    console.log('Entra en created')
          db.ref('/productos')
            .on('value', snapshot => this.paintProducts(snapshot.val()))
     
      //  db.ref('/productos/Sofá').set({
      //     name:'sofá',
      //     descrpcion: 'verde 6 plazas',
      //     stock: 'En stock'
      //  }).then(() => { console.log('Datos añadidos')})
      
      // sendData(e){
      //   e.preventDefault();
      //   console.log('lalala')
      //   let info = document.getElementById('info').value;
      //   db.ref('productos').push({
      //     name:'armario',
      //     description: info,
      //     stock: 'Fuera de stock'
      //   }).then(() => { console.log(info)})
      // })

  },
  methods: {
    paintProducts(products){
      console.log('Entra en paintProducts')
      // console.log(productos)
      this.products = []
      for(let key in products){
        this.products.push({
          description: products[key].description,
          name:products[key].name,
          key:key
        })
      }
      this.products.reverse()
    },
    updatedata(updateData) {
      console.log('Entra en updatedata')
      console.log(updateData)
        // this.data.nameUpdated = updateData.name
        this.data.name = updateData.name
        this.data.description = updateData.description
        this.data.stock = updateData.stock
        console.log(updateData.name, updateData.description)
      }, 
    //Meter datos en firebase
    sendData(data){
      console.log('entra en sendData')
      this.showOn = false
      db.ref('/productos')
        .push({
          description: this.data.description,
          name: this.data.name
        }).then((data) => {console.log(data.key)})
        // this.data.description = null;this.data.name = null; 
    },
    showform(){
      console.log('entra en show form')
      this.showOn = true

    },
    updateproduct(key){
      console.log('entra en updateprodutc')
      db.ref('/productos/' + key).update({
          description: this.data.description,
          name: this.data.name})
          this.showOn = true

      return {newData:{description: this.data.description,
          name: this.data.name}}
    } 
  },
}
</script>

<style>
#app {
  /* height: 100vh; height: 100vh; */
}
header{
  width: 100%;
  height: 70px;
  position: fixed;
  background: red;
  margin:0;
  top:-8px;
  left: 0;
}
.home { 
  margin-top: 70px;
  height: 100vh;
  display: flex;
  flex-direction: column;;
  /* justify-content: space-evenly; */

}
.title-container{
  height: 100px;
  width: 100%;
  font-size: 40px;
  text-align: center;
  font-weight: 900;
   align-content: center;
}
.optionsBtn{
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
}
.showOff{
    display:none
}
.showOn{
    display:flex
}
@media screen and (max-width: 850px) {
  .home {
    flex-direction: column;
  }
}

</style>
