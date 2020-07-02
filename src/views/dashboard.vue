<template>
  <div id="dashboard">
    <h3>Dashboard</h3>
    <ul class="collection with-header">
      <div class="row">
        <p class="col m1"></p>
        <div class="header col m2 orange darken-2">Word</div>
      </div>
      <li v-for="word in words" :key="word.id" class="collection-item">
        <div class="chip">{{ word.word_id }}</div>
        <div class="word-text">{{ word.word_obj }}</div>

        <router-link
          class="secondary-content"
          :to="{ name: 'view-word', params: { word_id: word.word_id } }"
        >
          <i class="small material-icons">pageview</i>
        </router-link>

        <div class="word-des">{{ word.word_des }}</div>
      </li>
    </ul>

    <div class="action-btn center action-button">
      <button
        @click="showModal = true"
        class="btn-floating btn-large waves-effect orange darken-2"
      >
        <i class="fa fa-plus"></i>
      </button>
    </div>

    <Modal v-if="showModal">
      <template slot="header">
        <div>
          <Navbar />
        </div>
      </template>

      <template slot="body">
        <div>
          <Newword @close="closeModal" />
        </div>
      </template>
    </Modal>
  </div>
</template>

<!-- <router-link
        to="/new"
        class="btn-floating btn-large waves-effect orange darken-2"
      >
        <i class="fa fa-plus"></i>
      </router-link> -->

<script>
import Newword from "../components/newWord";
import Modal from "../components//์newWordmodal";
import Navbar from "../components/Navbar";
import db from "../plugins/firebaseInit";
export default {
  name: "dashboard",
  components: {
    Newword,
    Modal,
    Navbar,
  },
  data() {
    return {
      showModal: false,
      words: [],
    };
  },
  created() {
    this.getAllword();
  },
  methods: {
    async getAllword() {
      // db.collection("worddb")
      //   .orderBy("word_id")
      //   .get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       const data = {
      //         id: doc.id,
      //         classroom_id: doc.data().classroom_id,
      //         word_id: doc.data().word_id,
      //         word_obj: doc.data().word_obj,
      //         word_des: doc.data().word_des,
      //       };
      //       this.words.push(data);
      //     });
      //   });
      const allWord = await db
        .collection("worddb")
        .orderBy("word_id")
        .get();
      this.words = allWord.docs.map(doc => {
        return doc.data();
      });
      console.log(allWord.docs);
    },
    closeModal() {
      this.showModal = false;
      this.getAllword();
    },
  },
};
</script>

<style lang="scss" scoped>
.word-text {
  padding: 0 12px;
  margin: auto;
  vertical-align: -5px;
  display: inline-block;
  font-weight: 500;
  font-size: 30px;
}

.word-des {
  padding-left: 65px;
  font-size: 20px;
}

.header {
  letter-spacing: 2px;
  color: white;
  text-align: center;
  font-weight: 500;
  font-size: 40px;
}

.action-button {
  zoom: 1.3;
}
</style>
