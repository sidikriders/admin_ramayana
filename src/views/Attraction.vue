<template>
  <div class='router-view'>
    <h1>Attraction List</h1>
    <table class='table'>
      <thead>
        <tr>
          <th>No.</th>
          <th>Status</th>
          <th>Name</th>
          <th>Short Description</th>
          <th>Group</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for= "(li, index) in list" :key= index>
          <td>{{ index + 1 }}</td>
          <td>
            <p v-if="li.published" class='published'>Published</p>
            <p v-else class="un published">Unpublished</p>
          </td>
          <td>
            <router-link :to=String(li.id) append>
              <p>
                <a>
                  {{ li.name }}
                </a>
              </p>
            </router-link>
            <p>
              <i>{{ li.nameEn }}</i>
            </p>
          </td>
          <td class="short-desc-row">
            <p>{{ li.shortDesc }}</p>
            <p>
              <i>{{ li.shortDescEn }}</i>
            </p>
          </td>
          <td>
            <p>
              <router-link :to="'group/' + li.attractionGroup.id" append>
                <a>
                  {{ li.attractionGroup.name }}
                </a>
              </router-link>
            </p>
            <p>
              <i>{{li.attractionGroup.nameEn}}</i>
            </p>
          </td>
          <td>
            <p>
              <span v-for="(tag, index) in li.tags" :key="index">
                <router-link :to="'tags/' + tag.id" append>
                  {{tag.name + ((index === li.tags.length - 1) ? '' : ', ')}}
                </router-link>
              </span>
            </p>
            <p>
              <span v-for="(tag, index) in li.tags" :key="index">
                {{tag.nameEn + ((index === li.tags.length - 1) ? '' : ', ')}}
              </span>
            </p>
          </td>
          <td>
            <div class="action-container">
              <router-link :to="String(li.id)" append>
                <div class="rb-btn c">
                  Edit
                </div>
              </router-link>
              <div class="rb-btn w" @click="deleteAttraction(li)">
                Delete
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="rb-btn d" @click='createNew'>
      Add Attraction
    </button>
  </div>
</template>

<script>
export default {
  name: 'attraction',
  data: function () {
    return {
      list: []
    }
  },
  computed: {
  },
  methods: {
    deleteAttraction (attr) {
      var isSure = confirm('Yakin mau hapus ' + attr.name + ' ya?')
      if (isSure) {
        this.$store.commit('changeIsLoading')
        this.$store.getters._axios.delete('/attraction/' + attr.id).then(resp => {
          if (resp.data && resp.data.status) {
            alert('terhapus')
            this.fetchAttractionList()
          } else {
            console.error(resp)
            this.$store.commit('showError', {
              msg: 'Gagal hapus atraksi'
            })
          }
        }).catch(err => {
          console.error(err)
          this.$store.commit('changeIsLoading')
          this.$store.commit('showError', {
            msg: 'Gagal hapus atraksi'
          })
        })
      } else {
        alert('cie galau')
      }
    },
    createNew () {
      this.$router.push(this.$router.currentRoute.path + '/new')
    },
    fetchAttractionList () {
      this.$store.getters._axios.get('/attraction').then(resp => {
        this.$store.commit('changeIsLoading')
        if (resp.data.status) {
          this.list = resp.data.data
        } else {
          console.error(resp.data.data)
          this.$store.dispatch('doLogout')
        }
      }).catch(err => {
        this.$store.commit('changeIsLoading')
        console.error(err)
      })
    }
  },
  beforeMount: function () {
    document.title = 'Attraction List'
    this.$store.commit('changeIsLoading')
    this.fetchAttractionList()
  }
}
</script>

<style lang="scss" scoped>
p.published {
  color: white;
  background-color: #13a355;
  padding: 5px;
  font-size: 10px;
  font-weight: 600;
}

p.un.published {
  background-color: #c05d5d;
}

.action-container {
  display: flex;
  height: 3em;
  width: calc(fit-content + 15px);
  align-items: center;
  .rb-btn {
    margin-right: 10px;
    font-size: 12px;
    padding: 5px 10px;
  }
}

td.short-desc-row {
  max-width: 530px;
}
</style>
