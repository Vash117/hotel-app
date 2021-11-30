import {html, render} from './node_modules/lit-html/lit-html.js';
import { loadHome } from './app.js';
const guestFormTemplate =()=>html`
 <div class="container text-center col-md-5">
 <button
        @click=${loadHome}
          type="button"
          class="btn-close float-end"
          aria-label="Close"
        ></button>
    <form class="form-control">
      <fieldset>
        <legend>New Guest</legend>
       
        <div  class="row form-control col-md-6">
        <label class="col-form-label" for="name">Guest name:</label>
        <input lass="form-control" type="text" name="name" placeholder="Full name">
      </div>
      <div  class="row form-control col-md-6">
        <label lass="col-form-label" for="egn">EGN</label>
        <input lass="form-control float-end" type="number" placeholder="e.g.8804124478">
      </div>
      <div class="row form-control col-md-6">
        <label for="sex">Sex</label>
        <select name="sex" >
          <option selected>Choose sex</option>
          <option value="male">Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <div class="row form-control col-md-6">
        <label for="info">Additional info</label>
        <textarea name="info" id="" cols="30" rows="3"></textarea>
      </div>
      </fieldset>
      <button class="btn btn-primary">Next</button>
    </form>
    </div>
`

export function renderNewGuest(){
    let result = guestFormTemplate();
    render(result ,document.querySelector('main'))
}