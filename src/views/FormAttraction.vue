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
export default {
  name: 'form-attraction',
  data: function () {
    return {
      list: []
    }
  },
  computed: {
  },
  methods: {
    deleteAttraction (at,tr) {
      var isSure = confirm('Yakin mau hapus ' + attr.name + ' ya?')
      if (isSure) {
        alert('terhapus')
      } else {
        alert('cie galau')
      }
    },
    createNew () {
      this.$router.push(this.$router.currentRoute.path + '/new')
    }
  },
  beforeMount: function () {
    document.title = 'Show Type'
    this.$store.getters._axios.get('/attraction').then(resp => {
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
