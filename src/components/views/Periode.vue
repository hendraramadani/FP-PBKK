<template>
  <section class="content">
    <div class="container">
      <div class="row">
        <div>
          <div id="app" ref="spreadsheet"></div>
          <div class="col-md-11">
            <input type="button" class="btn btn-primary" value="Add Data" @click="() => spreadsheet.insertRow()" />
            <input type="button" class="btn btn-primary" value="Delete Data" @click="() => spreadsheet.deleteRow()" />
            <!-- <input v-on:keyup.46 = spreadsheet.deleteRow()> -->
          </div>
          <hr>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
export default {
  mounted () {
    this.load()
  },
  methods: {
    load () {
      axios.get('http://10.199.14.46:8010/api/periode/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          oninsertrow: this.add,
          onchange: this.update,
          ondeleterow: this.delete,
          responsive: true,
          search: true,
          pagination: 20,
          csvHeaders: true,
          columns: [
            { type: 'text', title: 'Tahun', width: '100px' },
            { type: 'text', title: 'Nama', width: '150px' },
            { type: 'text', title: 'Create Date', width: '250px', readOnly: true },
            { type: 'text', title: 'Last Update', width: '250px', readOnly: true }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    add (instance, row, value) {
      axios.get('http://10.199.14.46:8010/api/periode/').then(res => {
        var index = Object.values(res.data[row])
        console.log(index[0])
        axios.post('http://10.199.14.46:8010/api/periode/', {
          id: index[0]
        })
      })
    },
    update (instance, cell, columns, row, value) {
      axios.get('http://10.199.14.46:8010/api/periode/').then(res => {
        var index = Object.values(res.data[row])
        var dataold = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://10.199.14.46:8010/api/periode/' + dataold[0], {
          id: index[0],
          nama: index[1],
          last_update: index[4]
        })
      })
    },
    delete (instance, row) {
      axios.get('http://10.199.14.46:8010/api/periode/').then(res => {
        var index = Object.values(res.data[row])
        axios.delete('http://10.199.14.46:8010/api/periode/' + index[0])
        console.log('delete : row', row, res.data[row])
      })
    }
  }
}
</script>
