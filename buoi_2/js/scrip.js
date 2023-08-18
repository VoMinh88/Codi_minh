const but2 = document.querySelectorAll(".but2");
const tenSP = document.querySelectorAll(".tenSP");
const giaSP = document.querySelectorAll(".giaSP");
var arr = [];
for (let i = 0; i < but2.length; i++) {
  const el = but2[i];
  el.addEventListener("click", () => {
    var tenSP1 = tenSP[i].innerHTML;
    var giaSP1 = giaSP[i].innerHTML;
    var item = new Object();
    item.ten = tenSP1;
    item.gia = giaSP1;
    item.soluon = 1;
    var check = 0;
    arr.forEach((el) => {
      if (el.ten == tenSP1) {
        el.soluon++;
        check = 1;
      }
    });
    if (check == 0) {
      arr.push(item);

    }
    console.log(arr);
    var str = ``;
    var key = 1;
    arr.forEach(el => {
        var thanhtien = Number(el.gia)*Number(el.soluon);
        console.log(el.gia);
        str+=`
        <div class="cart">
            <div class="gio">`+(key++)+`</div>
            <div class="gio">`+el.ten+`</div>
            <div class="gio">`+el.soluon+`</div>
            <div class="gio">`+el.gia+`</div>
            <div class="gio">`+thanhtien+`</div>
            
        </div>

        `;      
    });
    console.log(str)
    document.getElementById('cart2').innerHTML=str;

  });
}
