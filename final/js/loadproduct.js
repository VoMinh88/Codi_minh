///////Khai báo Thông báo///////////

  ///////Khai báo Thông báo///////////
  $(document).ready(function () {    
    loadProduct();
    loadmoreProduct();    
  });
  

 
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
                    <p href="getCate.html?id=`+el.id+`">Loại sản phẩm : ` +el.catename +`</p>
                    <p href="getBrandProducts.html?id=`+el.id+`">Loại sản phẩm : ` +el.brandname +`</p>
                    <a href="detail.html?id=`+el.id+`" class="btn btn-primary col col-md m-2 w-auto chitietBtn" item-id="`+el.id+`">Chi tiết</a>
                    <button class="btn btn-primary col col-md m-2 w-auto addtocartBtn" cart-id="`+el.id+`">Thêm Giỏ Hàng</button>                   
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
          addToCart()
        },
      });
    } else {
      $("#body-data").hide();
    }
    
  
  }
  function loadmoreProduct() {
    $("#more-data").click(function (e) {
      e.preventDefault();
      loadProduct();    
    });
  
  }


  