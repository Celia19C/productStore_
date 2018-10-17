<template>
    <div class="item-list-container" id="item-list-container">
        <div class="item-list">
            <ul class="item-list_list"><li class="item-list_list_item" @click="showBtns(index)" v-for="(producto, index) in this.products"> 
            <span >{{producto.name}}</span>    
            <div class="item-list_info">{{producto.description}}</div>
            <div class="btns btnOff" v-bind:id="'item' + index" >
            <button @click.prevent="editOtherChanges()">Editar</button><button @click.prevent="deleteProduct(producto.key)">Eliminar</button></div></li></ul>
        </div>
    </div>
</template>



<script>
const db = firebase.database();
export default {
    props: ['products'],
    data: function() {
        return{
            invisible:true
        }
    },
    methods:{
        updateproduct(producto, key){
            console.log(producto.name, key)
            console.log('lili')
            db.ref('/productos/' + key).update({
                description: this.description,
                name:this.name
            })
        },
        showBtns(index){
            console.log(document.getElementById("item"+index))
            const element = document.getElementById("item"+index)
            element.classList.remove('btnOff')
            element.classList.add('btnOn')
        }, 
        editOtherChanges(){
            // document.getElementById("item-list-container").classList.add('btnOff')
            this.$emit('updateproduct')
        },
        deleteProduct(key){
             console.log(db.ref('/productos/' + key))
             db.ref('/productos/' + key).remove()

        }
    }
}
</script>



<style>

.item-list-container{
    text-align: left;
    display: flex;
    flex-direction: column;
    margin: 30px 0;
}
.item-list{
    width: 100%;
    /* border: 1px solid black; */
    margin:  0 auto;    
}
.item-list_list{

}
.item-list_list_item{
        font-size: 14;
    font-weight: bold;
     margin-top:20px;
}
.item-list_info{
   font-size: 12;
   font-weight: 200;
}
.btnOff{
    display:none
}
.btnOn{
    display:flex
}
</style>
