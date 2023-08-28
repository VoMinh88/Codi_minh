$(document).ready(function () {
  bill();
});

function bill() {
  if (!localStorage.getItem("token")) {
    Swal.fire("Bạn chưa đăng nhập").then(() => {
      $("#LoginModal").modal("show");
      $("#submitLoginBtn").click(function (e) {
        e.preventDefault();
        var email = $("#email").val().trim();
        if (email == "") {
          Toast.fire({
            icon: "error",
            title: "Chưa Nhập Email",
          });
        } else {
          $.ajax({
            type: "Post",
            url: "https://students.trungthanhweb.com/api/checkLoginhtml",
            data: {
              email: email,
            },
            dataType: "JSON",
            success: function (res) {
              if (res.check == true) {
                localStorage.setItem("token", res.apitoken);

                Toast.fire({
                  icon: "success",
                  title: "Đăng nhập thành công",
                }).then(() => {
                  window.location.reload();
                });
              } else {
                Toast.fire({
                  icon: "error",
                  title: "Sai email, vui lòng nhập lại Email",
                });
              }
            },
          });
        }
      });
    });
  }
  $.ajax({
    type: "GET",
    url: "https://students.trungthanhweb.com/api/bills",
    data: {
      apitoken: localStorage.getItem("token"),
    },
    dataType: "JSON",
    success: function (res) {
      if (res.check == true) {
        if (res.bills.length == 0) {
          alert("chưa có bill");
        } else if (res.bills.length > 0) {
          var str = ``;
          res.bills.forEach((el) => {
            str +=
              `
                        <button type="btn" class="list-group-item list-group-item-action active billdetail" aria-current="true" data-id="` +
              el.id +
              `">
                        ` +
              el.tenKH +
              `<br>` +
              el.created_at +
              `</button>
                        `;
          });
          $(".list-data").html(str);
          $(".detail-bill").hide();
          detail();
        }
      }
    },
  });
}

function detail() {
  $(".billdetail").click(function (e) {
    e.preventDefault();
    
    $(".detail-bill").show();
    var id = Number($(this).attr("data-id"));
    $.ajax({
      type: "GET",
      url: "https://students.trungthanhweb.com/api/singlebill",
      data: {
        apitoken: localStorage.getItem("token"),
        id: id,
      },
      dataType: "JSON",
      success: function (res) {
        if (res.check == true) {
          var str=``
          var sum = 0;
          res.result.forEach((el, index) => {
            str +=
              `
                                    <tr class="">
                                        <td scope="row">` +
              ++index +
              `</td>
                                        <td ><img src="http://students.trungthanhweb.com/public/images/` +
              el.image +
              `" style="width:100px !important;height: auto; " alt=""></td>
                                        <td>` +
              el.productname +
              `</td>
                                        <td >` +
              Intl.NumberFormat("en-US").format(el.price) +
              `</td>
              <td>` +
              el.qty +
              `</td>
                                        <td>` +
              Intl.NumberFormat("en-US").format(el.price*el.qty) +
              `</td>
                                    </tr>
                                    `;
              sum += el.price*el.qty;
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
          $("#billressult").html(str);
        } else {
          Swal.fire("Chưa có Bill").then(() => {
            window.location.replace("index.html");
          });
        }
      },
    });
  });
}
