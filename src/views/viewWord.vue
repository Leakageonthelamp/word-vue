<template>
  <div id="view-word">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4 class="chip">{{word_obj}}</h4>
      </li>
      <li class="collection-item">Word meaning : {{word_des}}</li>
    </ul>

    <div class="action-btn center action-button">
      <button
        @click="showModal = true"
        class="btn-floating btn-large waves-effect orange darken-2"
      >
        <i class="fa fa-pencil"></i>
      </button>
    </div>

    <!-- <router-link
        v-bind:to="{name: 'edit-word', params: {word_id: word_id}}"
        class="btn-floating btn-large waves-effect orange darken-2">
        <i class="fa fa-pencil"></i>
      </router-link> -->

    <Modal v-if="showModal">
      <template slot="header">
        <div>
          <Navbar />
        </div>
      </template>

      <template slot="body">
        <div>
          
        </div>
      </template>
    </Modal>

    <router-link to="/" class="btn grey marginT">Back</router-link>
    <button @click="deleteWord" class="btn red marginL marginT">Delete</button>

  </div>
</template>

<script>
import Modal from '../components/editWordmodal'
import Navbar from '../components/Navbar'
//import Editword from '../components/editWord'
import db from '../plugins/firebaseInit'
export default {
  name: "view-word",
  components: {
    Modal,
    Navbar,
    //Editword
  },
  data() {
    return {
      showModal: false,
      classroom_id: null,
      word_id: null,
      word_obj: null,
      word_des: null
    };
  },
  beforeRouteEnter (to, from, next) {
    db.collection('worddb')
    .where('word_id','==', to.params.word_id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
          vm.classroom_id = doc.data().classroom_id
          vm.word_id = doc.data().word_id
          vm.word_obj = doc.data().word_obj
          vm.word_des = doc.data().word_des
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods:{
    fetchData() {
      db.collection('worddb')
      .where('word_id','==',this.$route.params.word_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc =>{
          this.classroom_id = doc.data().classroom_id
          this.word_id = doc.data().word_id
          this.word_obj = doc.data().word_obj
          this.word_des = doc.data().word_des
        })
      })
    },
    deleteWord(){
      if(confirm('Are you sure want to delete this word?')){
        db.collection('worddb')
        .where('word_id','==',this.$route.params.word_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc =>{
            doc.ref.delete();
            this.fetchData()
            this.$router.push('/')
          })
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .chip{
    font-size: 28px;
  }
  .marginL{
    margin-left: 0.5rem;
  }
  .marginT{
    margin-top: 1rem;
  }
  .action-button{
    zoom: 1.3;
  }
</style>
