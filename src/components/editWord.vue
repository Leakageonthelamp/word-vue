<template>
  <div id="edit-word">
    <div class="row center">
      <div class="col m11">
        <h3 class="header col m7 offset-m3">Edit saved word</h3>
      </div>
      <form @submit.prevent="updateWord" class="col s10 offset-m1 center">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="word_id" required>
            <label class="active">Word ID</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="word_obj" required>
            <label class="active">Word</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea class="materialize-textarea" type="text" v-model="word_des" required></textarea>
            <label class="active">Word meaning</label>
          </div>
        </div>

        <button type="submit" class="btn orange darken-2">Edit</button>
        <button @click="onClose" class="btn grey marginL">Cancel</button>
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
  created (){
    this.fetchData()
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
  // watch: {
  //   '$route': 'fetchData'
  // },
  methods:{
    async fetchData() {
      await db.collection('worddb')
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
            this.onClose()
            // this.$router.push({name: 'view-word',
            // params: {word_id: this.word_id}})
          })
        })
      })
    },
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.marginL{
   margin-left: 0.5rem;
 }
 .header{
   margin-top: 10px;
   justify-content: center;
   font-size: 30px;
   font-weight: 500;
   text-align: center;
   padding: 15px;
   border-radius: 85px;
   background: lightgray;
 }
</style>
