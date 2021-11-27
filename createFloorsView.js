import { html, render } from "./node_modules/lit-html/lit-html.js";
import { floors, renderFloors ,loadHome} from "./app.js";
import { roomForm } from "./AddRoom.js";

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
        <h5 class="card-title">Floor: ${floor.floorNumber}</h5>
        <p class="card-text">rooms in floor: ${floor.rooms.length}</p>
        <button class="btn btn-secondary" data-id=${i}>Show floor</button>
      </div>
    </div>
  </div>
`;
export const curentFloorTemplate = (floor) => html`
  <div @click=${e =>deleteRoom(e,floor)} class="container text-center my-3">
    <button
    @click=${closeFloor}
      type="button"
      class="btn-close float-end"
      aria-label="Close"
    ></button>
    <h1>Floor ${ floor.floorNumber}</h1>
    <button @click=${(e) => roomForm(floor)} class="btn btn-success">
      Create room
    </button>
    <div class="row text-center justify-content-center">
      <!-- room details -->
      ${floor.rooms.length > 0
        ? floor.rooms.map((room) => roomTemplate(room))
        : ""}
    </div>
  </div>
`;
const roomTemplate = (room) => html`
  <div class="col-lg-8 ${room.status ? 'bg-success my-1' : 'bg-danger'}">
    <div class="card">
      <div class="card-body">
        <button
          type="button"
          class="btn-close float-end bg-danger"
          aria-label="Close"
        ></button>
        <h5 class="card-title">Room ${room.roomNumber}</h5>
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
                <h5>Guest name</h5>
                <p>Guest stay from... to...</p>
                <p>Total price</p>
                <div class="card-footer">
                  <button class="btn btn-secondary" type="button">
                    Details
                  </button>
                  <button class="btn btn-success" type="button">Pay</button>
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
  let index = e.target.dataset.id;
  let curentFloor = floors[index];
  let result = curentFloorTemplate(curentFloor);
  render(result, document.querySelector("main"));
}

function closeFloor(e){
    renderFloors(floors)
}
//TODO fix bug with incorrect index
function deleteRoom(e,floor){
  if(e.target.tagName == 'BUTTON' && e.target.classList.contains('bg-danger')){
    let confirmed = confirm('Are you sure you want to remove this room?')
    if(confirmed){
    let index = e.target.parentNode.querySelector('.card-title').innerText.split(' ')[1]
    index=Number(index) - 1
    floor.rooms.splice(index,1)
    
    let result = curentFloorTemplate(floor);
    render(result, document.querySelector("main"));
    }
    
  }
}