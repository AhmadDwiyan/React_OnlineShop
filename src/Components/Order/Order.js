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

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};


// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {
  constructor(props){
  super(props)
  this.state = {
    image:"",
    alamat:""
  }
  }
  CheckOut = () => {
    let item = JSON.parse(localStorage.getItem("item_produk"))

   if(item !== null){

  let url = "http://127.0.0.1/pelanggaran_sekolah/public/produk/checkout";
   let userItem = JSON.parse(localStorage.getItem("itemUser"));
   let totalPrice = item[0].quantity * item[0].price;
   const form = new FormData();
   form.append("id_product",item[0].id)
   form.append("quantity",item[0].quantity);
   form.append("id_user",userItem.id_user);
   form.append("bukti_bayar",this.state.image);
   form.append("alamat",this.state.alamat);
   form.append("total",totalPrice);
   axios.post(url,form).then(res => {
      if(res.status == 200){
        alert("Pengiriman Berhasil")
      } else {
        alert("Gagal Pengirim Data")
      }
   })
   }else {
     alert("Data Masih kosong");
   }
 }

 bind = (event) => {
   this.setState({  [event.target.name]:event.target.value});
 }
  bindImage = (event) => {
    this.setState({image:event.target.files[0],

    })
  }
  render() {

      let total = localStorage.getItem("item_produk");
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>
          Order summary
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.checkedOutItems.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div
          style={{
            color: "#504F5A",
            marginLeft: 5,
            marginTop: 50,
            fontSize: 22
          }}
        >
          Total price: Rp.{totalPrice}
          <form>
          Alamat:
          <input type="text" onChange={this.bind} name="alamat"/><br/>
          Bukti Pembayaran
          <input type="file" onChange={this.bindImage}/>
          </form>

        </div>
        <Button
          color="primary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {
            this.CheckOut();
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Purchase
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Discard
        </Button>
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
