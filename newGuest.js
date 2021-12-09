import {html, render} from './node_modules/lit-html/lit-html.js';
import { loadHome ,clientDatabase,floors} from './app.js';

const guestFormTemplate =(onSubmit , change ,invalid =false , sugest = '')=>html`
 <div class="container text-center col-md-5">
 <button
        @click=${loadHome}
          type="button"
          class="btn-close float-end"
          aria-label="Close"
        ></button>
    <form @submit=${onSubmit} class="form-control">
      <fieldset>
        <legend>New Guest</legend>
       ${invalid ? html`<p class='text-danger'>All fields reqierd!</p>`:''}
        <div  class="row form-control col-md-6">
        <label class="col-form-label" for="name">Guest name:</label>
        <input lass="form-control" type="text" name="name" placeholder="Full name">
      </div>
      <div  class="row form-control col-md-6">
        <label lass="col-form-label" for="egn">EGN</label>
        <input @blur =${e => change(e)} class="form-control float-end" name='egn' type="number" placeholder="e.g.8804124478">
      </div>
      <div class="row form-control col-md-6">
        <label for="sex">Sex</label>
        <select name="sex" >
      <option selected>Choose sex</option>
          ${sugest == 'male' ? html` <option value="male" selected>Male</option>`:html` <option value="male">Male</option>`}
          ${sugest == 'female' ? html`<option value='female' selected>Female</option>`:html`<option value='female'>Female</option>`}
          <option value='other'>Other</option>
        </select>
      </div>
      <div class="row form-control col-md-6">
        <label for="info">Additional info</label>
        <textarea name="info" cols="30" rows="3"></textarea>
      </div>
      </fieldset>
      <button class="btn btn-primary">Add to database</button>
      <button @click=${AddToRoom} class="btn btn-primary">Add to room</button>
    </form>
    </div>
`
const addToRoomTemplate = (guest ,floorRooms,onAddingInRoom)=>html`
 <div class="container text-center col-md-5">
      <button    
        type="button"
        class="btn-close float-end"
        aria-label="Close"
        @click =${renderNewGuest}
      ></button>
      <form  class="form-control">
        <label for="guest">Guest:</label>
        <select class="form-control" name="guest">          
          <option selected>${guest.name}</option>
          ${clientDatabase.map(client => optionCreatorTemplate(client))}
        </select>
        <label for="floor">Floor:</label>
        <select @change=${ (e)=>optionRoomCreate(e)} class="form-control" name="floor">          
          ${floors.map(floor => makeFloorOptionsTemplate(floor))}          
        </select>
        <label for="room">Room:</label>
        <select class="form-control" id="rooms"name="room">          
          ${floorRooms.map(room => makeRoomOptions(room))}
        </select>
        <button @click=${onAddingInRoom} type="button" class="btn btn-primary" >Add in room</button>
        </form>
     </div>
`
export function renderNewGuest(){
    let result = guestFormTemplate(onSubmit,change);
    render(result ,document.querySelector('main'))
    function onSubmit(e){
      e.preventDefault();
      let formData = new FormData(e.target)
      let name = formData.get('name');
      let egn = formData.get('egn');
      let sex = formData.get('sex');
      let info =formData.get('info');     
      if( name == '' || egn == ''){
       return  render(guestFormTemplate(onSubmit,change,true) ,document.querySelector('main'))
      };
     let newCustemor ={
       name,
       egn,
       sex,
       info,
     }
     newCustemor.id = clientDatabase.length +1
     clientDatabase.push(newCustemor)  
     displayAddToRoomTempalte(newCustemor)
      }
    function change(e){
      let num = e.target.value
      if(Number(num[num.length -2]) % 2 === 0){      
        render(guestFormTemplate(onSubmit,change,false ,'male') ,document.querySelector('main'))
      } else{       
        render(guestFormTemplate(onSubmit,change,false ,'female') ,document.querySelector('main'))
      }
    }
}

const optionCreatorTemplate =(client) =>html`
<option>${client.name}</option>
`

const makeFloorOptionsTemplate= (floor) =>html`
<option data-id=${floor.floorNumber}>Floor ${floor.floorNumber}</option>
`
  
function optionRoomCreate(e){
 let id = e.target.options[e.target.options.selectedIndex].dataset.id;
 const curentSelectedFloor = floors.find(floor => floor.floorNumber == id);
 let result = curentSelectedFloor.rooms.map(room =>makeRoomOptions(room));
 render(result, document.getElementById('rooms'))
}
const makeRoomOptions = (room) =>html`
<option data-roomId=${room.roomNumber}>Room ${room.roomNumber}</option>
`
function AddToRoom(e){
  e.preventDefault();
  displayAddToRoomTempalte()
}

function displayAddToRoomTempalte(guest= '',floorRooms = floors[0].rooms){
let result = addToRoomTemplate(guest , floorRooms,onAddingInRoom)
render(result ,document.querySelector("main"))


function onAddingInRoom(e){
 
  console.log('here')
}

}
