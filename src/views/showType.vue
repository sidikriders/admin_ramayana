<template>
  <div class='router-view'>
    <h1>Show Types</h1>
    <table class='table'>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for= "(li, index) in list" :key= index>
          <td>{{ index + 1 }}</td>
          <td>
            <router-link :to=String(li.id) append>
              <a>
                {{ li.name }}
              </a>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="rb-btn d" @click='createNew'>
      Add Show Types
    </button>
  </div>
</template>

<script>
// var contoh = {
//   "showTypeName": "Indoor 2",
//   "seatMapUrl": "http://www.greaterbostonstage.org/uploads/5/0/1/2/50120013/season18-mainstage-seating-map_2.jpg",
//   "showImages": [
//       "http://image.made-in-china.com/2f0j00tSBTZivzAJcP/Cost-Effective-Indoor-LED-Display-Flexible-LED-Video-Wall-for-Event-Stage-Show-P3-91-P4-81-P5-68-P6-25-.jpg",
//       "http://www.largeledscreens.com/photo/pl14785471-small_pixel_pitch_full_color_indoor_led_video_wall_p3_p4_for_club_live_show_rohs_ul.jpg",
//       "http://www.showcomplex.net.img.800cdn.com/Uploads/553f5b31427da.jpg"
//     ],
//   "priceList": [
//       {
//         "name": "Zone A",
//         "price": 30000
//       }, {
//         "name": "Zone B",
//         "price": 45000
//       }, {
//         "name": "Zone C",
//         "price": 60000
//       }
//     ],
//   "seatList": [
//       {
//         "row": "A",
//         "column": 1
//       }, {
//         "row": "A",
//         "column": 2
//       }, {
//         "row": "A",
//         "column": 3
//       }, {
//         "row": "B",
//         "column": 1
//       }, {
//         "row": "B",
//         "column": 2
//       }, {
//         "row": "B",
//         "column": 3
//       }, {
//         "row": "C",
//         "column": 1
//       }, {
//         "row": "C",
//         "column": 2
//       }, {
//         "row": "C",
//         "column": 3
//       }
//     ]
// }
export default {
  name: 'show-type',
  data: function () {
    return {
      list: []
    }
  },
  computed: {
  },
  methods: {
    createNew () {
      this.$router.push('/show-type/new')
    }
  },
  beforeMount: function () {
    document.title = 'Show Type'
    this.$store.getters._axios.get('/show/show-type').then(resp => {
      if (resp.data.status) {
        this.list = resp.data.data
      } else {
        console.error(resp.data.data)
        this.$store.dispatch('doLogout')
      }
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>
