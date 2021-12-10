import { html, render } from "./node_modules/lit-html/lit-html.js";


const modaltemplate =() => html`
  <div class="container-fluid modal-holder">
  
        <div class="details-page">
        <button    
      type="button"
      class="btn-close float-end"
      aria-label="Close"
    ></button>
      <h2>Detais:</h2>
        <h3>Floor</h3>
        <h4>Room</h4>
        <h4>Name of custemor</h4>
      <ul>
        <ul>
        <li>Total days: 5</li>
        <li>Price for stay: 150 lv.</li>
      </ul>
      <ul>Room service details:
        <li>Date 2021-12-11:
          <ol>
            <li>13:57 : Chicken price: 7lv.</li>
            <li>13:57 : Chicken price: 7lv.</li>
            <p>total : 14lv</p>
          </ol>
        </li>
        <li>Date 2021-12-12:
          <ol>
            <li>13:57 : Chicken price: 7lv.</li>
            <li>13:57 : Chicken price: 7lv.</li>
            <p>total : 14lv</p>
          </ol>
        </li>
      </ul>
      </ul>
      <p>Total price: 178lv.</p>
    </div>
    </div>
`

export  function displayModal(){
    let result =modaltemplate();
    render(result,document.querySelector('main'))
}