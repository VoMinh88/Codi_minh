///////Khai báo Thông báo///////////
$(document).ready(function () {
  getBrand();
});


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
    var pageBrand = params.get("page");

    $.ajax({
      type: "GET",
      url: "https://students.trungthanhweb.com/api/getBrandProducts",
      data: {
        apitoken: localStorage.getItem("token"),
        id: id,
        page:pageBrand
      },
      dataType: "JSON",
      success: function (res) {
        const product = res.products.data;
        if (product.length > 0) {
          $("#brand-title-data").text();
          var str = ``;
          product.forEach((el) => {
            $("#brand-title-data").text(el.brandname);
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
                    <p href="getCate.html?id=` +
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
        sortBrand();
        var pages = res.products.last_page;
        str = ``;
        var i = 1;
        while (i <= pages) {
          if (i == res.products.current_page) {
            str +=
              `<li><a class="visited active p-2 m-1" style="border-radius:20%; border: 0.5px solid skyblue;" href="getBrandProducts.html?id=` +
              id +
              `&page=` +
              i +
              `">` +
              i +
              `</a></li>`;
          } else {
            str +=
              `<li><a class=" pointer p-2 m-1" style="border-radius:20%; border: 0.5px solid skyblue;" href="getBrandProducts.html?id=` +
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

function sortBrand(){
  $('.sortBtn').click(function (e) { 
    e.preventDefault();
    var giatu = Number($('.price1').val().trim())
    var giaDen = Number($('.price2').val().trim())
    const params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    
    if (giaDen==0&&giatu!=0) {
      option = "minprice";
    } else if (giatu==0&&giaDen!=0) {
      option="maxprice";
    } else if ((giatu<giaDen)&&(giatu!=0)&&(giaDen!=0)) {
      option="between";
    } else {
      option="wrong";
    }
    switch (option) {
      case "minprice":
      $.ajax({
        type: "get",
        url: "https://students.trungthanhweb.com/api/searchBrandPrice",
        data: {
          apitoken:localStorage.getItem('token'),
          id:id,
          price1:giatu,
        },
        dataType: "JSON",
        success: function (res) {
          $("#body-title-data").text();
          var str = ``;
          const product = res.products;
          product.forEach((el) => {
            
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
                    <p href="getCate.html?id=` +
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
          $("#brand-product-data").html(str);
          $(".pageination").hide();
        }
      });
      break;
      case "maxprice":
        $.ajax({
          type: "get",
          url: "https://students.trungthanhweb.com/api/searchBrandPrice",
          data: {
            apitoken:localStorage.getItem('token'),
            id:id,
            price2:giaDen,
          },
          dataType: "JSON",
          success: function (res) {
            $("#body-title-data").text();
            var str = ``;
            const product = res.products;
            product.forEach((el) => {
              
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
                      <p href="getCate.html?id=` +
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
            $("#brand-product-data").html(str);
            $(".pageination").hide();
          }
        });
      break;
      case "between":
        $.ajax({
          type: "get",
          url: "https://students.trungthanhweb.com/api/searchBrandPrice",
          data: {
            apitoken:localStorage.getItem('token'),
            id:id,
            price1:giatu,
            price2:giaDen,
          },
          dataType: "JSON",
          success: function (res) {
            $("#body-title-data").text();
            var str = ``;
            const product = res.products;
            product.forEach((el) => {
              
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
                      <p href="getCate.html?id=` +
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
            $("#brand-product-data").html(str);
            $(".pageination").hide();
          }
        });
      break;
      case "wrong":
        Swal.fire('Nhập sai giá tìm kiếm').then(()=>{
          
          window.location.reload()
        })
      break;
    }
  });
}