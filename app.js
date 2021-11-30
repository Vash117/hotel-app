import { render } from "./node_modules/lit-html/lit-html.js";
import { mainViewTemplate } from "./homeView.js";
import { floorsTemplate, curentFloorTemplate } from "./createFloorsView.js";
import {renderNewGuest} from './newGuest.js'
window.addEventListener("load", loadHome);

export const buttonsObj = {
  Floors: renderFloors,
  NewGuest: renderNewGuest,
};
export const floors = [];
export function loadHome() {
  let result = mainViewTemplate();
  render(result, document.querySelector("main"));
}

export function renderFloors(floors = undefined) {
  let result = floorsTemplate(addFloor, floors);
  render(result, document.querySelector("main"));
}

function addFloor() {
  let floor = {
    floorNumber: floors.length + 1,
    rooms: [],
  };
  floors.push(floor);
  renderFloors(floors);
}
export function addRoom(floor,room) {
  room.status = true
  floor.rooms.push(room);
  floor.rooms.sort((a,b) => a.roomNumber - b.roomNumber)
  let result = curentFloorTemplate(floor);
  render(result, document.querySelector("main"));
}

