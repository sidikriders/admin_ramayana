<template>
  <div class='router-view'>
    <!-- create new Type form  -->
    <div class='create-new'>
      <h3 v-if="isCreate">Create New Attraction</h3>
      <h3 v-else>Edit {{ attraction.name }}</h3>
      <label class="checkbox">
        <input type="checkbox" v-model="attraction.published">
        Published
      </label>
      <div class="input-group">
        <label>
          Name
        </label>
        <input type="text" v-model=attraction.name placeholder="Attraction's name" class="input">
        <label>
          English Name
        </label>
        <input type="text" v-model=attraction.nameEn placeholder="Attraction's english name" class="input">
      </div>
      <div class="input-group">
        <label>
          Attraction's Group
        </label>
        <div class="input-container">
          <select id="attraction-group" v-model="attraction.attractionGroupId">
            <option value="false">Attraction's Group</option>
            <option v-for="(group, index) in groupList" :value="group.id" :key="index">{{ group.name }}</option>
          </select>
        </div>
        <button class="rb-btn c" id="add-new-group" @click="addNew('group')">
          Add new group
        </button>
      </div>
      <div class="input-group">
        <label>
          Images
        </label>
        <div class="images-container">
          <div class="image-unit" v-for="(img, index) in attractionImages" :key="index">
            <font-awesome-icon icon="times" @click="deleteImage(index)"></font-awesome-icon>
            <img
            :src="img.data"
            :alt="'attraction-image-' + index">
          </div>
        </div>
        <input type="file" @change="addImage" accept='image/*'>
      </div>
      <div class="input-group">
        <label>
          Short Description
        </label>
        <div class="input-container">
          <textarea type="text" v-model=attraction.shortDesc placeholder="Attraction's name" class="textarea" rows="3"></textarea>
        </div>
        <label>
          English Short Description
        </label>
        <div class="input-container">
          <textarea type="text" v-model=attraction.shortDescEn placeholder="Attraction's english name" class="textarea" rows="3"></textarea>
        </div>
      </div>
      <div class="input-group">
        <label>
          Description
        </label>
        <div class="input-container">
          <textarea type="text" v-model=attraction.desc placeholder="Attraction's name" class="textarea" rows="10"></textarea>
        </div>
        <label>
          English Description
        </label>
        <div class="input-container">
          <textarea type="text" v-model=attraction.descEn placeholder="Attraction's english name" class="textarea" rows="10"></textarea>
        </div>
      </div>
      <div class="input-group">
        <label>
          Tags
        </label>
        <div class="input-container checkbox">
          <label class="checkbox" v-for="(tag, index) in tagList" :key="index">
            <input type="checkbox">
            {{ tag.name }}
          </label>
        </div>
        <button class="rb-btn c" id="add-new-tag" @click="addNew('tag')">
          Add new tag
        </button>
      </div>
      <!-- <div class="input-group">
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
      </div> -->
      <button v-if="isCreate" @click="addNewAttraction" class="rb-btn p">
        Add New Attraction
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-attraction',
  data: function () {
    return {
      isCreate: true,
      groupList: [],
      tagList: [],
      attraction: {
        published: false,
        name: '',
        nameEn: '',
        desc: '',
        descEn: '',
        shortDesc: '',
        shortDescEn: '',
        attractionGroupId: false
      },
      attractionImages: []
    }
  },
  methods: {
    fetchTags (cb) {
      this.$store.getters._axios.get('/tags').then(resp => {
        if (resp.data.status) {
          this.tagList = resp.data.data
          if (cb) {
            cb()
          }
        } else {
          this.$store.commit('showError', {
            msg: 'Failed Fetch Tags List'
          })
        }
      }).catch(err => {
        console.error(err)
        this.$store.commit('showError', {
          msg: 'Failed Fetch Tags List'
        })
      })
    },
    fetchGroup (cb) {
      this.$store.getters._axios.get('/attraction/group').then(resp => {
        if (resp.data.status) {
          this.groupList = resp.data.data
          if (cb) {
            cb()
          }
        } else {
          this.$store.commit('showError', {
            msg: 'Failed Fetch Group List'
          })
        }
      })
    },
    addImage (event) {
      var file = event.target.files[0]
      var fileUrl = URL.createObjectURL(file)
      this.attractionImages.push({
        data: fileUrl,
        file
      })
      event.target.value = ''
    },
    deleteImage (index) {
      this.attractionImages.splice(index, 1)
    },
    addNew (_type) {
      switch (_type) {
        case 'tag':
          var newTag = prompt('masukkan nama tag baru')
          var newTagEn = prompt('now put new tag english name')
          if (newTag && newTagEn) {
            return this.$store.getters._axios.post('/tags', {
              name: newTag,
              nameEn: newTagEn
            }).then(resp => {
              if (resp.data.status) {
                return this.fetchTags()
              } else {
                return this.$store.commit('showError', {
                  msg: 'Gagal membuat tag baru'
                })
              }
            }).catch(err => {
              console.error(err)
              return this.$store.commit('showError', {
                msg: 'Gagal membuat tag baru'
              })
            })
          } else {
            break
          }
        case 'group':
          var newGroup = prompt('masukkan nama group baru')
          var newGroupEn = prompt('now put new group english name')
          if (newGroup && newGroupEn) {
            return this.$store.getters._axios.post('/attraction/group', {
              name: newGroup,
              nameEn: newGroupEn
            }).then(resp => {
              if (resp.data.status) {
                return this.fetchGroup()
              } else {
                return this.$store.commit('showError', {
                  msg: 'Gagal membuat tag baru'
                })
              }
            }).catch(err => {
              console.error(err)
              return this.$store.commit('showError', {
                msg: 'Gagal membuat tag baru'
              })
            })
          } else {
            break
          }
        default:
          var _default = prompt('eaaa')
          return _default
      }
    },
    addNewAttraction () {
      this.attractionImages.forEach(el => {
        console.log(el.file.name.slice(el.file.name.lastIndexOf('.')))
      })
    }
  },
  beforeMount: function () {
    this.fetchGroup(this.fetchTags)
    var id = this.$route.params.id
    if (id === 'new') {
      this.isCreate = true
      document.title = 'Create New Attraction'
    }
    // this.$store.getters._axios.get('/attraction/')
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
  label {
    margin: 10px 0 5px;
  };
  > input,
  > .input-container {
    max-width: 530px;
    textarea {
      resize: none;
    };
    select,
    select {
      width: 100%;
      font-size: 14px;
      padding: 5px;
      option {
        font-size: 17px;
      }
    };
    label.checkbox {
      margin: 0 20px 15px 0;
    }
  };
  #add-new-group,
  #add-new-tag {
    font-weight: 400;
    font-size: 12px;
    padding: 6px 12px;
    margin-top: 10px;
  };
  .images-container {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0 0;
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
      img {
        width: 300px;
        height: 210px;
        margin-bottom: 15px;
        object-fit: contain;
        background-color: #00000026;
      };
    }
  };
}

svg[data-icon="times"] {
  cursor: pointer;
};
</style>
