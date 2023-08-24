///////Khai báo Thông báo///////////

  ///////Khai báo Thông báo///////////
  $(document).ready(function () {
    loaddetail();

  });
  
function xemThemBtn(){
 var newHeight =  $("#table-data-product")[0].offsetHeight;
 $("#table-data-product").css("height",500)
 $("#table-data-product").css('overflow',"hidden")
  $(".xemThemBtn").click(function (e) {
    e.preventDefault();
    $("#table-data-product").css({"height":newHeight,'overflow':"show"})
    $("#xemThem").hide(); 
})
}


function loaddetail(){
    if (localStorage.getItem("token") && localStorage.getItem("token") != null) {
      const params = new URLSearchParams(window.location.search);
      if (!params.has('id')) {
        window.location.replace('index.html')
      } 
      var id = params.get('id')
      $.ajax({
        type: "GET",
        url: "https://students.trungthanhweb.com/api/single",
        data: {
          apitoken: localStorage.getItem("token"),
          id:id
        },
        dataType: "JSON",
        success: function (res) {
  // Bắt đầu vòng ajax Thành công
          const gallery = res.gallery;
          if (gallery.length > 0) {
            var str = ``;
            gallery.forEach((el) => {
              str +=
                `
                <div class="owl-item pointer"><img class="imgChange" src="`+el+`" alt=""></div>
                `;
                $("#gallery-data").append(str);
            });
            
            
            const dtproduct = res.products;
            // const imgproduct = dtproduct.images
            // console.log(imgproduct);
            dtproduct.forEach(el => {
              str=`<img src="https://students.trungthanhweb.com/images/`+el.images+`" alt="" style="width: 100%;" id="changeimg-product">`
              $("#img-product").html(str);
              
            });

            

            Owl();
            changeImg();
            dtproduct.forEach(el => {
              str=`
              <table class="table text-start w-100" style="background-color: rgb(190, 190, 231); ">
              <tbody>
                  <tr>
                      <td>Tên SP</td>
                      <td>`+el.name+`</td>
                  </tr>
                  <tr>
                      <td>Giá</td>
                      <td>` +Intl.NumberFormat("en-US").format(el.price) +` vnđ</td>
                  </tr>
                  <tr>
                      <td>Thương Hiệu</td>
                      <td>` +el.brandname +`</td>
                  </tr>
                  <tr>
                      <td>Loại SP</td>
                      <td>` +el.catename +`</td>
                  </tr>
                  <tr>
                    <td>Giảm Giá</td>
                    <td>`+el.discount+` %</td>                  
                  </tr>                 
              </tbody>
          </table>
                <div class="row justify-content-between">
                    <button class="btn btn-danger col m-2 buynowBtn" detail-id="`+el.id+`">Mua ngay</button> 
                    <button class="btn btn-success col m-2 addtocartBtn" detail-id="`+el.id+`">Thêm Giỏ Hàng</button>   
                </div>
                <div class="row">
                    <a href="detail.html?id=`+el.id+`" class="btn btn-primary col col-md m-2 w-100 chitietBtn" item-id="`+el.id+`">Chi tiết</a> 
                </div>
          
          
          `
              $("#table-product").html(str);
              $(".content-data").hide(); 
              $("#xemThem").hide(); 
              
              $(".chitietBtn").click(function (e) { 
                e.preventDefault();
                $(".content-data").show();
                $("#table-data-product").html(el.content)
                // $("#xemThem").show();
                // xemThemBtn();
              });
            });
            
            adddetailToCart()
            
          }       
  // Kết thúc vòng ajax Thành công
        },
      });
    } else {
      $("#body-data").hide();
    }
  }
  
  function Owl(){
    $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
              nav:true
          },
          600:{
              items:2,
              nav:false,
              loop:true
          },
          1000:{
              items:3,
              nav:false,
              loop:true
          }
      }
  })
  }
  function changeImg(){
    $('.imgChange').click(function (e) { 
      e.preventDefault();      
      var src = $(this).attr('src');
      console.log(src);
      $('#changeimg-product').attr('src',src)
    });
    
  }
  function adddetailToCart() {
    $('.addtocartBtn').click(function (e) { 
      e.preventDefault();
      if (localStorage.getItem('cart')&&localStorage.getItem('cart')!=null) {
        
        var cart = localStorage.getItem('cart')
        var arr = JSON.parse(cart)
      } else {
        var arr = []
      }
      var id = Number($(this).attr('detail-id'))
      var qty = 1
  
      var check = 0
  
      arr.forEach(el => {
        if (id==el[0]) {
          el[1]++
          check = 1
        } 
      });
      if(check==0) {
        var item = [id,qty]
        arr.push(item)
      }
      localStorage.setItem('cart',JSON.stringify(arr))
        Toast.fire({
          icon: "success",
          title: "Đã Thêm Thành Công",
        });
    });
  }