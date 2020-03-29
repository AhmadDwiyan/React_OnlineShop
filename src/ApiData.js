import axios from 'axios'
import React from 'react'
class ApiData extends React.Component {
constructor(){
    this.state = {
    produk:[]
}
}



render(){
   return axios.get("http://localhost/pelanggaran_sekolah/public/produk").then(response => {
        this.setState(response.data.Produk)
            })
}

}
export default ApiData;