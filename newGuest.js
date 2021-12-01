import {html, render} from './node_modules/lit-html/lit-html.js';
import { loadHome ,clientDatabase} from './app.js';

const guestFormTemplate =(onSubmit , change ,invalid =false , sugest = '')=>html`
 <div class="container text-center col-md-5">
 <button
        @click=${loadHome}
          type="button"
          class="btn-close float-end"
          aria-label="Close"
        ></button>
    <form @submit=${onSubmit} class="form-control">
      <fieldset>
        <legend>New Guest</legend>
       ${invalid ? html`<p class='text-danger'>All fields reqierd!</p>`:''}
        <div  class="row form-control col-md-6">
        <label class="col-form-label" for="name">Guest name:</label>
        <input lass="form-control" type="text" name="name" placeholder="Full name">
      </div>
      <div  class="row form-control col-md-6">
        <label lass="col-form-label" for="egn">EGN</label>
        <input @blur =${e => change(e)} class="form-control float-end" name='egn' type="number" placeholder="e.g.8804124478">
      </div>
      <div class="row form-control col-md-6">
        <label for="sex">Sex</label>
        <select name="sex" >
      <option selected>Choose sex</option>
          ${sugest == 'male' ? html` <option value="male" selected>Male</option>`:html` <option value="male">Male</option>`}
          ${sugest == 'female' ? html`<option value='female' selected>Female</option>`:html`<option value='female'>Female</option>`}
          <option value='other'>Other</option>
        </select>
      </div>
      <div class="row form-control col-md-6">
        <label for="info">Additional info</label>
        <textarea name="info" cols="30" rows="3"></textarea>
      </div>
      </fieldset>
      <button class="btn btn-primary">Add to database</button>
      <button @click=${AddToRoom} class="btn btn-primary">Add to room</button>
    </form>
    </div>
`
const addToRoomTemplate = ()=>html`

`
export function renderNewGuest(){
    let result = guestFormTemplate(onSubmit,change);
    render(result ,document.querySelector('main'))
    function onSubmit(e){
      e.preventDefault();
      let formData = new FormData(e.target)
      let name = formData.get('name');
      let egn = formData.get('egn');
      let sex = formData.get('sex');
      let info =formData.get('info');     
      if( name == '' || egn == ''){
       return  render(guestFormTemplate(onSubmit,change,true) ,document.querySelector('main'))
      };
     let newCustemor ={
       name,
       egn,
       sex,
       info,
     }
     newCustemor.id = clientDatabase.length +1
     clientDatabase.push(newCustemor)  
     displayAddToRoomTempalte(newCustemor)
      }
    function change(e){
      let num = e.target.value
      if(Number(num[num.length -2]) % 2 === 0){      
        render(guestFormTemplate(onSubmit,change,false ,'male') ,document.querySelector('main'))
      } else{       
        render(guestFormTemplate(onSubmit,change,false ,'female') ,document.querySelector('main'))
      }
    }
}

function AddToRoom(e){
  e.preventDefault();
  displayAddToRoomTempalte()
}

function displayAddToRoomTempalte(guest= ''){

}