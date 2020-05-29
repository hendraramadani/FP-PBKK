import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import JenisSatkerView from './components/views/JenisSatker.vue'
import DataDasarView from './components/views/DataDasar.vue'
import PeriodeView from './components/views/Periode.vue'
import CapaianUnitView from './components/views/CapaianUnit.vue'
import AspekView from './components/views/Aspek.vue'
import MasterIndikatorView from './components/views/MasterIndikator.vue'
import SatuanKerjaView from './components/views/SatuanKerja.vue'
import IndikatorPeriodeView from './components/views/IndikatorPeriode.vue'
import AbmasView from './components/views/Abmas.vue'
import DosenView from './components/views/Dosen.vue'
import PenelitianView from './components/views/Penelitian.vue'
import PublikasiView from './components/views/Publikasi.vue'
import KonkinView from './components/views/Konkin.vue'
import IndikatorSatuanKerjaView from './components/views/IndikatorSatuanKerja.vue'

// Routes
const routes = [
  {
    path: '/',
    component: LoginView
  }, {
    path: '/user',
    component: DashView,
    children: [
      {
        path: 'konkin',
        component: KonkinView,
        name: 'Kontrak Kinerja',
        meta: {description: 'Kontrak Kinerja'}
      }, {
        path: 'jenissatker',
        alias: '',
        component: JenisSatkerView,
        name: 'Jenis Satker',
        meta: {description: 'Jenis Satuan Kerja'}
      }, {
        path: 'datadasar',
        component: DataDasarView,
        name: 'Data Dasar',
        meta: {description: 'Data Dasar'}
      }, {
        path: 'abmas',
        component: AbmasView,
        name: 'Data Abmas',
        meta: {description: 'Data Abmas'}
      }, {
        path: 'dosen',
        component: DosenView,
        name: 'Data Dosen',
        meta: {description: 'Data Dosen'}
      }, {
        path: 'penelitian',
        component: PenelitianView,
        name: 'Data Penelitian',
        meta: {description: 'Data Penelitian'}
      }, {
        path: 'publikasi',
        component: PublikasiView,
        name: 'Data Publikasi',
        meta: {description: 'Data Publikasi'}
      }, {
        path: 'indikatorperiode',
        component: IndikatorPeriodeView,
        name: 'Indikator Periode',
        meta: {description: 'Indikator Periode'}
      }, {
        path: 'satuankerja',
        component: SatuanKerjaView,
        name: 'Satuan Kerja',
        meta: {description: 'Satuan Kerja'}
      }, {
        path: 'masterindikator',
        component: MasterIndikatorView,
        name: 'Master Indikator',
        meta: {description: 'Master Indikator'}
      }, {
        path: 'periode',
        component: PeriodeView,
        name: 'Periode',
        meta: {description: 'Periode'}
      }, {
        path: 'aspek',
        component: AspekView,
        name: 'Aspek',
        meta: {description: 'Ini Aspek'}
      }, {
        path: 'capaianunit',
        component: CapaianUnitView,
        name: 'Capaian Unit',
        meta: {description: 'Capaian dari unit yang ada'}
      }, {
        path: 'indikatorsatuankerja',
        component: IndikatorSatuanKerjaView,
        name: 'Indikator Satuan Kerja',
        meta: {description: 'Indikator Satuan Kerj'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
