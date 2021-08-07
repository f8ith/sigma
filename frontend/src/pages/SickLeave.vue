<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 pt-3 pb-2 mb-3">
            <h1 class="text-xs-center">Sick Leave Form</h1>
            <form ref="formRef" class="row g-3" @submit.prevent="submit">
              <UploadImages
                upload-msg="Upload doctor's certifcate or your parent's letter"
                :max="1"
                @changed="handleFiles"
              />
              <button class="btn btn-danger" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { routerPush } from "src/router";
import { updateUser } from "src/store/user";
import { defineComponent, reactive, ref } from "vue";
import {
  SickLeaveForm,
  SickLeaveErrors,
  postSickLeave
} from "src/services/attendance/postSickLeave";
import UploadImages from "vue-upload-drop-images";

export default defineComponent({
  name: "SickLeave",
  components: { UploadImages },
  setup() {
    const formRef = ref<HTMLFormElement | null>(null);
    const form = reactive<SickLeaveForm>({
      proof: null
    });

    const errors = ref<SickLeaveErrors>({});

    const submit = async () => {
      await routerPush("global-feed");
    };

    return {
      formRef,
      submit,
      filePreview: null,
      handleFiles(files) {
        console.log(files);
      }
    };
  }
});
</script>

<style scoped lang="css">
.container {
  max-width: 600px;
}
.previewBlock {
  display: block;
  cursor: pointer;
  width: 300px;
  height: 280px;
  margin: 0 auto 20px;
  background-position: center center;
  background-size: cover;
}
</style>
