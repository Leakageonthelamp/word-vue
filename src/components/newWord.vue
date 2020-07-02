<template>
  <div id="new-word">
    <div class="row center">
      <div class="col m12">
        <h3 class="header col m6 offset-m3">New word</h3>
      </div>
      <form @submit.prevent="saveWord" class="col s8 offset-s2 center">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="word_id" required />
            <label>Word ID</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="word_obj" required />
            <label>Word</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="word_des" required />
            <label>Word meaning</label>
          </div>
        </div>

        <button type="submit" class="btn orange darken-2">Add</button>
        <button @click="onClose" class="btn grey marginL">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../plugins/firebaseInit";
export default {
  name: "new-word",
  data() {
    return {
      classroom_id: null,
      word_id: null,
      word_obj: null,
      word_des: null,
    };
  },
  methods: {
    async saveWord() {
      await db.collection("worddb").add({
        classroom_id: this.classroom_id,
        word_id: this.word_id,
        word_obj: this.word_obj,
        word_des: this.word_des,
      });
      this.onClose();
    },
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.marginL {
  margin-left: 0.5rem;
}
.header {
  margin-top: -5px;
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  padding: 15px;
  border-radius: 85px;
  background: lightgray;
}
</style>
