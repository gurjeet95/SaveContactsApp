firebase.initializeApp({
  databaseURL: "https://savecontacts-3879e.firebaseio.com"
})

const dbRef = firebase.database().ref('contacts');
const btn = document.getElementById('SaveContact');
btn.addEventListener('click', saveContact);
	dbRef.on('value',gotData);
	function gotData(data){
    const list =  document.querySelectorAll(".contact"); 
    for(let j=0;j<list.length;j++){
      let parent=list[j].parentNode;
      parent.removeChild(list[j]);
    }
		let contacts = data.val();
   if(contacts!=null){
		let keys = Object.keys(contacts);
	const ol = document.querySelector('ol');
	for(let i=0;i<keys.length;i++){
		let key= keys[i];
    const li = document.createElement('li');
    const textbox1= document.createElement("INPUT")
     textbox1.setAttribute("type", "text")
      textbox1.value = contacts[key].Name;
      const textbox2= document.createElement("INPUT")
     textbox2.setAttribute("type", "text")
      textbox2.value = contacts[key].PhoneNo;
      const textbox3= document.createElement("INPUT")
     textbox3.setAttribute("type", "text")
      textbox3.value = contacts[key].Email;
   const remove = document.createElement('button')
   remove.innerHTML = "Remove"
   const edit= document.createElement('button')
   edit.innerHTML = "Update";
   remove.setAttribute('id', key);
   edit.setAttribute('id', key);
    li.appendChild(textbox1);
   li.appendChild(textbox2);
   li.appendChild(textbox3);
   li.appendChild(edit);
   li.appendChild(remove);
   li.setAttribute('id', key);
   li.setAttribute('class', "contact");
   ol.appendChild(li);
  edit.addEventListener('click', update);
  remove.addEventListener('click',deleteContact);
		}
  }
}

function saveContact(){
    const name = document.getElementById('name').value;
    const phoneno =document.getElementById('phone').value;
    const email =document.getElementById('email').value;
    saveToDatabase(name,phoneno,email);
  }

function update(){
	let parent=this.parentNode;
	let key=this.getAttribute('id');
	let value1=parent.childNodes;
	const name = value1[0].value;
	const phone=value1[1].value;
	const email=value1[2].value;
	updateToDatabase(key,name,phone,email);
}

function deleteContact(){
	let key=this.getAttribute('id');
	dbRef.child(key).remove();
}


function saveToDatabase(name,phoneno,email){
  let contact= {
    'Name': name,
    'PhoneNo': phoneno,
     'Email': email
    }
    dbRef.push(contact);
}


function updateToDatabase(key,name,phone,email){
  dbRef.child(key).update(
        {
          'Name': name,
           'PhoneNo': phone,
            'Email': email
        }
    )
}