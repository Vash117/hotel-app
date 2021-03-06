import { html, render } from "./node_modules/lit-html/lit-html.js";
import { floors, renderFloors, loadHome } from "./app.js";
import { roomForm } from "./AddRoom.js";
import { displayModal } from "./roomDetails.js";
import {setTotalPrice} from './roomDetails.js'
export const floorsTemplate = (addFloor, floors) => html`
  <div class="container">
    <button
      @click=${loadHome}
      type="button"
      class="btn-close float-end"
      aria-label="Close"
    ></button>
    <h1 class="text-center">All Floors</h1>
    <div
      @click=${addFloor}
      class="d-grid gap-2 col-sm-6 col-md-6 col-lg-3 mx-auto my-5 bg-secondary"
    >
      <button class="btn  btn-secondary" type="button">Create floor</button>
    </div>
    <div @click=${showRooms} id="floor-container" class="container">
      <div class="row text-center justify-content-center">
        ${floors ? floors.map((floor, i) => floorTemplate(floor, i)) : ""}
      </div>
    </div>
  </div>
`;
const floorTemplate = (floor, i) => html`
  <div class="col-sm-5 col-lg-5 bg-primary my-1">
    <div class="card">
      <div class="card-body">
        <button
          type="button"
          class="btn-close float-end bg-danger"
          aria-label="Close"
          data-id=${i}
        ></button>
        <h5 class="card-title">Floor: ${floor.floorNumber}</h5>
        <p class="card-text">rooms in floor: ${floor.rooms.length}</p>
        <button class="btn btn-secondary" data-id=${i}>Show floor</button>
      </div>
    </div>
  </div>
`;
export const curentFloorTemplate = (floor) => html`
  <div @click=${(e) => deleteRoom(e, floor)} class="container text-center my-3">
    <button
      @click=${closeFloor}
      type="button"
      class="btn-close float-end"
      aria-label="Close"
    ></button>
    <h1>Floor ${floor.floorNumber}</h1>
    <button @click=${(e) => roomForm(floor)} class="btn btn-success">
      Create room
    </button>
    <div class="row text-center justify-content-center">
      <!-- room details -->
      ${floor.rooms.length > 0
        ? floor.rooms.map((room) => roomTemplate(room ,floor.floorNumber-1))
        : ""}
    </div>
  </div>
`;
const roomTemplate = (room,floorNum) => html`
  <div class="col-lg-8 ${room.status ? "bg-success my-1" : "bg-danger"}">
    <div class="card">
      <div class="card-body">
        <button
          type="button"
          class="btn-close float-end bg-danger"
          aria-label="Close"
        ></button>
        <h5 class="card-title" data-id=${room.roomNumber}>
          Room ${room.roomNumber}
        </h5>
        <p class="card-text">${room.roomType}</p>
        <div class="accordion" id="accordionExample${room.roomNumber}">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo${room.roomNumber}">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo${room.roomNumber}"
                aria-expanded="false"
                aria-controls="collapseTwo${room.roomNumber}"
              >
                Room details
              </button>
            </h2>
            <div
              id="collapseTwo${room.roomNumber}"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo${room.roomNumber}"
              data-bs-parent="#accordionExample${room.roomNumber}"
            >
              <div class="accordion-body">
                <h5>Guest name: ${room.obj ? `${room.obj.name}` : "..."}</h5>
                <p>
                  Guest stay from ${room.obj ? `${room.obj.fromDate}` : "..."}
                  to ${room.obj ? `${room.obj.toDate}` : "..."}
                </p>
                <p class="total-price">Total price: ${room.obj ? `${setTotalPrice(room)}`:''}</p>
                <div class="card-footer">
                  <button @click=${(e) =>displayModal(e,room.roomNumber,floorNum)}  class="btn btn-secondary" type="button">
                    Details
                  </button>
                  <button @click=${(e) =>payBill(e,room.roomNumber,floorNum)} class="btn btn-success" type="button">Pay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
function showRooms(e) {
  if (e.target.tagName == "BUTTON" && e.target.innerText == "Show floor") {
    let index = e.target.dataset.id;
    let curentFloor = floors[index];
    let result = curentFloorTemplate(curentFloor);
    render(result, document.querySelector("main"));
  } else if (e.target.classList.contains("bg-danger")) {
    let confirmed = confirm("Are you sure you want to remove this floor?");
    if (confirmed) {
      let index = e.target.dataset.id;
      floors.splice(index, 1);
      reduceNuber(index);
      renderFloors(floors);
    }
  }
}

function closeFloor(e) {
  renderFloors(floors);
}

function deleteRoom(e, floor) {
  if (
    e.target.tagName == "BUTTON" &&
    e.target.classList.contains("bg-danger")
  ) {
    let confirmed = confirm("Are you sure you want to remove this room?");
    if (confirmed) {
      let index = e.target.parentNode.querySelector(".card-title").dataset.id;
      let curent = floor.rooms.find((room) => room.roomNumber == index);
      floor.rooms.splice(floor.rooms.indexOf(curent), 1);
      let result = curentFloorTemplate(floor);
      render(result, document.querySelector("main"));
    }
  }
}

function reduceNuber(index) {
  for (let i = index; i < floors.length; i++) {
    let curentFloor = floors[i];
    curentFloor.floorNumber--;
  }
}


 export function totalPrice(fromDate , todate, type){
  let multyplayer;
  if(type === 'single'){
    multyplayer = 30;
  }else if(type === 'double'){
    multyplayer = 40;
  }else{
    multyplayer = 50
  }
let from = convertToDays(fromDate);
let to = convertToDays(todate);
let result =Math.abs(from - to);
return result * multyplayer
}

export function convertToDays(str){
  let numArr =str.split('-').map(Number)
  let [years,months,days] = numArr;
  let totaldays = (years*365) + (months+30) + days;
  return totaldays
}


function payBill(e,roomId,floorNumber){
  const curentRoom =floors[floorNumber].rooms.find(room => room.roomNumber == roomId);
  let totalBill = e.target.parentNode.parentNode.querySelector('.total-price');
  let confirmed = confirm(`Pay total bill: ${totalBill.innerText.split(' ')[2]}`)
  if(confirmed){
     delete curentRoom.obj;
     curentRoom.service={}
     curentRoom.status = true;
     let result = curentFloorTemplate(floors[floorNumber]);
     render(result,document.querySelector('main'))
  }
}