<template>
  <div class='router-view'>
    <!-- create new Type form  -->
    <div class='create-new'>
      <h3>Create New Show Type</h3>
      <div class="input-group">
        <label>
          New Type Name
        </label>
        <input type="text" v-model=newTypeName placeholder="New show type name" class="input">
      </div>
      <div class="input-group">
        <label>
          Seating Map Image
        </label>
        <img :src="seatMapImg" v-show="seatMapImg">
        <a @click="changeSeatMapImg('seat-map-img')" v-show= "seatMapImg !== ''">[ change ]</a>
        <input type="file" name="new type seat map" ref="seatMap" id='seat-map-img' placeholder="Seat map" @change="showSeatMapImg" accept='image/*' v-show= "seatMapImg === ''">
      </div>
      <div class="input-group">
        <label>
          Price Group
        </label>
        <div class="price-type" v-for="(price, index) in seatGroup" :key="index">
          <div class="input-seat-detail">
            <span>Name</span>
            <input class="input" type="text" v-model="price.name" :id="'type-name-' + index" placeholder="price name...">
          </div>
          <div class="input-seat-detail">
            <span>Jumlah Seat</span>
            <input class="input" type="number" v-model="price.seatCount" :id="'type-count-' + index">
          </div>
          <div class="input-seat-detail">
            <span>Price</span>
            <input class="input" type="number" v-model="price.price" :id="'type-price-' + index">
          </div>
          <font-awesome-icon icon='times' @click="deletePriceType(index)"></font-awesome-icon>
        </div>
        <a @click="addPriceType" style="width: fit-content;">[ add price group ]</a>
      </div>
      <div class="input-group">
        <label>
          Show Type Images
        </label>
        <div class="new-type-img-container">
          <div class="image-unit" v-for="(image, index) in newTypeImages" :key="index" v-show="!!image">
            <font-awesome-icon icon="times" @click="deleteImage(index)"></font-awesome-icon>
            <img :src= "image">
          </div>
        </div>
        <input type="file" name="new type image"
        ref="showTypeImages"
        class='show-img-input'
        placeholder="Show Type Image"
        @change="updateShowImg"
        accept='image/*'
        >
      </div>
      <button @click="addNewType" class="rb-btn p">
        Add New Type
      </button>
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
  name: 'show-type-new',
  data: function () {
    return {
      newTypeName: '',
      seatMapImg: '',
      seatGroup: [],
      newTypeImages: [],
      imagesValue: []
    }
  },
  computed: {
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
    addPriceType () {
      this.seatGroup.push({
        name: '',
        seatCount: 0,
        price: 0
      })
    },
    deletePriceType (index) {
      this.seatGroup.splice(index, 1)
    },
    updateShowImg (e) {
      if (this.imagesValue.length === 5) {
        this.$store.commit('showError', {
          title: 'Max Photo Reached',
          msg: 'Maximum photo is 5'
        })
      } else {
        var file = e.target.files[0]
        this.imagesValue.push(file)
        this.newTypeImages.push(URL.createObjectURL(file))
      }
      e.target.value = ''
    },
    deleteImage (index) {
      this.newTypeImages.splice(index, 1)
      this.imagesValue.splice(index, 1)
    },
    addNewType () {
      var _this = this
      var validationResult = this.validationNewType()
      if (validationResult.status) {
        // upload image seat map and upload images of show
        var seatMapForm = new FormData()
        var seatMapFile = document.getElementById('seat-map-img').files[0]
        seatMapForm.append('seat-map', seatMapFile, seatMapFile.name)

        var imagesForm = new FormData()
        _this.imagesValue.forEach(element => {
          imagesForm.append('show-type-images', element, element.name)
        })

        Promise.all([
          _this.$store.getters._axiosFormData.post('/show/upload-seat-map', seatMapForm),
          _this.$store.getters._axiosFormData.post('/show/upload-show-type-images', imagesForm)
        ]).then(([seatMap, newImages]) => {
          if (!seatMap.data.status) {
            _this.$store.commit('showError', {
              title: 'Error',
              msg: 'Error uploading seat map image'
            })
            console.error(seatMap.data.data)
          } else if (!newImages.data.status) {
            _this.$store.commit('showError', {
              title: 'Error',
              msg: 'Error uploading seat map image'
            })
            console.error(newImages.data.data)
          } else {
            // create new show deh
            var seatMapUrl = seatMap.data.data
            var showImages = newImages.data.data
            var seatList = []
            _this.seatGroup.forEach(group => {
              for (let i = 0; i < group.seatCount; i++) {
                seatList.push({
                  row: group.name,
                  collumn: (i + 1)
                })
              }
            })
            var payload = {
              showTypeName: _this.newTypeName,
              seatMapUrl,
              showImages,
              priceList: _this.seatGroup.map(el => {
                return {
                  name: 'Zone ' + el.name,
                  price: el.price
                }
              }),
              seatList
            }
            _this.$store.getters._axios.post('/show/show-type', payload).then(resp => {
              console.log(resp.data)
              if (resp.data.status) {
                _this.$router.push('/show-type')
              } else {
                _this.$store.commit('showError', {
                  title: 'Error',
                  msg: 'Error dalam proses pembuatan tipe pertunjukan baru'
                })
                console.error(resp.data.data)
              }
            }).catch(err => {
              _this.$store.commit('showError', {
                title: 'Error',
                msg: 'Error dalam proses pembuatan tipe pertunjukan baru'
              })
              console.error(err)
            })
          }
        }).catch(err => {
          _this.$store.commit('showError', {
            title: 'Error',
            msg: 'Error when uploading image'
          })
          console.error(err)
        })
      } else {
        _this.$store.commit('showError', {
          title: 'Error',
          msg: validationResult.data
        })
      }
    },
    validationNewType () {
      var status = false
      if (this.newTypeName === '') {
        return {
          status,
          msg: 'Name Can\'t be blank'
        }
      } else if (document.getElementById('seat-map-img').files.length === 0) {
        return {
          status,
          msg: 'Seat map can\'t be blank'
        }
      } else if (this.seatGroup.length === 0) {
        return {
          status,
          msg: 'Price group can\'t be blank'
        }
      } else if (this.seatGroup.filter(el => !el.name).length > 0) {
        return {
          status,
          msg: 'Every price group\'s name can\'t be blank'
        }
      } else if (this.seatGroup.filter(el => !el.seatCount).length > 0) {
        return {
          status,
          msg: 'Every price group\'s seat can\'t be 0'
        }
      } else if (this.seatGroup.filter(el => !el.price).length > 0) {
        return {
          status,
          msg: 'Every price group\'s price can\'t be 0'
        }
      } else if (this.imagesValue.length === 0) {
        return {
          status,
          msg: 'Show at least need 1 picture'
        }
      } else {
        return {
          status: true
        }
      }
    }
  },
  beforeMount: function () {
    document.title = 'New Show Type'
  }
}
</script>

<style lang="scss" scoped>
  .create-new {
    width: 100%;
    h3 {
      width: 100%;
      padding: 15px 0;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    > input {
      max-width: 530px;
    };
    img {
      width: 300px;
      height: 210px;
      margin-bottom: 15px;
      object-fit: contain;
      background-color: #00000026;
    };
    label {
      margin: 10px 0 5px;
    };
    .price-type {
      display: flex;
      border-left: solid 4px grey;
      margin-bottom: 15px;
      .input-seat-detail {
        display: flex;
        flex-direction: column;
        width: 150px;
        margin: 10px 0 10px 20px;
      }
    }
  }

  .new-type-img-container {
    display: flex;
    flex-wrap: wrap;
    .image-unit {
      position: relative;
      svg[data-icon="times"] {
        position: absolute;
        top: 10px;
        left: 10px;
        color: #8f8f8f;
        font-size: 23px;
      };
      margin: 10px 20px 0 0;
    }
  }

  svg[data-icon="times"] {
    cursor: pointer;
  };
</style>
