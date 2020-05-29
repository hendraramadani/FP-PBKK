<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <div>
        <input type="button" class="btn btn-primary" value="Add New Row" @click="() => spreadsheet.insertRow()" />
        <input type="button" class="btn btn-primary" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
    </div>
  </div>
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
      axios.get('http://10.199.14.46:8010/api/indikatorperiode/').then(res => {
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
            { type: 'dropdown', title: 'Id Master Indikator', url: 'http://10.199.14.46:8010/api/ddmasterindikator/', width: '900px' },
            { type: 'dropdown', title: 'Id Periode', url: 'http://10.199.14.46:8010/api/ddperiode/', width: '150px' },
            { type: 'text', title: 'Bobot', width: '220px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow () {
      axios.post('http://10.199.14.46:8010/api/indikatorperiode/').then(res => {
        console.log('adding data in new row')
      })
    },
    updateRow (instance, cell, columns, row, value) {
      axios.get('http://10.199.14.46:8010/api/indikatorperiode/').then(res => {
        var index = Object.values(res.data[row])
        var old = Object.values(res.data[row])
        index[columns] = value
        axios.put('http://10.199.14.46:8010/api/indikatorperiode/' + old[0] + '&' + old[1] + '&' + old[2], {
          id_master: index[0],
          id_periode: index[1],
          bobot: index[2]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow (instance, row) {
      axios.get('http://10.199.14.46:8010/api/indikatorperiode/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(index[0], index[1], index[2])
        axios.delete('http://10.199.14.46:8010/api/indikatorperiode/' + index[0] + '&' + index[1] + '&' + index[2], {
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
