import axios from 'axios';

const dataapi = axios.get("http://localhost/pelanggaran_sekolah/public/produk").then(response => {
  return response.data.Produk
      })
// Our product database.
const sampleProducts =  dataapi;
// List of item categories.
const categories = [
  {
    name: "All categories",
    icon: "list"
  },
  {
    name: "Clothing and Shoes",
    icon: "group"
  },
  {
    name: "Jewelry and Watches",
    icon: "watch"
  },
  {
    name: "Books",
    icon: "menu_book"
  },
  {
    name: "Computers",
    icon: "computer"
  }
];

// Data for rendering menu.
const dataForTheMenu = [
  { name: "Home page", url: "/", icon: "home", id: 0 },
  {
    name: "Product categories",
    id: 1,
    children: categories.map((x, i) => {
      return {
        name: x.name,
        id: 2 + i,
        url: "/?category=" + x.name + "&itemCategoryClicked=true",
        icon: x.icon
      };
    })
  },

];


export { sampleProducts, categories, dataForTheMenu };
