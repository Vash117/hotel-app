import {html} from './node_modules/lit-html/lit-html.js'
import {buttonsObj,floors} from './app.js'
export const mainViewTemplate = () =>html`
<div @click=${findTarget} class="d-grid gap-2 col-sm-6 col-md-6 col-lg-3 mx-auto pt-5">
        <button class="btn btn-secondary" type="button">Floors</button>
        <button class="btn btn-secondary" type="button">New Guest</button>
        <button class="btn btn-secondary" type="button">Reservations</button>
        <button class="btn btn-secondary" type="button">Room Service</button>
        <button class="btn btn-secondary" type="button">Options</button>
      </div>
`

function findTarget(e){  
    if(e.target.tagName =='BUTTON'){
        let key = e.target.innerText.split(' ').join('')       
        buttonsObj[key](floors)
    }
}