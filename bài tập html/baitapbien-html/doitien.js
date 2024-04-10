function Changemoney(){
  let Amount = document.getElementById("Amount").value;
  let From = document.getElementById("From").value;
  let To= document.getElementById("To").value;
  let Result;

  if (From==="USD" && To==="VND"){
    Result= "result:"+( Amount*23000)+" Đ ";
  }else if (From==="USD"&& To==="VND"){
    Result="result:"+(Amount/23000)+"$";
  }else if (From ==="VND"){
    Result="result:"+ Amount +"Đ";}
  else {Result="result:"+ Amount+"$"
  }



  document.getElementById("Result").innerHTML=Result;


}
