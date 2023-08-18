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

$(document).ready(function () {

  login();
  test();
  todoSubmit();
  show();
  searchTodo()
});
function test() {
  $("#test").click(function (e) {
    e.preventDefault();
    alert("Chào bạn ! Bạn đang ở trang chủ rồi nha ông nội");
  });
}
function login() {
  $("#loginBtn").click(function (e) {
    e.preventDefault();
    if (localStorage.getItem("token")) {
        // alert("Bạn đã đăng nhập");
        // window.location.reload();
    } else {
      $("#LoginModal").modal("show");
      $("#submitLoginBtn").click(function (e) {
        e.preventDefault();
        var email = $("#email").val().trim();
        console.log(email);
        if (email == "") {
          alert("Chưa nhập email");
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
                console.log(res.apitoken);
                localStorage.setItem("token", res.apitoken);
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
                Toast.fire({
                  icon: "success",
                  title: "Signed in successfully",
                }).then(() => {
                  window.location.reload();
                });
              } else {
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
                Toast.fire({
                  icon: "error",
                  title: "Vui lòng nhập lại Email",
                }).then(() => {
                  window.location.reload();
                });
              }
            },
          });
        }
      });
    }
  });
}
function todoSubmit() {
  if (!localStorage.getItem("token") || localStorage.getItem("token") == null) {
    $("#themBtn").attr("disabled", "disabled");
  }
  $("#themBtn").click(function (e) {
    e.preventDefault();
    var todo = $("#todo").val().trim();
    if (todo == "") {
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
      Toast.fire({
        icon: "error",
        title: "Vui lòng nhập lại Todo",
      });
    } else {
      $.ajax({
        type: "post",
        url: "https://students.trungthanhweb.com/api/todo",
        data: {
          apitoken: localStorage.getItem('token'),
          todo: todo
        },
        dataType: "JSON",
        success: function (res) {
          if (res.check == true) {
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
            Toast.fire({
              icon: "success",
              title: "Đã thêm thành công",
            }).then(()=>{
              window.location.reload()
            })
            
          }
          
        },
      });
    }
  });
}
function show(){
    $("#todoTable").hide();
    if (localStorage.getItem('token')&&localStorage.getItem('token')!=null) {
        $.ajax({
            type: "get",
            url: "https://students.trungthanhweb.com/api/todo",
            data: {
                apitoken:localStorage.getItem('token')
            },
            dataType: "JSON",
            success: function (res) {
                const todo = res.todo;
                if (todo.length>0) {
                    var str = ``;
                    var count = 1;
                    todo.forEach((el,key) => {
                        str += `
                        <tr>
            <th scope="row">`+(count++)+`</th>
            <td><b class="todo">`+el.note+`</b></td>
            <td><input type="checkbox" class="finish"></td>
            <td>
              <div class="d-flex">
                <button class="btn-sm btn-warning editTodoBtn" data-id="`+el.id+`" data-key="`+key+`" data-value="`+el.note+`">Sửa</button>
                <button class="btn-sm btn-danger ms-3 deletebtn" data-id="`+el.id+`">Xoá</button>
              </div>
            </td>
          </tr>`;
                    });
                    $("#dataTable").html(str);
                    $("#todoTable").show();
                }
                deleteTodo();
                editTodo();
            }
        });
    }
}
function deleteTodo(){
    $('.deletebtn').click(function (e) { 
        e.preventDefault();
        var id = $(this).attr('data-id');
        Swal.fire({
            title: 'Bạn có muốn xoá không ?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Đúng',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                $.ajax({
                    type: "post",
                    url: "https://students.trungthanhweb.com/api/deletetodo",
                    data: {
                        id:id,
                        apitoken:localStorage.getItem('token')
                    },
                    dataType: "JSON",
                    success: function (res) {
                        if (res.check==true) {
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
                              Toast.fire({
                                icon: "success",
                                title: "Đã xoá thành công",
                              }).then(() => {
                                window.location.reload();
                              });
                        }
                    }
                });
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    });
};
function editTodo(){
 $(".editTodoBtn").click(function (e) { 
    e.preventDefault();
    var old = $(this).attr('data-value')
    var id = $(this).attr('data-id')
    $("#editTodo").val(old)
    $("#editModal").modal("show")
    $("#editBtn").click(function (e) { 
        e.preventDefault();

        var todo = $("#editTodo").val().trim();
        if (todo =='') {
            Toast.fire({
                icon: "error",
                title: "Vui Lòng nhập Todo",
              })
        }
        if (todo ==old) {
            
              Toast.fire({
                icon: "error",
                title: "Vui lòng nhập lại Todo",
              });
        } else {
            $.ajax({
                type: "post",
                url: "https://students.trungthanhweb.com/api/updatetodo",
                data: {
                    apitoken:localStorage.getItem('token'),
                    todo:todo,
                    id:id,
                },
                dataType: "JSON",
                success: function (res) {
                    if (res.check==true) {
                        Toast.fire({
                            icon: "success",
                            title: "Thay đổi thành công",
                          }).then(()=>{
                            window.location.reload()
                          })
                    }
                }
            });
        }
    });
 });
};
function searchTodo(){
  $('#searchTodo').keyup(function (e) { 
    var todo = $(this).val().trim();
    if (todo==0) {
      show();
    } else {
      $.ajax({
        type: "post",
        url: "https://students.trungthanhweb.com/api/searchtodo",
        data: {
          apitoken:localStorage.getItem('token'),
          todo:todo
        },
        dataType: "JSON",
        success: function (res) {
  
  
              const todo = res.todo;
              if (todo.length>0) {
                  var str = ``;
                  var count = 1;
                  todo.forEach((el,key) => {
                      str += `
                      <tr>
          <th scope="row">`+(count++)+`</th>
          <td><b class="todo">`+el.note+`</b></td>
          <td><input type="checkbox" class="finish"></td>
          <td>
            <div class="d-flex">
              <button class="btn-sm btn-warning editTodoBtn" data-id="`+el.id+`" data-key="`+key+`" data-value="`+el.note+`">Sửa</button>
              <button class="btn-sm btn-danger ms-3 deletebtn" data-id="`+el.id+`">Xoá</button>
            </div>
          </td>
        </tr>`;
                  });
                  $("#dataTable").html(str);
                  $("#todoTable").show();
              }
  
  
        }
      });
    }
  });
};