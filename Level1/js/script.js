///////Khai báo Thông báo///////////
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
const url = "https://students.trungthanhweb.com/api/home";

var page = 1;
///////Khai báo Thông báo///////////
$(document).ready(function () {
  login();
  logoutBtn();
  loadMenu();
  loadProduct();
  loadmoreProduct();

});

function login() {
  if (localStorage.getItem("token") && localStorage.getItem("token") != null) {
    $("#loginBtn").hide();
  }
  $("#loginBtn").click(function (e) {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      alert("Bạn đã đăng nhập");
      window.location.reload();
    } else {
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
    }
  });
}
function logoutBtn() {
  if (!localStorage.getItem("token")) {
    $("#logoutBtn").hide();
  }
  $("#logoutBtn").click(function (e) {
    e.preventDefault();
    $("#LogoutModal").modal("show");
    $("#submitLogoutBtn").click(function (e) {
      e.preventDefault();
      localStorage.removeItem("token");
      Toast.fire({
        icon: "success",
        title: "Đăng xuất thành công",
      }).then(() => {
        window.location.reload();
      });
    });
  });
}
function loadMenu() {
  if (localStorage.getItem("token") && localStorage.getItem("token") != null) {
    $(".menu").click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: url,
        data: {
          apitoken: localStorage.getItem("token"),
        },
        dataType: "JSON",
        success: function (res) {
          const brands = res.brands;
          const cates = res.categrories;
          // Lấy thông tin Brands
          if (brands.length > 0) {
            var str = ``;
            brands.forEach((el) => {
              str +=
                `<li><a class="dropdown-item" href="#" >` +
                el.name +
                `</a></li>`;
            });
          }
          $("#brand-data").html(str);
          // Print thông tin Brands và kết thúc
          // Lấy thông tin CateLog
          if (brands.length > 0) {
            var str = ``;
            cates.forEach((el) => {
              str +=
                `<li><a class="dropdown-item" href="#" >` +
                el.name +
                `</a></li>`;
            });
          }
          $("#cate-data").html(str);
          // Print thông tin Cates và kết thúc
        },
      });
    });
  } else {
    $("#brand-data").hide();
    $("#cate-data").hide();
  }
}
function loadProduct() {
  if (localStorage.getItem("token") && localStorage.getItem("token") != null) {
    $.ajax({
      type: "GET",
      url: url,
      data: {
        apitoken: localStorage.getItem("token"),
        page: page,
      },
      dataType: "JSON",
      success: function (res) {
        const product = res.products.data;
        if (product.length > 0) {
          var str = ``;
          product.forEach((el) => {
            str +=
              `
            <div class="col-md-3 mb-3" >
              <div class="card border-info" style="border-radius: 10px; w-100">
                <img src="https://students.trungthanhweb.com/images/`+el.images +`" class="card-img-top mt-2" alt="">
              
                <div class="card-body m-2">
                  <h5 class="card-title">` +el.name +`</h5>
                  <p class="card-text">Giá : ` +Intl.NumberFormat("en-US").format(el.price) +` vnđ</p>
                  <p>Loại sản phẩm : ` +el.catename +`</p>
                  <p>Loại sản phẩm : ` +el.brandname +`</p>
                  <a href="#" class="btn btn-primary col col-md m-2 w-auto chitietBtn" data-id="`+el.id+`">Chi tiết</a>
                  <button class="btn btn-primary col col-md m-2 w-auto addtocartBtn" data-id="`+el.id+`">Giỏ Hàng</button>                   
                </div>
              </div>
            </div>
            `;
          });
        }

        if (res.products.next_page_url != null) {
          page++;
        } else {
          $("#more-data").hide();
        }

        $("#product-data").append(str);
      },
    });
  } else {
    $("#body-data").hide();
  }
  addtocart();

}
function loadmoreProduct() {
  $("#more-data").click(function (e) {
    e.preventDefault();
    loadProduct();
    
  });

}
function addtocart() {

$('.addtocartBtn').click(function (e) { 
  e.preventDefault();
  alert('thu')
});
}
