const inputBox =  document.querySelector(".input__box input"),
todoList = document.querySelector(".list__items ul"),
selectClr = document.querySelectorAll(".cat__details span"),
deletBtn = document.querySelector(".fi-rr-trash"),
addBtn = document.querySelector(".add__btn");
let dataClr = "#e74c3c";
inputBox.addEventListener("focus", show__cat);
function show__cat(){
    document.querySelector(".cat__details").classList.add("show");
    inputBox.addEventListener('blur',function(){
        document.querySelector(".cat__details").classList.remove("show");
    });
}
selectClr.forEach((item) => {
  item.addEventListener("click",function(){
      dataClr = String(this.dataset.color);
      console.log(dataClr);
    })
  })
    addBtn.onclick = ()=>{ 
        let userEnteredValue = inputBox.value; 
        let getLocalStorageData = localStorage.getItem("New Todo"); 
        if(getLocalStorageData == null){
          listArray = [];
        }else{
          listArray = JSON.parse(getLocalStorageData);
        }
        listArray.push([userEnteredValue,dataClr]);
        localStorage.setItem("New Todo", JSON.stringify(listArray));
        showTasks();
      }
      function showTasks(){
        let getLocalStorageData = localStorage.getItem("New Todo");
        if(getLocalStorageData == null){
          listArray = [];
        }else{
          listArray = JSON.parse(getLocalStorageData); 
        }
        let newLiTag = "";
        listArray.forEach((element, index) => {
          newLiTag += `<li>
          <input type="checkbox" name="" id="check__item${index}">
          <label for="check__item${index}">
              <div class="list__details">
                  <span class="check__box"></span>
                  <p>${element[0]}</p>
              </div>
              <div class="cat__type" style="background:${element[1]};"></div>
          </label>
          <i class="fi-rr-trash"  onclick="deleteTask(${index})"></i>
      </li>`;
        });
        todoList.innerHTML = newLiTag;
        inputBox.value = "";
      }
      function deleteTask(index){
        let getLocalStorageData = localStorage.getItem("New Todo");
        listArray = JSON.parse(getLocalStorageData);
        listArray.splice(index, 1);
        localStorage.setItem("New Todo", JSON.stringify(listArray));
        showTasks();
      }
  showTasks();