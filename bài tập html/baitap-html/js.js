let productlist = ["SonyXperia","Samsungalaxy","AppleIphone11"];
function Showproduct(){
  let content= "";
  for (let i = 0; i < productlist.length; i++) {
    content += '<tr>' +
      '    <td>' + productlist[i] + ' </td> ' +
    '    <td><button onclick="editProduct('+i+')">Edit</button> </td>' +
    '    <td><button onclick="deteleproduct('+i+')"> Delete</button></td>' +
    '     </tr>'
  }document.getElementById("products").innerHTML=content;
  document.getElementById("result").innerText=productlist.length+ " product"
} Showproduct();
function Newproduct(){
  let newP= document.getElementById("Product") .value;
  productlist.push(newP);
  Showproduct();
  document.getElementById("Product").value="";
}
function deteleproduct(index){
  productlist.splice(index,1)
  Showproduct()
}
function editProduct(ts){
  let newValue = prompt("nhập dữ liệu cần thêm : ",productlist[ts]);
  productlist[ts] = newValue;
  Showproduct()


}



