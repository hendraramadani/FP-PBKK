import axios from 'axios'

export default {
  request (method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var url = 'http://10.199.14.46:8010/auth' + uri
    return axios({ method, url, data })
  }
}
