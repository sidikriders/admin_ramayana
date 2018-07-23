<template>
  <div class='router-view'>
    <h1>Show Types</h1>
    <table class='table' v-if=!creatingNew>
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
    <button class="rb-btn d" @click='createNew' v-if=!creatingNew>
      Add Show Types
    </button>
    <div v-if="creatingNew" class='create-new'>
      <h3>Create New Show Type</h3>
      <form>
        <div class="input-group">
          <label>
            New Type Name
          </label>
          <input type="text" v-model=newType.name placeholder="New show type name">
        </div>
        <div class="input-group">
          <label>
            Seating Map Image
          </label>
          <img :src="seatMapImg">
          <a @click="changeSeatMapImg('seat-map-img')" v-show= "seatMapImg !== ''">[ change ]</a>
          <input type="file" name="new type seat map" ref="seatMap" id='seat-map-img' placeholder="Seat map" @change="showSeatMapImg" accept='image/*' v-show= "seatMapImg === ''">
        </div>
        <div class="input-group">
          <label>
            Show Type Images
          </label>
          <img :src= "img" v-for= "(img, index) in newType.photos" :key= "index">
          <a @click="addShowPhoto">+ add image</a>
        </div>
        <div class='input-group' v-for= "(img, index) in newType.photos" :key= "index">
          <input type="file" name="new type seat map" :id="'show-img-' + index" ref="seatMap" class='show-img' placeholder="Seat map" @change="updateShowImg" accept='image/*' v-show= "newType.photos[index] === ''">
        </div>
      </form>
    </div>
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
      list: [],
      creatingNew: false,
      newType: {
        name: '',
        photos: []
      },
      seatMapImg: ''
    }
  },
  methods: {
    createNew () {
      this.creatingNew = true
    },
    showSeatMapImg (e) {
      var file = e.target.files[0]
      this.seatMapImg = URL.createObjectURL(file)
    },
    changeSeatMapImg (str) {
      this.seatMapImg = ''
      document.getElementById(str).value = ''
    },
    addShowPhoto () {
      this.newType.photos.push('')
    },
    updateShowImg (e) {
      var file = e.target.files[0]
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

<style lang="scss" scoped>
  .create-new {
    width: 100%;
    max-width: 520px;
    h3 {
      width: 100%;
      padding: 15px;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    img {
    width: 300px;
    margin-bottom: 15px;
    }
  }
</style>
