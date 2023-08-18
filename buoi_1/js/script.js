const arr = [];
function fun1(){
    var name=''
    name= document.getElementById("name").value;
    arr.push(name)  
    let str = ""
    arr.forEach(el=> {
        str += "<li>" + el
    })
     console.log(arr)
     console.log(str)
     const div = document.getElementsByClassName('show') 
     div[0].innerHTML = str
}
