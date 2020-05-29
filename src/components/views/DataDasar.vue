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
    let spreadsheet = jexcel(this.$el, this.jexcelOptions)
    console.log(this.$el)
    Object.assign(this, { spreadsheet })
  },
  methods: {
    add () {
      axios.post('http://10.199.14.46:8010/api/datadasar').then(res => {
        console.log('adding data in new row')
      })
    },
    update (instance, cell, columns, row, value) {
      axios.get('http://10.199.14.46:8010/api/datadasar/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://10.199.14.46:8010/api/datadasar/' + index[0], {
          id: index[0],
          nama: index[1],
          expired_date: index[4]
        })
      })
    },
    delete (instance, row) {
      axios.get('http://10.199.14.46:8010/api/datadasar').then(res => {
        var index = Object.values(res.data[row])
        axios.delete('http://10.199.14.46:8010/api/datadasar/' + index[0])
        console.log('delete : row', row, res.data[row])
      })
    }
  },
  computed: {
    jexcelOptions () {
      return {
        allowToolbar: true,
        url: 'http://10.199.14.46:8010/api/datadasar',
        oninsertrow: this.add,
        onchange: this.update,
        ondeleterow: this.delete,
        search: true,
        pagination: 20,
        csvHeaders: true,
        columns: [
          { type: 'hidden', title: 'id', width: '10px' },
          { type: 'text', title: 'Nama', width: '800px' },
          { type: 'text', title: 'Create Date', width: '250px', readOnly: true },
          { type: 'text', title: 'Last Update', width: '250px', readOnly: true },
          { type: 'calendar', title: 'Expired Date', width: '200px' }
        //   { type: 'text', title: 'Nama', width: '250px' },
        //   { type: 'dropdown', title: 'Angkatan', width: '80px', source: [ '2019', '2018', '2017', '2016', '2015' ], autocomplete: true },
        //   { type: 'dropdown', title: 'Jenis Kelamin', width: '200px', source: [ 'Laki-laki', 'Perempuan' ], autocomplete: true },
        //   { type: 'calendar', title: 'Tanggal Lahir', width: '200px' },
        //   { type: 'image', title: 'Photo', width: '200px' },
        //   { type: 'checkbox', title: 'Aktif', width: '80px' }
        ]
      }
    }
  }
}
</script>
