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
///////Khai báo Thông báo///////////
$(document).ready(function () {
  getCate();
  loadCart();
  getBrand();
});

function getCate() {
  if (localStorage.getItem("token") && localStorage.getItem("token") != null) {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("id")) {
      window.location.replace("index.html");
    }
    if (!params.has("page")) {
      window.location.replace("index.html");
    }
    var id = params.get("id");
    var page = params.get("page");

    $.ajax({
      type: "GET",
      url: "https://students.trungthanhweb.com/api/getCateProducts",
      data: {
        apitoken: localStorage.getItem("token"),
        id: id,
      },
      dataType: "JSON",
      success: function (res) {
        const product = res.products.data;

        if (product.length > 0) {
          $("#body-title-data").text();
          var str = ``;
          product.forEach((el) => {
            $("#body-title-data").text(el.catename);
            str +=
              `
              <div class="col-md-3 mb-3" >
                <div class="card border-info" style="border-radius: 10px; w-100">
                  <img src="https://students.trungthanhweb.com/images/` +
              el.image +
              `" class="card-img-top mt-2" alt="">
                
                  <div class="card-body m-2">
                    <h5 class="card-title">` +
              el.name +
              `</h5>
                    <p class="card-text">Giá : ` +
              Intl.NumberFormat("en-US").format(el.price) +
              ` vnđ</p>
                    <p href="getCart.html?id=` +
              el.id +
              `">Loại sản phẩm : ` +
              el.catename +
              `</p>
                    <p href="getBrandProducts.html?id=` +
              el.id +
              `">Loại sản phẩm : ` +
              el.brandname +
              `</p>
                    <a href="detail.html?id=` +
              el.id +
              `" class="btn btn-primary col col-md m-2 w-auto chitietBtn" item-id="` +
              el.id +
              `">Chi tiết</a>
                    <button class="btn btn-primary col col-md m-2 w-auto addtocartBtn" cart-id="` +
              el.id +
              `">Thêm Giỏ Hàng</button>                   
                  </div>
                </div>
              </div>
              `;
          });
        }
        $("#cate-product-data").html(str);
        addToCart();

        var pages = res.products.last_page;
        str = ``;
        var i = 1;
        while (i <= pages) {
          if (i == res.products.current_page) {
            str +=
              `<li><a class="page active p-3 m-1" style="border-radius:5%; border: 0.5px solid skyblue;" href="getCart.html?id=` +
              id +
              `&page=` +
              i +
              `">` +
              i +
              `</a></li>`;
          } else {
            str +=
              `<li><a class="page active pointer p-3 m-1" style="border-radius:5%; border: 0.5px solid skyblue;" href="getCart.html?id=` +
              id +
              `&page=` +
              i +
              `">` +
              i +
              `</a></li>`;
          }
          i++;
        }

        $(".pageination").html(str);
      },
    });
  } else {
    $("#body-data").hide();
  }
}

function getBrand() {
  if (localStorage.getItem("token") && localStorage.getItem("token") != null) {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("id")) {
      window.location.replace("index.html");
    }
    if (!params.has("page")) {
      window.location.replace("index.html");
    }
    var id = params.get("id");
    var page = params.get("page");

    $.ajax({
      type: "GET",
      url: "https://students.trungthanhweb.com/api/getBrandProducts",
      data: {
        apitoken: localStorage.getItem("token"),
        id: id,
      },
      dataType: "JSON",
      success: function (res) {
        const product = res.products.data;

        if (product.length > 0) {
          $("#body-title-data").text();
          var str = ``;
          product.forEach((el) => {
            $("#brand-title-data").text(el.catename);
            str +=
              `
              <div class="col-md-3 mb-3" >
                <div class="card border-info" style="border-radius: 10px; w-100">
                  <img src="https://students.trungthanhweb.com/images/` +
              el.image +
              `" class="card-img-top mt-2" alt="">
                
                  <div class="card-body m-2">
                    <h5 class="card-title">` +
              el.name +
              `</h5>
                    <p class="card-text">Giá : ` +
              Intl.NumberFormat("en-US").format(el.price) +
              ` vnđ</p>
                    <p href="getCart.html?id=` +
              el.id +
              `">Loại sản phẩm : ` +
              el.catename +
              `</p>
                    <p href="getBrandProducts.html?id=` +
              el.id +
              `">Loại sản phẩm : ` +
              el.brandname +
              `</p>
                    <a href="detail.html?id=` +
              el.id +
              `" class="btn btn-primary col col-md m-2 w-auto chitietBtn" item-id="` +
              el.id +
              `">Chi tiết</a>
                    <button class="btn btn-primary col col-md m-2 w-auto addtocartBtn" cart-id="` +
              el.id +
              `">Thêm Giỏ Hàng</button>                   
                  </div>
                </div>
              </div>
              `;
          });
        }
        $("#brand-product-data").html(str);
        addToCart();

        var pages = res.products.last_page;
        str = ``;
        var i = 1;
        while (i <= pages) {
          if (i == res.products.current_page) {
            str +=
              `<li><a class="page active p-3 m-1" style="border-radius:5%; border: 0.5px solid skyblue;" href="getCart.html?id=` +
              id +
              `&page=` +
              i +
              `">` +
              i +
              `</a></li>`;
          } else {
            str +=
              `<li><a class="page active pointer p-3 m-1" style="border-radius:5%; border: 0.5px solid skyblue;" href="getCart.html?id=` +
              id +
              `&page=` +
              i +
              `">` +
              i +
              `</a></li>`;
          }
          i++;
        }

        $(".pageination").html(str);
      },
    });
  } else {
    $("#body-data").hide();
  }
}


// ================================
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
        const brands = res.brands;
        const categrories = res.categrories;
        if (brands.length > 0) {
          var str = ``;
          brands.forEach((el) => {
            str +=
              `
                                <li><a class="dropdown-item" href="#">` +
              el.name +
              `</a></li>
                                `;
          });
          $("#brandUl").html(str);
        }
        if (categrories.length > 0) {
          var str = ``;
          categrories.forEach((el) => {
            str +=
              `
                                <li><a class="dropdown-item" href="#">` +
              el.name +
              `</a></li>
                                `;
          });
          $("#cateUl").html(str);
        }
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
              `" style="width:150px;height: auto;" alt=""></td>
                                    <td>` +
              el[1] +
              `</td>
                                    <td >` +
              Intl.NumberFormat("en-US").format(el[2]) +
              `</td>
                                    <td>` +
              el[4] +
              `</td>
                                    <td>` +
              Intl.NumberFormat("en-US").format(el[5]) +
              `</td>
                                </tr>
                                `;
            sum += el[5];
          });
          str +=
            `
                            <tr class="">
                                <td colspan='5' scope="row">Tổng tiền</td>
                                <td scope="row">` +
            Intl.NumberFormat("en-US").format(sum) +
            `</td>

                            </tr>
                            `;
          $("#cartressult").html(str);
        }
      },
    });
  }
}
