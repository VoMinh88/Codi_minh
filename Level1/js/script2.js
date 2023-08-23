///////Khai báo Thông báo///////////

  ///////Khai báo Thông báo///////////
  $(document).ready(function () {
    loaddetail();
    loadMenu();
    loadProduct();
    loadmoreProduct();  

  });
  

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
                <div class="owl-item imgchange pointer"><img src="`+el+`" alt=""></div>
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
              <table class="table text-start w-100" style ="word-wrap: break-word;"  >
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
                  <tr>
                      <td colspan="2" role="textbox" >`+el.content+`</td>
  
                  </tr>
              </tbody>
          </table>
              `
              $("#table-product").html(str);
              
            });
            
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
    $('.imgchange').click(function (e) { 
      e.preventDefault();      
      var src = $(this).attr('src');
      console.log(src);
      $('#changeimg-product').attr('src',src)
    });
    
  }