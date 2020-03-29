import { sampleProducts } from "./Data";
import axios from 'axios';

class Api  {
constructor(){

this.state = {
  dataProduk : [] 
}

}
  getItemUsingID(id) {
    axios.get("http://localhost/pelanggaran_sekolah/public/produk").then(response => {
    var res =   response.data.Produk.filter(x=>x.id === parseInt(id,0));
      return res.length  === 0 ? null : res[0]
    })
    
    // let res = sampleProducts.values("Produk").filter(x => x.id === parseInt(id, 10));
    // return res.length === 0 ? null : res[0];
  }

  
  sortByPrice(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;

    let items = [...data];

    if (sortval === "lh") {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }

  searchItems({
    category = "popular",
    term = "",
    sortValue = "lh",
    itemsPerPage = 10,
    usePriceFilter = false,
    minPrice = 0,
    maxPrice = 1000,
    page = 1
  }) {
  

       axios.get("http://localhost/pelanggaran_sekolah/public/produk").then(response => {
        
       var datanya = response.data.Produk
       console.log(datanya)
        var data =datanya.filter(item => {
          console.log(item)
           if (
             usePriceFilter &&
             (item.price < minPrice || item.price > maxPrice)
           ) {
             return false;
           }
 
           if (category === "popular") {
             return item.popular;
           }
 
           if (category !== "All categories" && category !== item.category)
             return false;
 
           if (term && !item.name.toLowerCase().includes(term.toLowerCase()))
             return false;
 
           return true;
         });
 
         let totalLength = data.length;
 
         data = this.sortByPrice(data, sortValue);
 
         data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
              });
    
            
  

     
}

}

export default new Api();
