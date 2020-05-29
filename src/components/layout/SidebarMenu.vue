<template>
  <ul class="sidebar-menu">
    <li class="header">Data Base</li>
    <router-link tag="li" class="pageLink" to="/user/konkin">
      <a>
        <i class="fa fa-circle"></i>
        <span class="page">Kontrak Kinerja</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/jenissatker">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Jenis Satuan Kerja</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/satuankerja">
      <a>
        <i class="fa fa-file"></i>
        <span class="page">Satuan Kerja</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/datadasar">
      <a>
        <i class="fa fa-book"></i>
        <span class="page">Data Dasar</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/capaianunit">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Capaian Unit</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/aspek">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Aspek</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/masterindikator">
      <a>
        <i class="fa fa-hdd-o"></i>
        <span class="page">Master Indikator</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/indikatorsatuankerja">
      <a>
        <i class="fa fa-hdd-o"></i>
        <span class="page">Indikator Satuan Kerja</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/periode">
      <a>
        <i class="fa fa-calendar"></i>
        <span class="page">Periode</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/indikatorperiode">
      <a>
        <i class="fa fa-circle-o"></i>
        <span class="page">Indikator Periode</span>
      </a>
    </router-link>


    <li class="header">Data Universitas</li>
    <router-link tag="li" class="pageLink" to="/user/abmas">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Abmas</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/dosen">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Dosen</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/penelitian">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Penelitian</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user/publikasi">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Publikasi</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'SidebarMenu'
}
</script>
<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
