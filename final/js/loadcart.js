$(document).ready(function () {
    loadCart();
  });

function loadCart() {
    if (localStorage.getItem('cart') && localStorage.getItem('cart') != null) {
        var cart = localStorage.getItem('cart');
        var id = JSON.parse(cart);
        $.ajax({
            type: "GET",
            url: "https://students.trungthanhweb.com/api/getCart",
            data: {
                apitoken: localStorage.getItem('token'),
                id: id
            },
            dataType: "JSON",
            success: function (res) {                
                if(res.result.length>0){
                    var str=``;
                    var sum=0;
                    res.result.forEach((el,index) => {
                        str+=`
                        <tr class="">
                            <td scope="row">`+(++index)+`</td>
                            <td ><img src="`+el[3]+`" style="width:100px !important;height: auto; " alt=""></td>
                            <td>`+el[1]+`</td>
                            <td >`+Intl.NumberFormat('en-US').format(el[5])+`</td>
                            <td>`+el[4]+`</td>
                            <td>`+Intl.NumberFormat('en-US').format(el[6])+`</td>
                        </tr>
                        `;
                        sum+=el[5];
                    });
                    str+=`
                    <tr class="">
                        <td colspan='5' scope="row">Tổng tiền</td>
                        <td scope="row">`+Intl.NumberFormat('en-US').format(sum)+`</td>

                    </tr>
                    `
                    $("#cartressult").html(str);
                }
            }
        });
    }
}
