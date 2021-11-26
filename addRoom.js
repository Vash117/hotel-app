import { html,render } from "./node_modules/lit-html/lit-html.js";
import { buttonsObj, addRoom } from "./app.js";

const roomFormTemplate = (allRooms,onsubmit,err = false) => html`
  <div class="row text-center justify-content-center">
      ${err ? html`<p class="text-danger">${err}</p>`:''}
    <div class="col-md-5 text-center justify-content-center">
      <form class="my-2">
        <label for="roomNumber">Room Number:</label>
        <input type="number" id ="roomNumber" name="roomNumber" placeholder="room number" .value=${allRooms+1} />
        <select class="form-control text-center col-md-3 my-2" id='roomType' name="roomType">
          <option value="none" selected>Choose room type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="vip">VIP</option>
        </select>
        <button  @click =${onsubmit} type="button" class="btn btn-primary my-2">
          Create and add room
        </button>
      </form>
    </div>
  </div>
`;

export function roomForm(floor) {
    let allRooms = floor.rooms.length    
  let result = roomFormTemplate(allRooms,onsubmit);
  render(result,document.querySelector('main'))
  function onsubmit(e){
    console.log('here');
      e.preventDefault();   
      let roomNumber= document.getElementById('roomNumber').value
      let roomType = document.getElementById('roomType').value
      try{
        if(roomNumber == '' || roomType == 'none'){
            throw new Error('All fields reqierd')
        }
        let room = {
            roomNumber,
            roomType
        }
            addRoom(floor,room)
      }catch(err){
          render(roomFormTemplate(allRooms,onsubmit,err),document.querySelector('main'))
      }
    }
}
