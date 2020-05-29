<template>
  <section class="content">
    <div class="container">
      <div class="row">
        <div>
        <div id="app" ref="spreadsheet"></div>
        <div>
            <input type="button" class="btn btn-primary" value="Add New Row" @click="() => spreadsheet.insertRow()" />
            <input type="button" class="btn btn-primary" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
        </div>
          <hr>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

export default {
  // name: 'App',
  data () {
    return {
      capaianUnit: [],
      form: {
        DataDasar_id: 1,
        Unit_id: 1,
        capaian: 0.0
      }
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      axios.get('http://10.199.14.46:8010/api/indikatorsatuankerja/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          search: true,
          pagination: 20,
          csvHeaders: true,
          columns: [
            { type: 'hidden', title: 'Id', width: '0px' },
            { type: 'dropdown', title: 'Id Periode', width: '100px', url: 'http://10.199.14.46:8010/api/ddperiode/', autocomplete: true },
            { type: 'dropdown', title: 'Id Master', width: '550px', url: 'http://10.199.14.46:8010/api/ddmasterindikator/', autocomplete: true },
            { type: 'dropdown', title: 'Id Satuan Kerja', width: '400px', url: 'http://10.199.14.46:8010/api/ddsatuankerja/', autocomplete: true },
            { type: 'text', title: 'Bobot', width: '100px' },
            { type: 'text', title: 'Target', width: '100px' },
            { type: 'text', title: 'Capaian', width: '150px' },
            { type: 'text', title: 'Last Update', width: '200px', readOnly: true }
          //   { type: 'text', title: 'Nama', width: '250px' },
          //   { type: 'dropdown', title: 'Angkatan', width: '80px', source: [ '2019', '2018', '2017', '2016', '2015' ], autocomplete: true },
          //   { type: 'dropdown', title: 'Jenis Kelamin', width: '200px', source: [ 'Laki-laki', 'Perempuan' ], autocomplete: true },
          //   { type: 'calendar', title: 'Tanggal Lahir', width: '200px' },
          //   { type: 'image', title: 'Photo', width: '200px' },
          //   { type: 'checkbox', title: 'Aktif', width: '80px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow () {
      axios.post('http://10.199.14.46:8010/api/indikatorsatuankerja/').then(res => {
        console.log('adding data in new row')
      })
    },
    updateRow (instance, cell, columns, row, value) {
      axios.get('http://10.199.14.46:8010/api/indikatorsatuankerja/').then(res => {
        var index = Object.values(res.data[row])
        var old = Object.values(res.data[row])
        index[columns] = value
        axios.put('http://10.199.14.46:8010/api/indikatorsatuankerja/' + old[0], {
          id: index[0],
          id_periode: index[1],
          id_master: index[2],
          id_satker: index[3],
          bobot: index[4],
          target: index[5],
          capaian: index[6]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow (instance, row) {
      axios.get('http://10.199.14.46:8010/api/indikatorsatuankerja/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(index[0], index[1], index[2])
        axios.delete('http://10.199.14.46:8010/api/indikatorsatuankerja/' + index[0], {
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    oldRow (instance, cell, columns, row, value) {
      console.log('lama ' + value)
    }
  }
}
</script>
