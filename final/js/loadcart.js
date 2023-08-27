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
                        <tr class="table-primary">
                            <td scope="row">`+(++index)+`</td>
                            <td ><img src="`+el[3]+`" style="width:100px !important;height: auto; " alt=""></td>
                            <td>`+el[1]+`</td>
                            <td >`+Intl.NumberFormat('en-US').format(el[5])+`</td>
                            <td ><input type="number" class="form-control editQty" data-id="`+el[0]+`" value="`+el[4]+`" min=0></td>
                            <td>`+Intl.NumberFormat('en-US').format(el[6])+`</td>
                        </tr>
                        `;
                        sum+=el[5];
                        
                    });
                    str+=`
                    <tr class="table-danger">
                        <td colspan='5' scope="row">Tổng tiền</td>
                        <td scope="row">`+Intl.NumberFormat('en-US').format(sum)+`</td>

                    </tr>
                    `
                    $("#cartressult").html(str);
                    changeQty();
                }
            }
        });
    }
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
