<template>
  <div id="mainpage">
    <div class="logo-center">
        <i class="large material-icons icon-color">cloud_upload</i>
    </div>
    <div class="row">
          <div class="input-field col s6 offset-s3 box-color">
            <input type="text" required />
            <label>Classroom ID</label>
            </div>
        </div>

    <div class="action-btn center">
        <router-link
            to="/dashboard"
            class="btn-floating btn-large waves-effect orange darken-2 center"
        >
            <i class="medium material-icons">chevron_right</i>
        </router-link>
    </div>

    </div>
</template>

<script>
export default {
  name: "mainpage",
  components: {
  },
  data() {
    return {
      
    }
  }
};
</script>

<style lang="scss" scoped>
  .icon-color{
      color: #f57c00;
      zoom: 2;
  }
  
  .logo-center{
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px;
      height: 200px;
  }

  .input-field input[type=text]:focus {
     border-bottom: 3px solid #f57c00;
     box-shadow: 0 1px 0 0 #f57c00;
   }

   .input-field label {
     font-size: 18px;
     font-weight: 500;
     color: #f57c00;
   }

   .input-field input[type=text]:focus + label {
     color: #f57c00;
   }
</style>
