<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img :src="user.avatar" class="user-image" alt="User Image">
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{namauser}}</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{namauser}}</span>
        </p>
      </li>
      <li class="user-footer">
        <button v-on:click="logout()">
        <a href="javascript:;" class="btn btn-default btn-flat btn-block">
            <i class="fa fa-sign-out"></i>
            <span>Logout</span>

        </a>
        </button>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'UserMenu',
  props: ['user'],
  data: function () {
    return {
      namauser: window.localStorage.getItem('user').substring(0, 25)
    }
  },
  methods: {
    logout () {
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_TOKEN', null)

      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }
      console.log(window.localStorage)
      this.$router.push('/')
    }
  }
}
</script>
