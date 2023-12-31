const btn = document.getElementById("btn");
const name = document.getElementById("name");
const age = document.getElementById("age");
const car = document.getElementById("car");
const desc = document.getElementById("description");
const tbody = document.getElementById("tbody");

function validate() {
  if (!name.value) {
    name.focus();
    name.style.outlineColor = "red";
    return false;
  } else {
    name.style.outlineColor = "Green";
  }

  if (!age.value) {
    age.focus();
    age.style.outlineColor = "red";
    return false;
  } else {
    age.style.outlineColor = "Green";
  }
  if (age.value <= 0 || age.value >= 150) {
    alert("Kechirasiz  bunday yosh kiritish  mumkin emas !!!");
    age.focus();
    return false;
  }
  if (!Number(age.value)) {
    alert("Yosh raqamda kiritilishi kerak !!!");
    age.focus();
    age.style.outlineColor = "red";
    return false;
  } else {
    age.style.outlineColor = "Green";
  }
  if (!car.value) {
    car.focus();
    alert("Mashinani Tanlang");
    return false;
  }
  if (!desc.value) {
    desc.focus();
    desc.style.outlineColor = "red";
    return false;
  } else {
    desc.style.outlineColor = "Green";
  }

  return true;
}

function clear() {
  name.value = "";
  age.value = "";
  desc.value = "";
  car.value = "";
}
function createRow(user, index) {
  return `
  <tr>
              <td>${index}</td>
              <td>${user.name}</td>
              <td>${user.age}</td>
              <td>${user.car}</td>
              <td>${user.desc}</td>
              <td>
              <span class = "update"> <img src="./img/update.png" width="30px'  alt=""></span>
     <span data-id = "item_${user.id}" class = "delate">  <img src="./img/delate.png" width  =" 30px' alt=""></span>
              </td>
   </tr> 
  `;
}
btn &&
  btn.addEventListener("click", function () {
    if (validate()) {
      const user = {
        id: Date.now(),
        name: name.value,
        age: age.value,
        desc: desc.value,
        car: car.value,
      };
      let dataLocalStorage = [];
      if (localStorage.getItem("users")) {
        dataLocalStorage = JSON.parse(localStorage.getItem("users"));
      }

      dataLocalStorage.push(user);
      localStorage.setItem("users", JSON.stringify(dataLocalStorage));
      const tr = createRow(user, dataLocalStorage.length);
      tbody.innerHTML += tr;
      clear();
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  let data = [];
  if (localStorage.getItem("users")) {
    data = JSON.parse(localStorage.getItem("users"));
  }
  if (data.length && tbody) {
    data.forEach((element, index) => {
      const tr = createRow(element, index + 1);
      tbody.innerHTML += tr;
    });
    const delateButtons = document.querySelectorAll("span.delate");
    if(delateButtons.length){
      delateButtons.forEach((btn) => {
        btn.addEventListener("click",function(){
              const elId = this.getAttribute('data-id').slice(5);
            if(elId){
              let isDelate = confirm("Rostdan ham o'chirmoqchimisz");
              if(isDelate){
                data = data.filter(el =>{
                  return el.id != elId
                })
                localStorage.setItem('users',JSON.stringify(data))
                window.location.reload()
              }
            }
        })
      })
    }
  }
});
