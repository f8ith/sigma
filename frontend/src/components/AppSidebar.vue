<style>
  /*
   * Sidebar
   */

  .sidebar {
    position: fixed;
    top: 0;
    /* rtl:raw:
    right: 0;
    */
    bottom: 0;
    /* rtl:remove */
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }

  @media (max-width: 767.98px) {
    .sidebar {
      top: 5rem;
    }
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  .sidebar .nav-link {
    font-weight: 500;
    color: #333;
  }

  .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #727272;
  }

  .sidebar .nav-link.active {
    color: #007bff;
  }

  .sidebar .nav-link:hover .feather,
  .sidebar .nav-link.active .feather {
    color: inherit;
  }

  .sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
  }

  /*
   * Navbar
   */

  .navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
  }

  .navbar .navbar-toggler {
    top: .25rem;
    right: 1rem;
  }

  .navbar .form-control {
    padding: .75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }

  .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .1);
  }

  .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
  }

</style>

<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a
      class="navbar-brand col-md-3 col-lg-2 me-0 px-3"
      href="#"
    >sigma</a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <AppLink
          :class="profileLink.class"
          :name="profileLink.name"
          :params="profileLink.params"
        >
          {{ profileLink.title }}
        </AppLink>
      </li>
    </ul>
  </header>

  <div class="container-fluid">
    <div class="row">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li
              v-for="link in navLinks"
              :key="link.name"
              class="nav-item"
            >
              <AppLink
                class="nav-link"
                active-class="active"
                :name="link.name"
                :params="link.params"
              >
                <i
                  v-if="link.icon"
                  :class="link.icon"
                /> {{ link.title }}
              </AppLink>
            </li>
          </ul>
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a
              class="link-secondary"
              href="#"
              aria-label="Add a new report"
            >
              <span data-feather="plus-circle" />
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >
                <span data-feather="file-text" />
                Current month
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >
                <span data-feather="file-text" />
                Last quarter
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >
                <span data-feather="file-text" />
                Social engagement
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >
                <span data-feather="file-text" />
                Year-end sale
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import type { AppRouteNames } from 'src/router'
import { user } from 'src/store/user'
import { computed, defineComponent } from 'vue'
import type { RouteParams } from 'vue-router'
import feather from 'feather-icons'

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
}

export default defineComponent({
  name: 'AppSidebar',
  setup () {
    const username = computed(() => user.value?.username)
    const displayStatus = computed(() => username.value ? 'authorized' : 'anonym')

    const allNavLinks = computed<NavLink[]>(() => [
      {
        name: 'global-feed',
        title: 'Dashboard',
        display: 'all',
      },
      {
        name: 'create-article',
        title: 'New Post',
        display: 'authorized',
        icon: 'ion-compose',
      },
      {
        name: 'settings',
        title: 'Settings',
        display: 'authorized',
        icon: 'ion-gear-a',
      },

    ])

    const navLinks = computed(() => allNavLinks.value.filter(
      l => l.display === displayStatus.value || l.display === 'all',
    ))
    let profileLink

    if (displayStatus.value === 'authorized') {
      profileLink = {
        name: 'profile',
        params: { erusername: username.value },
        title: username.value || '',
        display: 'authorized',
        class: 'nav-link',
      }
    } else if (displayStatus.value === 'anonym') {
      profileLink = {
        name: 'login',
        title: 'Sign in',
        display: 'anonym',
        class: 'btn btn-outline-success',
      }
    }

    return {
      navLinks,
      profileLink,
    }
  },
})
</script>
