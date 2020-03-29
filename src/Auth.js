import Axios from 'axios';

// Simulate authentication service
const Auth = {
  _isAuthenticated: false,

  authenticate(name, pass, cb) {

let url = "http://localhost/pelanggaran_sekolah/public/user/auth";
let form  = new FormData();
form.append("username",name);
form.append("password",pass);

Axios.post(url,form).then(res => {
  var check = res.data.status;
  if(check){
    this._isAuthenticated = true;
    setTimeout(
      () =>
        cb({
          name: name,
          user:res.data.user
        }),
      100
    );
  }else {
    this._isAuthenticated = false;
    
  }
})
   
  },

  signout(cb) {
    this._isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default Auth;
