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
        if (res.result.length > 0) {
          var str = ``;
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
      },
    });
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
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html:
        '<input id="swal-input1" class="swal2-input">' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })
    
    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
    }
  });
}

function changeQty() {
$('.editQty').change(function (e) { 
    e.preventDefault();
    var newQty = $(this).val()
    var id = $(this).attr('data-id')
    if (newQty==0) {
        $('#DeleteModal').modal('show');
    } else {
        
    }
});
}
