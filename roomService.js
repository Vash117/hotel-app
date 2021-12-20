import { html, render } from "./node_modules/lit-html/lit-html.js";
import {mainViewTemplate} from './homeView.js'
import {roomServicemenu} from './app.js'
import { orderSetView} from './order.js'
const roomServiceTemplate =() =>html`     
     <div class="container text-center justify-content-center">        
      <div class="row col-sm-6 col-md-6 col-lg-3  text-center justify-content-center mx-auto">   
        <button @click=${orderSetView} type="button" class="btn btn-secondary my-2">Order</button>
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

const tebleMenuTemplate= ()=>html`
<div @click=${(e) =>targetButton(e)} class="container text-center">        
      <table class="table table-striped table-hover">
       <thead>
        Menu
       </thead>
       <tr>
         <th class="col-1">#</th>
         <th class="col-5">NAME</th>
         <th class="col-4">PRICE</th>
         <th class="col-1"></th>
         <th class="col-1"></th>
       </tr>
       <tbody >
         ${roomServicemenu.map((item,i)=>rowTemplate(item,i))}
       </tbody>
      </table>       
      <button type="button" class="btn btn-secondary">Back</button>
    </div>
`

const rowTemplate = (item,i) =>html`
<tr>
          <td class="col-1">${i + 1}</td>
          <td class="col-5">${item.itemName}</td>
          <td class="col-4">${item.price}lv.</td>
          <td class="col-1 bg-primary"><button class="btn text-white">Edit</button> </td>
          <td class="col-1 bg-danger"><button class="btn text-white">Delete</button></td>
         </tr>         
`
function displaMenuDetails(e){
    e.preventDefault();
   let result = tebleMenuTemplate();
   render(result,document.querySelector('main'))
}

function targetButton(e){
    e.preventDefault();
   if(e.target.tagName === 'BUTTON'){
       if(e.target.innerText === 'Edit'){
             let index =Number(e.target.parentNode.parentNode.querySelector('td').innerText) - 1;
        editItem(index)
       }else if(e.target.innerText == 'Delete'){
           let index =Number(e.target.parentNode.parentNode.querySelector('td').innerText) - 1;
           removeItem(index)
       }else if(e.target.innerText === 'Back'){
        displayMenu()
       }
   }
}

function removeItem(index){
    let confirmed = confirm('Are you sure you want to delete this item');
    if(confirmed){
    roomServicemenu.splice(index,1);
    render(tebleMenuTemplate(),document.querySelector('main'))
    }
}


const editTemplate =(item,index,err='') =>html`
<div class="container text-center col-md-5">
        <button
          type="button"
          class="btn-close float-end"
          aria-label="Close"
          @click=${tebleMenuTemplate}
        ></button>
        <form class="form-control">
          <legend>Edit item:</legend>
          <div class="row">
          ${ err ? html`<p class="text-danger">${err}</p>`:''}
            <div class="col-9">            
              <input type="text" class="form-control" name="item"  placeholder="Item Name" .value=${item.itemName}/>
            </div>
            <div class="col-3">            
              <input type="number" name="price" class="form-control" placeholder="Price" .value=${item.price}/>
            </div>
          </div>
            <div class="my-3">
          <button @click=${ (e)=>displaMenuDetails(e)} type="button" class="btn btn-primary">Cancel</button>
          <button @click=${ (e) =>addEditedItem(e)} data-id=${index} type="button" class="btn btn-primary">Edit Item</button>
        </div>
        </form>
      </div> 
`

function editItem(index){
 let curentItem = roomServicemenu[index]; 
 let result = editTemplate(curentItem,index);
 render(result,document.querySelector('main'))
 
 
}

function addEditedItem(e){
    e.preventDefault();
    let curentItem = roomServicemenu[e.target.dataset.id]
    let index = e.target.dataset.id;
    roomServicemenu.splice(index,1);
    let form = e.target.parentNode.parentNode;
    let formdata= new FormData(form)
    let itemName = formdata.get('item');
    let price =formdata.get('price')
    try{
        if(itemName =='' || price == ''){
            throw new Error('Invalid field or fields!!!')
        }
        roomServicemenu.splice(index,1,{itemName,price});  
       render(tebleMenuTemplate(),document.querySelector('main'))
    }catch(err){    
        render(editTemplate(curentItem,index,err.massage), document.querySelector('main'))
    }
    }
