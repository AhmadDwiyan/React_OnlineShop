import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import axios from 'axios';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setCheckedOutItems } from "../../Redux/Actions";



// This component shows the items user checked out from the cart.
class AdminOrder extends Component {
  constructor(props){
  super(props)
  this.state = {
    image:"",
    alamat:"",
    checkout:[]
  }
  }

componentDidMount(){
let url = "http://127.0.0.1:/pelanggaran_sekolah/public/produk/showCheckOut";
axios.get(url).then(response =>{
  this.setState({checkout:response.data.checkout});
})
}

 //  CheckOut = (item) => {
 //
 //   if(item !== null){
 //
 //  let url = "http://127.0.0.1/pelanggaran_sekolah/public/produk/checkout";
 //   let userItem = JSON.parse(localStorage.getItem("itemUser"));
 //   let totalPrice = userItem.quantity * userItem.price;
 //   const form = new FormData();
 //   form.append("id_product",item.id)
 //   form.append("quantity",item.quantity);
 //   form.append("id_user",userItem.id_user);
 //   form.append("bukti_bayar",this.state.image);
 //   form.append("alamat",this.state.alamat);
 //   form.append("total",totalPrice);
 //   axios.post(url,form).then(res => {
 //      if(res.status == 200){
 //        alert("Pengiriman Berhasil")
 //      } else {
 //        alert("Gagal Pengirim Data")
 //      }
 //   })
 //   }else {
 //     alert("Data Masih kosong");
 //   }
 // }


  render() {

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>
          Order summary
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>bukti bayar</TableCell>
              <TableCell> Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.checkout.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id_user}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>{item.alamat}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell> <div><img src={"http://127.0.0.1/pelanggaran_sekolah/public/images/"+item.bukti_bayar} width={100} height={100} /></div></TableCell>
                  <TableCell><div><Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                          alert("Barang Telah Disetujui ")
                    }}
                    style={{ margin: 5, marginTop: 30 }}
                  >
                    Accept
                  </Button> |   <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        alert("Barang Telah Dihapus ")
                      }}
                      style={{ margin: 5, marginTop: 30 }}
                    >
                      Discard
                    </Button></div></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

      </div>
    );
  }
}


export default AdminOrder;
