<template>
  <footer class="main-footer">
    <strong>Copyright &copy; {{ year }}
    <a href="javascript:;">Institut Teknologi Sepuluh Nopember</a>.</strong> All rights reserved.
  </footer>
</template>

<script>
export default {
  name: 'DashFooter',
  data: function () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
