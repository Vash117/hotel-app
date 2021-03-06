import { html,render } from "./node_modules/lit-html/lit-html.js";
import { floors, roomServicemenu } from "./app.js";
import {renderRoomservice} from './roomService.js'
const orderTemplate = (rooms='') => html`
  <div class="container text-center col-md-5">
        <button
          type="button"
          class="btn-close float-end"
          aria-label="Close" 
          @click=${renderRoomservice}       
        ></button>
        <form  class="form-control">
          <label for="menu">Menu:</label>
          <select type="text" class="form-control" name="menu">
            <option selected>Select Item</option>
            ${roomServicemenu.map(item => html`<option data-id=${item.itemName}>${item.itemName}</option>`)}
          </select>
          <label for="floor">Floor:</label>
          <select           
            class="form-control"
            name="floor"
             @change=${(e) =>setRoomsOption(e)}
          >
          <option  selected>Select floor</option>
          ${floors.map(floor => html`<option data-id=${floor.floorNumber}>Floor ${floor.floorNumber}</option>`)}
          </select>
          <label for="room">Room:</label>
          <select class="form-control" id="rooms" name="room">
            <option selected>Select room</option>
           ${rooms ? rooms.map(room=>html`<option data-id=${room.roomNumber}>room ${room.roomNumber}</option>`):''}
          </select>
        
          <button @click=${(e)=>onSubmit(e)} type="button" class="btn btn-primary mt-2">
           Order
          </button>
        </form>
      </div>
`

export  function orderSetView(){
    let result = orderTemplate()
    render(result,document.querySelector('main'))    
}

function setRoomsOption(e){
 let id = e.target.options[e.target.options.selectedIndex].dataset.id
  let selected =floors.find(floor => floor.floorNumber == id)
  let filterdRooms = selected.rooms.filter(room=>room.status == false);
  let result = orderTemplate(filterdRooms)
  render(result,document.querySelector('main'))  
}

function onSubmit(e){
  e.preventDefault()
 let form =e.target.parentNode;
 let formData =new FormData(form);
 let item = formData.get('menu');
 let floor = formData.get('floor').split(' ')[1]
 let room = formData.get('room').split(' ')[1]
 let [date,time] = new Date().toLocaleString().split(', ')
 let curentFloor = floors.find(cfloor => cfloor.floorNumber == floor)
 let curentRoom = curentFloor.rooms.find(cRoom => cRoom.roomNumber == room)
 let cprice = roomServicemenu.find(itemMenu=> itemMenu.itemName == item)
let price = cprice.price
 let order ={
   item,
   time,
   price
 }
if(!curentRoom.service.hasOwnProperty(date)){
  curentRoom.service[date]= [];
}
curentRoom.service[date].push(order)
console.log(curentRoom);
console.log(order);
 } 