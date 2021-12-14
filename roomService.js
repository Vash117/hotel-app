import { html, render } from "./node_modules/lit-html/lit-html.js";
import {mainViewTemplate} from './homeView.js'
import {roomServicemenu} from './app.js'

const roomServiceTemplate =() =>html`     
     <div class="container text-center justify-content-center">        
      <div class="row col-sm-6 col-md-6 col-lg-3  text-center justify-content-center mx-auto">   
        <button type="button" class="btn btn-secondary my-2">Order</button>
        <button @click=${displayMenu} type="button" class="btn btn-secondary my-2">Menu</button>
        <button @click=${backToMenu} type="button" class="btn btn-secondary my-2">Back</button>
      </div>
    </div>
`

const menuTemplate =(err='') => html`
      <div class="container text-center col-md-5">
        <button
          type="button"
          class="btn-close float-end"
          aria-label="Close"
          @click=${renderRoomservice}
        ></button>
        <form class="form-control">
          <legend>Add item in menu</legend>
          <div class="row">
          ${ err ? html`<p class="text-danger">${err}</p>`:''}
            <div class="col-9">            
              <input type="text" class="form-control" name="item" placeholder="Item Name" aria-label="First name">
            </div>
            <div class="col-3">            
              <input type="number" name="price" class="form-control" placeholder="Price" aria-label="Last name">
            </div>
          </div>
            <div class="my-3">
          <button @click=${ (e)=>displaMenuDetails(e)} type="button" class="btn btn-primary">Show Menu</button>
          <button @click=${ (e) =>addItem(e)} type="button" class="btn btn-primary">Add item in menu</button>
        </div>
        </form>
      </div> 
`

export function renderRoomservice(){
    let result = roomServiceTemplate();
    render(result,document.querySelector('main'))
}

function backToMenu(){
    let result = mainViewTemplate();
    render(result,document.querySelector('main'))
}

function displayMenu(){
    const result = menuTemplate();
    render(result , document.querySelector('main'))
};
function addItem(e){
e.preventDefault();
let form = e.target.parentNode.parentNode;
let formData = new FormData(form);
let itemName = formData.get('item');
let price =formData.get('price')

try{
    if(itemName =='' || price == ''){
        throw new Error('Invalid field or fields!!!')
    }
    roomServicemenu.push({itemName,price});  
    form.reset()
}catch(err){    
    render(menuTemplate(err), document.querySelector('main'))
}
}

function displaMenuDetails(e){
    e.preventDefault();
    console.log('here');
}