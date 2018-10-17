<template>
  <div class="app">
    <form class="form-amount">
      <div class="form-amount_instructions">
        {{ text }}
      </div>
       <div v-if="deshabilitado" class='form-amount_amount2'>  
        <span class="amounFromParent">{{formatAmountFromParent}} €</span>
      </div>
      <div v-else class='form-amount_amount' @change.prevent="sendAmount">  
        <money class="money" 
          v-model="money" 
          v-bind="currencyDetails">
        </money>  
      </div>
      <div class="form-amount-info">
        <input type="text" class="form-amount-infoInput" placeholder='Escribe el concepto'
         @change.prevent="sendInfo"
         v-bind:disabled="deshabilitado"
         required />
      </div>
      <!-- <pre>{{ $data }}</pre> -->
    </form>
  </div>
</template>

<script>
import { Money } from 'v-money'

export default {
  props: ['amountNumber', 'deshabilitado', 'infoupdated'],
  name: 'amountConcept',
  components: {
    Money
    },
  data () {
    return {
      text: 'Introduce tu importe:',
      info: '',
      money: 0.00,
      currencyDetails: {
        decimal: ',',
        thousands: '.',
        suffix: ' €',
        precision: 2,
        masked: false,
        maxlength:12,
      }
    }
  }, 
  mounted: function (){
      if(this.infoupdated){
        return this.info = this.infoupdated
      }
    },
  methods: {
    sendAmount(){
      this.$emit('updateAmount', this.money)
    },
    sendInfo(){
      this.$emit('updateInfo', this.info)
    },
  },
  computed: {
    formatAmountFromParent() {
      let val = (this.amountNumber/1).toFixed(2).replace('.', ',')
      let amountNumberFormatted = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      return amountNumberFormatted
    }
  }
}
</script>

<style scoped>

* {
	box-sizing: border-box;
}
*:focus {
  outline: none;
  cursor: pointer;
}
.form-amount{
  font-family: 'HelveticaNeue-Medium', Arial, sans-serif;
  text-align: center;
  margin: 20px 20px;
}
.form-amount_instructions {
  font-size: 14px;
}
input,
.money {
  margin: 0;
  padding:0;
  text-align: center;
  background: transparent;
  border: none;
}
.form-amount_amount2,
.form-amount_amount{
  display: flex;
  display: -webkit-flex;
  font-size: 50px;
  font-weight:400
}
.amounFromParent,
.money {
  font-size: 50px;
  color: #FF5100;
  font-weight: 400;
  text-align: center;
  margin: 22px auto;
  min-width: 100px;
}
.form-amount-info{
  text-align: center;
  display: flex;
  display: -webkit-flex;
  height: 100%;
}
.form-amount-infoInput{
  text-align: center;
  font-size: 16px;
  color: #555555;
  min-width: 100px;
  margin: 0 auto;
}
/* input[type="tel"].v-money::-webkit-input-placeholder{
  color:green;
} */
</style>
