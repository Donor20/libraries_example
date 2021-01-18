<template>
  <q-card class="flatCard no-shadow">
    <q-card-section>
      <div class="row top-words">
        <div class="porch">{{flat.porch}} этаж</div>
        <div class="row q-ml-auto">
          {{flat.rooms}}
          {{roomWord}}
          <span class="dash">-</span>
          {{flat.square}} м<span class="smallNumber">2</span>
        </div>
      </div>
      <div class="flatPlan items-center">
        <div class="flatNumber q-ml-auto">
          № {{flat.number}}
        </div>
        <q-img class="flatPlanImg" :src="flat.plan"></q-img>
      </div>
      <div class="text-right priceField">{{formattedPrice}}р.</div>
      <div class="text-right priceSquareField">
        {{formattedPriceForSquare}} р. за м<span class="smallNumber">2</span>
      </div>
      <q-btn class="activeBtn full-width" unelevated>
        Подробнее
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'flat-card',
  props: ['flat'],
  data () {
    return { }
  },
  computed: {
    roomWord () {
      const getWord = (n, w1, w2, w5) => {
        let tmp = n % 100
        if (tmp >= 5 && tmp <= 20) return w5
        tmp = tmp % 10
        if (tmp === 1) return w1
        if (tmp >= 2 && tmp <= 4) return w2
        return w5
      }
      return getWord(this.flat.rooms, 'комната', 'комнаты', 'комнат')
    },
    formattedPrice () {
      return this.getFormattedNumber(this.flat.price)
    },
    formattedPriceForSquare () {
      return this.getFormattedNumber(this.flat.price)
    }
  },
  methods: {
    getFormattedNumber (number) {
      return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
  }
}
</script>
