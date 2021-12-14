import { html, render } from "./node_modules/lit-html/lit-html.js";
import {mainViewTemplate} from './homeView.js'


const roomServiceTemplate =() =>html`     
     <div class="container text-center justify-content-center">  
        
      <div class="row col-sm-6 col-md-6 col-lg-3  text-center justify-content-center mx-auto">   
        <button type="button" class="btn btn-secondary my-2">Order</button>
        <button type="button" class="btn btn-secondary my-2">Menu</button>
        <button @click=${backToMenu} type="button" class="btn btn-secondary my-2">Back</button>
      </div>
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