$(document).ready(function () {
  loadCart();
});

function loadCart() {
  if (localStorage.getItem("cart") && localStorage.getItem("cart") != null) {
    var cart = localStorage.getItem("cart");
    var id = JSON.parse(cart);
    $.ajax({
      type: "GET",
      url: "https://students.trungthanhweb.com/api/getCart",
      data: {
        apitoken: localStorage.getItem("token"),
        id: id,
      },
      dataType: "JSON",
      success: function (res) {
        if (res.check==true) {
          if (res.result.length > 0) {
            var str = `Chưa có Sản Phẩm trong giỏ hàng`;
            var sum = 0;
            res.result.forEach((el, index) => {
              str +=
                `
                          <tr class="">
                              <td scope="row">` +
                ++index +
                `</td>
                              <td ><img src="` +
                el[3] +
                `" style="width:100px !important;height: auto; " alt=""></td>
                              <td>` +
                el[1] +
                `</td>
                              <td >` +
                Intl.NumberFormat("en-US").format(el[5]) +
                `</td>
                              <td ><input type="number" class="numbers-row " data-id="` +
                el[0] +
                `" value="` +
                el[4] +
                `" min=0></td>
                              <td>` +
                Intl.NumberFormat("en-US").format(el[6]) +
                `</td>
                          </tr>
                          `;
              sum += el[6];
            });
            
            str +=
              `
                      <tr class="table-danger">
                          <td colspan='5' scope="row">Tổng tiền</td>
                          <td scope="row">` +
              Intl.NumberFormat("en-US").format(sum) +
              `</td>
  
                      </tr>
                      `;
            $("#cartressult").html(str);
            
            editQty();
            thanhtoan();
          }
        } else { 
          Swal.fire('Chưa có Sản Phẩm trong Giỏ Hàng').then(()=>{
            localStorage.removeItem('cart');
            window.location.replace('index.html')
          })
          
        }         
      }
    })
  } else {
    Swal.fire('Chưa có Sản Phẩm trong Giỏ Hàng').then(()=>{
      localStorage.removeItem('cart');
      window.location.replace('index.html')
    })
  }
}

function editQty() {
  $(".numbers-row").change(function (e) {
    e.preventDefault();
    var newQty = Number($(this).val());
    var id = $(this).attr("data-id");
    if (newQty == 0) {
      Swal.fire({
        title: "Bạn có muốn xoá không?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Xoá",
        denyButtonText: `Không`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var cart = JSON.parse(localStorage.getItem("cart"));
          var arr = [];
          cart.forEach((el) => {
            if (el[0] != id) {
              arr.push(el);
            }
            localStorage.setItem("cart", JSON.stringify(arr));
          });
          Toast.fire({
            icon: "success",
            title: "Đã Xoá",
          }).then(() => {
            loadCart();
          });
        } else if (result.isDenied) {
          Swal.fire("Chưa thay đổi giỏ hàng", "", "info");
          loadCart();
        }
      });
    } else {
      var cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach((el) => {
        if (el[0] == id) {
          el[1] = newQty;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      Toast.fire({
        icon: "success",
        title: "Thay đổi Số Lượng",
      }).then(() => {
        loadCart();
      });
    }
  });
}
function thanhtoan(){
  $('#thanhtoansubmit').click(function (e) { 
    e.preventDefault();
    $("#thanhtoanModal").modal("show");
    const format = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    $('.confirm-checkout').click(function (e) { 
      e.preventDefault();
      var tenKH = $('#tenKH').val().trim();
      var phoneKH = $('#phoneKH').val().trim();
      var addressKH = $('#addressKH').val().trim();
      if (tenKH=="") {
        Toast.fire({
          icon: "warning",
          title: "Vui lòng nhập tên",
        })
      } else if (addressKH=="") {
        Toast.fire({
          icon: "warning",
          title: "Vui lòng nhập địa chỉ",
        })        
      }else if (phoneKH=="") {
        Toast.fire({
          icon: "warning",
          title: "Vui lòng nhập Số điện thoại",
        })        
      }else if (!phoneKH.match(format)) {
        Toast.fire({
          icon: "warning",
          title: "Tính chơi tau hả",
        })        
      }else{
        $('.confirm-checkout').attr('disabled','disabled');
        var cart = JSON.parse(localStorage.getItem('cart'));
        $.ajax({
          type: "POST",
          url: "https://students.trungthanhweb.com/api/createBill",
          data: {
            apitoken:localStorage.getItem('token'),
            tenKH:tenKH,
            phone:phoneKH,
            address:addressKH,
            cart:cart
          },
          dataType: "JSON",
          success: function (response) {
            Toast.fire({
              icon: "success",
              title: "Đặt hàng thành công",
            }).then(()=>{
              localStorage.removeItem('cart');
              window.location.replace('index.html')
            })
          }
        });
      }
    })
  })
}
