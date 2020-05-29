<template>
  <section class="content">
    <div class="container">
      <div class="row">
        <div>
          <div id="app" ref="spreadsheet"></div>
          <div>
              <!-- <span>Selected: {{ selected }}</span> -->
              <input type="button" class="btn btn-primary" value="Add New Row" @click="() => spreadsheet.insertRow()" />
              <input type="button" class="btn btn-primary" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
              <div>
                  <h4>
                      <select v-model="selected"  v-on:change="changeData()">
                          <option v-for="(option,index) in options" v-bind:value='option.id'>
                              {{ option.nama }}
                          </option>
                      </select>
                  </h4>
              </div>
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
      },
      selected: '11',
      options: []
    }
  },
  mounted () {
    this.setIdSatker(window.localStorage.getItem('token'))
    this.getSatker()
    console.log(this.options)
    this.load()
  },
  methods: {
    setIdSatker(idsatker) {
      this.idSatker = idsatker
    },
    getSatker() {
      axios.get('http://10.199.14.46:8010/api/ddkontrakkinerja/' + this.idSatker).then(res => {
        console.log(Object.values(res.data))
        this.options = Object.values(res.data)
      })
    },
    load () {
      axios.get('http://10.199.14.46:8010/api/fakultas/' + this.selected).then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          onload: this.loaded,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          search: true,
          pagination: 20,
          csvHeaders: true,
          columns: [
            { type: 'hidden', title: 'Id Satker', width: '0px' },
            { type: 'dropdown', title: 'Aspek', width: '180px', url: 'http://10.199.14.46:8010/api/ddaspek/', autocomplete: true },
            { type: 'dropdown', title: 'Komponen Aspek', width: '320px', url: 'http://10.199.14.46:8010/api/ddkomponenaspek/', autocomplete: true },
            { type: 'text', title: 'Indikator Kinerja', width: '600px' },
            { type: 'text', title: 'Bobot', width: '150px' },
            { type: 'text', title: 'Target', width: '150px' },
            { type: 'text', title: 'Capaian', width: '90px' },
            { type: 'text', title: ' ', width: '100px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    changeData () {
      axios.get('http://10.199.14.46:8010/api/fakultas/' + this.selected).then(res => {
        this.spreadsheet.setData(res.data)
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
