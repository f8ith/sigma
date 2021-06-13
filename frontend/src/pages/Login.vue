<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 pt-3 pb-2 mb-3">
            <h1 class="text-xs-center">
              Sign in
            </h1>
            <p class="text-xs-center">
              <AppLink name="register">
                Need an account?
              </AppLink>
            </p>

            <ul class="error-messages">
              <li
                v-for="(error, field) in errors"
                :key="field"
              >
                {{ field }} {{ error ? error[0] : '' }}
              </li>
            </ul>

            <form
              ref="formRef"
              class="row g-3"
              @submit.prevent="login"
            >
              <div
                class="col-12"
                aria-required="true"
              >
                <label for="inputEmail">Email address</label>
                <input
                  id="inputEmail"
                  v-model="form.email"
                  class="form-control"
                  type="email"
                  required
                  placeholder="Email"
                >
                <small
                  id="emailHelp"
                  class="form-text text-muted"
                >We'll never share your email with anyone else.</small>
              </div>
              <div class="col-12">
                <label for="inputPassword">Password</label>
                <input
                  id="inputPassword"
                  v-model="form.password"
                  class="form-control"
                  type="password"
                  required
                  placeholder="Password"
                >
              </div>
              <button
                class="btn btn-primary"
                :disabled="!form.email || !form.password"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { routerPush } from 'src/router'
import { postLogin, PostLoginErrors, PostLoginForm } from 'src/services/auth/postLogin'
import { updateUser } from 'src/store/user'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const formRef = ref<HTMLFormElement | null>(null)
    const form = reactive<PostLoginForm>({
      email: '',
      password: '',
    })

    const errors = ref<PostLoginErrors>({})

    const login = async () => {
      if (!formRef.value?.checkValidity()) return

      const result = await postLogin(form)
      if (result.isOk()) {
        updateUser(result.value)
        await routerPush('global-feed')
      } else {
        errors.value = await result.value.getErrors()
      }
    }

    return {
      formRef,
      form,
      login,
      errors,
    }
  },
})
</script>
