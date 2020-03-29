import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addItemInCart } from "../../Redux/Actions";
import {DropzoneDialog} from 'material-ui-dropzone';

import Api from "../../Api";
import Item from "../Item/Item";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

import axios from 'axios';


class Detailuser extends Component {
  constructor(props) {
    super(props);

    this.isCompMounted = false;

    this.state = {
      relatedItems: [],
      quantity: 1,
      item: [],
      files:[],
      open:false,
      loading: false
    };
  }

  async fetchProductUsingID(id) {
    this.setState({ loading: true });

    axios.get("http://localhost/pelanggaran_sekolah/public/user/"+id).then(response => {

      if (this.isCompMounted) {
        this.setState({
          item:response.data.user,
          loading: false,
        });
        console.log(this.state.item.id_user)
      }
       
      })
      
    // let item = await Api.getItemUsingID(id);

    // let relatedItems = await Api.searchItems({
    //   category: item.category,
    // });

    // if (this.isCompMounted) {
    //   this.setState({
    //     item,
    //     relatedItems: relatedItems.data.filter(x => x.id !== item.id),
    //     loading: false,
    //   });
    // }
  }

  handleClose() {
    this.setState({
        open: false
    });
}

handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
        files: files, 
        open: false
    });
}

handleOpen() {
    this.setState({
        open: true,
    });
}
  componentDidUpdate(prevProps, prevState, snapshot) {
    
  }


  componentDidMount() {
    this.isCompMounted = true;
    let user = JSON.parse(localStorage.getItem("itemUser"));
    if(user == null){
      this.fetchProductUsingID(0);
    } else {
      this.fetchProductUsingID(user.id_user);
    }
  
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }


  render() {
  
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
    }
    return (
     
      <div style={{ padding: 10 }}>
     {this.state.item.map((item,index) => {
         console.log(item.username)
return(<div> <form><div
    style={{
      marginBottom: 20,
      marginTop: 10,
      fontSize: 24
    }}
  >


  </div>
  <div style={{ display: "flex" }}>
    <img src={this.state.item.image} alt="" width={250} height={250} style={{ borderRadius: "5%", objectFit: "cover" }} />
    <div
      style={{
        flex: 1,
        marginLeft: 20,
        display: "flex",
        flexDirection: "column"
      }}
    >
   
      
       
        <TextField
          id="outlined-helperText"
          label="Username"
          defaultValue={item.username}
          variant="outlined"
        />
        <br/><br/>
        <TextField
          id="outlined-helperText"
          label="Nama User"
          defaultValue={item.nama_user}
          variant="outlined"
        />
        <br/><br/>
        <TextField
          id="outlined-helperText"
          label="Role"
          defaultValue={item.role}
          variant="outlined"
        />
        <br/>
<Button onClick={this.handleOpen.bind(this)}>
                  Add Image
                </Button>
       
   
        <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />

        

      
    </div>
  </div>

  {/* Item description */}
  <div
    style={{
      marginTop: 30,
      marginBottom: 20,
      fontSize: 24
    }}
  >
  </div>
  <div style={{ fontSize: 18, marginTop: 10 }}>
  <TextField
          id="outlined-helperText"
          label="Alamat"
          defaultValue={item.alamat}
          variant="outlined"
        />
        <br/><br/>
      
      </div>
      
      <div style={{ fontSize: 18, marginTop: 10 }}>
      <TextField
          id="outlined-helperText"
          label="Jenis Kelamin"
          defaultValue={item.jenis_kelamin}
          variant="outlined"
        />
        <br/><br/>   
      </div>
      
      <div style={{ fontSize: 18, marginTop: 10 }}>   
      <TextField
          id="outlined-helperText"
          label="Nomor KTP"
          defaultValue={item.noktp}
          variant="outlined"
        />
     
        <br/><br/>   
      </div>
      <Button variant="outlined" color="primary">
      Edit Data
    </Button>
  <div
    style={{
      marginLeft: 5,
      maxHeight: 200,
      fontSize: 13,
      overflow: "auto"
    }}
  >
  </div>

  {/* Relateditems */}
  <div
    style={{
      marginTop: 30,
      marginBottom: 10,
      fontSize: 24
    }}
  >
   Transaksi Yang Harus Dibayar  :
  </div>
  </form>

  </div>)
     })}
        
   
      </div >
    );
  }
}

let user = connect()(Detailuser)
export default user;
