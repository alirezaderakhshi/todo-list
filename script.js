var myNodelist = document.getElementsByTagName("li");
var i;
var count=0;
//cookie items will be a pair of id/task and 
//a pair of id/state(checked or unchecked)
//and variable named count to save number of added items so far
if(document.cookie != ""){
  let cookie = document.cookie;
  let key="";
  let value="";
  cookie = cookie.trim();
  let data = cookie.split(";");
  data.forEach(element => {
    element = element.trim();
    key = element.split("=")[0];
    value = element.split("=")[1];
    if(key == "count"){
      count = Number(value);
    }
  })
}

function addTask() {
  let inputValue = document.getElementById("myInput").value;
  let li = document.createElement("li");
  if (inputValue === '') {
    alert("You must write something!");
    return;
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";
  count++;
  li.id = count;
  let id = li.id;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  let state = "unchecked";
  newTaskSetAttributes(id,li,state)
  //***************************** */
  document.cookie = id + "=" + inputValue;
  document.cookie = `state_${id}=${state}`;
  document.cookie = `count=${count}`;
}

function newTaskSetAttributes(id,li,state){
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.setAttribute("onclick",`removeClosedTask(${id})`);
  span.appendChild(txt);
  li.appendChild(span);
  li.setAttribute("onclick",`toggleReadOrUnread(${id})`);
  li.className = state;
}

var reloadData = function(){
  let name ="";
  let value="";
  let id="";
  let state="";
  let task=""
  let li;
  if(document.cookie == ""){
    return;
  }
  let cookie = document.cookie;
  cookie = cookie.trim();
  data = cookie.split(";");
  //reads cookie and reloads all tasks
  data.forEach(element => {
    element = element.trim();
    name = element.split("=")[0];
    value = element.split("=")[1];
    if(!name.startsWith("state") && name!="count"){
      id = name;
      task = value;
      li = document.createElement("li");
      let txt = document.createTextNode(task);
      li.appendChild(txt);
      li.id = id;
      document.getElementById("myUL").appendChild(li);
    }
  })
  //reads cookie and reloads task attributes and state
  data.forEach(element => {
    element = element.trim();
    name = element.split("=")[0];
    value = element.split("=")[1];
    if(name.startsWith("state_")){
      name = name.trim();
      name = name.substr(6);
      id = name;
      state = value;
      li = document.getElementById(`${id}`);
      newTaskSetAttributes(id,li,state);
    }
  })

}


var removeClosedTask = function(id){
  let closedItem = document.getElementById(`${id}`);
  closedItem.style.display = "none";
  deleteCookie(id);
}

//searches in cookies to find the cookie's name equals to 
//parameter of the function, id. 
//then deletes cookie 
function deleteCookie(id){
  let cookie = document.cookie;
  cookie = cookie.trim();
  data = cookie.split(";");
  data.forEach(element => {
    element = element.trim();
    let cookiesName = element.split("=")[0];
    if(cookiesName == id){
      document.cookie = cookiesName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = "state_"+ cookiesName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  })
}


var toggleReadOrUnread = function(id) {
    let state="";
    let cookie = document.cookie;
    cookie = cookie.trim();
    data = cookie.split(";");
    data.forEach(element => {
      element = element.trim();
      let name = element.split("=")[0];
      let value = element.split("=")[1];
      if(name.startsWith("state")){
        name = name.trim();
        name = name.substr(6);
        if(name == id){
          state = value;
        }
      }
    })
    var list = document.getElementById(id);
    if(state == "unchecked"){
        list.className = "checked";
        document.cookie = `state_${id}=checked`;
    }
    else if(state == "checked"){
        list.className = "unchecked";
        document.cookie = `state_${id}=unchecked`;
    }
}


var removeAllItems = function(){
  document.getElementById("myUL").innerHTML = "";
  //*************************** */
  let cookie = document.cookie;
  cookie = cookie.trim();
  data = cookie.split(";");
  data.forEach(element => {
    element = element.trim();
    let cookiesName = element.split("=")[0];
    document.cookie = cookiesName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  })
}



