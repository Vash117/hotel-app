import { html, render } from "./node_modules/lit-html/lit-html.js";
import { floors ,roomServicemenu} from "./app.js";
import {
  totalPrice,
  convertToDays,
  curentFloorTemplate,
} from "./createFloorsView.js";

const modaltemplate = (room, floorNumber) => html`
  <div class="container-fluid modal-holder">
    <div class="details-page">
      <button
        type="button"
        class="btn-close float-end"
        aria-label="Close"
        @click=${() => closeModal(floorNumber)}
      ></button>
      <h2>Detais:</h2>
      <h3>Floor ${floorNumber + 1}</h3>
      <h4>Room ${room.roomNumber}</h4>
      <h4>Name of custemor: ${room.obj.name}</h4>
      <ul>
        <ul>
          <li>
            Total days:
            ${Math.abs(
              convertToDays(room.obj.fromDate) - convertToDays(room.obj.toDate)
            )}
          </li>
          <li>
            Price for stay:
            ${totalPrice(room.obj.fromDate, room.obj.toDate, room.roomType)} lv.
          </li>
        </ul>
        <ul>
          Room service details:
         ${Object.keys(room.service).map(date=>listTemplate(room,date))}
           
        </ul>
      </ul>
      <p >Total price: ${setTotalPrice(room)}lv.</p>
    </div>
  </div>
`;
const listTemplate =(room,date)=>html`
<li>
  Date ${date}:
  <ol>
    ${room.service[date].map(order =>html`<li>${order.time} : ${order.item} : ${order.price}lv</li>`)}
    
    <p style="text-decoration: underline;">Total room service price for the day : ${room.service[date].reduce((acc,item)=> acc +Number(item.price),0 )}lv</p>
  </ol>
</li>
`
export function displayModal(e, id, floorNumber) {
  try {
    const curentRoom = floors[floorNumber].rooms.find(
      (room) => room.roomNumber == id
    );
    if (!curentRoom.obj) {
      throw new Error("Room is free!!");
    }

    let result = modaltemplate(curentRoom, floorNumber);
    render(result, document.querySelector("main"));
  } catch (err) {
    alert(err.message);
  }
}
function closeModal(curentFloor) {
  let result = curentFloorTemplate(floors[curentFloor]);
  render(result, document.querySelector("main"));
}

// make total price for room service
function setTotalPrice(room){
let priceForStay = totalPrice(room.obj.fromDate, room.obj.toDate, room.roomType);
let priceforService =0;

return priceForStay + priceforService
}