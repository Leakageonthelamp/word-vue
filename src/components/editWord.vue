<template>
  <div id="edit-word">
    <div class="row">
      <div class="col m5 ">
        <h3 class="header">Edit saved word</h3>
      </div>
      <form @submit.prevent="updateWord" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input disabled type="text" v-model="word_id" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input type="text" v-model="word_obj" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input type="text" v-model="word_des" required>
          </div>
        </div>

        <button type="submit" class="btn orange darken-2">Edit</button>
        <router-link to="/" class="btn grey marginL">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from '../plugins/firebaseInit'
export default {
  name: "edit-word",
  data() {
    return {
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
    updateWord(){
      db.collection('worddb')
      .where('word_id','==',this.$route.params.word_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc =>{
          doc.ref.update({
            classroom_id: this.classroom_id,
            word_id: this.word_id,
            word_obj: this.word_obj,
            word_des: this.word_des
          })
          .then(() =>{
            this.$router.push({name: 'view-word',
            params: {word_id: this.word_id}})
          })
        })
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.marginL{
   margin-left: 0.5rem;
 }
 .header{
   font-size: 40px;
   font-weight: 500;
   text-align: center;
   padding: 15px;
   border-radius: 85px;
   background: lightgray;
 }
</style>
