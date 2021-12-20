import { html,render } from "./node_modules/lit-html/lit-html.js";
import { floors, roomServicemenu } from "./app.js";

const orderTemplate = () => html`
  <div class="container text-center col-md-5">
        <button
          type="button"
          class="btn-close float-end"
          aria-label="Close"        
        ></button>
        <form class="form-control">
          <label for="menu">Menu:</label>
          <select type="text" class="form-control" name="menu">
            <option selected>Select Item</option>
            ${roomServicemenu.map(item => html`<option>${item.itemName}</option>`)}
          </select>
          <label for="floor">Floor:</label>
          <select           
            class="form-control"
            name="floor"
          >
          <option selected>Select floor</option>
          ${floors.map(floor => html`<option data-id=${floor.floorNumber}>Floor ${floor.floorNumber}</option>`)}
          </select>
          <label for="room">Room:</label>
          <select class="form-control" id="rooms" name="room">
            <option selected>Select room</option>
           
          </select>
        
          <button type="button" class="btn btn-primary mt-2">
           Order
          </button>
        </form>
      </div>
`

export  function orderSetView(){
    let result = orderTemplate()
    render(result,document.querySelector('main'))    
}