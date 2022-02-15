const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function () {
  links.classList.toggle('show-links');
})

const clearFile = (type) => {
  const file = type === 'single' ? document.getElementById('archivo') : document.getElementById('archivos');
  file.value = "";
};

// ----- ↓
const fetchData = async () => {
  try {
    const res = await fetch(`https://clase-08-parionaventurajuliocesar.glitch.me/api/products`); // Obtiene la data desde la API.
    const data = await res.json(); // Parsea la data.
    renderPage(data.result) // Renderiza las secciones dinamicamnte.
  } catch (error) {
    console.error(error);
  }
}
fetchData();

const fragment = document.createDocumentFragment();

const renderPage = (data) => {
  const main = document.querySelector(`#main`);
  const pageGetAll = document.querySelector(`#page-getall`);
  const pageGetOne = document.querySelector(`#page-getone`);
  const pageSave = document.querySelector(`#page-save`);
  const pageUpdate = document.querySelector(`#page-update`);
  const pageDelete = document.querySelector(`#page-delete`);
  pageGetAll.addEventListener(`click`, () => {
    main.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div><h3 style="text-align: center; margin-top: 16px;"> Ver todos los productos </h3></div>
      <form action="/api/products" method="get">
        <div style="display: flex; justify-content: center; align-items: center;">
          <input type="submit" value="Ver Todos los productos" class="submit-button">
        </div>
      </form>
    </div>
    `
  })
  pageGetOne.addEventListener(`click`, () => {
    main.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div><h3 style="text-align: center; margin-top: 16px;"> Busca un producto </h3></div>
      <form action="/api/products" method="get">
        <div style="margin-bottom: 16px;">
          <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <label for="getOne-input"> Ingresa el ID a buscar: </label>
            <br>
            <input type="number" name="id" id="getOne-input" style="margin-bottom: 16px;" class="input-file">
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <input type="submit" value="Buscar" class="submit-button">
          </div>
        </div>
      </form>
    </div>
    `
  })
  pageSave.addEventListener(`click`, () => {
    main.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div><h3 style="text-align: center; margin-top: 16px;"> Agrega un producto </h3></div>
      <form action="/api/products" method="post">
        <div style="margin-bottom: 16px;">
          <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <label for="nombre"> Nombre: </label>
            <br>
            <input type="text" name="title" id="nombre" style="margin-bottom: 16px;" class="input-file">
          </div>
          <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <label for="precio"> Precio: </label>
            <br>
            <input type="number" name="price" id="precio" style="margin-bottom: 16px;" step=".01" class="input-file">
          </div>
          <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <label for="imagen"> URL Imagen: </label>
            <br>
            <input type="text" name="thumbnail" id="imagen" style="margin-bottom: 16px;" class="input-file">
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <input type="submit" value="Crear producto" class="submit-button">
          </div>
        </div>
      </form>
    </div>
    `
  })
  pageUpdate.addEventListener(`click`, () => {
    main.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div><h3 style="text-align: center; margin-top: 16px;"> Actualiza un producto </h3></div>
      <form action="/api/products" method="put" id="update-form">
        <div id="update-buttons" style="display:flex; flex-wrap: wrap; justify-content: center;">
          <p style="display: block; width: 100%; text-align: center;">Elige un ID</p>
        </div>
        <div style="margin-bottom: 16px;">
          <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <label for="nombre"> Nombre: </label>
            <br>
            <input type="text" name="title" id="nombre" style="margin-bottom: 16px;" class="input-file">
          </div>
          <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <label for="precio"> Precio: </label>
            <br>
            <input type="number" name="price" id="precio" style="margin-bottom: 16px;" step=".01" class="input-file">
          </div>
          <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <label for="imagen"> URL Imagen: </label>
            <br>
            <input type="text" name="thumbnail" id="imagen" style="margin-bottom: 16px;" class="input-file">
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <input type="submit" value="Actualizar producto" class="submit-button" id="update-button" disabled>
          </div>
        </div>
      </form>
    </div>
    `
    renderButtonsUpdate(data); // Renderiza los botones de la sección "Update".
  })
  pageDelete.addEventListener(`click`, () => {
    main.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div><h3 style="text-align: center; margin-top: 16px;"> Elimina un producto </h3></div>
      <form action="/api/products" method="delete" id="product-form">
        <div id="update-buttons" style="display:flex; flex-wrap: wrap; justify-content: center;">
          <p style="display: block; width: 100%; text-align: center;">Elige un ID</p>
        </div>
        <div style="margin-bottom: 16px; display:flex;" id="product-content"></div>
      </form>
    </div>
    `
    renderButtonsDelete(data);  // Renderiza los botones de la sección "Delete".
  })
}

const renderButtonsUpdate = (data) => {
  const updateButtons = document.querySelector('#update-buttons');
  const updateButton = document.querySelector('#update-button');
  let updateTemplate = document.querySelector(`#update-template`);
  if(updateTemplate) {
    updateTemplate = document.querySelector(`#update-template`).content; // Comprueba si existe el atributo ID.
    data.forEach(element => {
      updateTemplate.querySelector(`input`).setAttribute(`name`, `id`);
      updateTemplate.querySelector(`input`).setAttribute(`value`, `${element.id}`);
      updateTemplate.querySelector(`input`).setAttribute(`id`, `update-${element.id}`);
      updateTemplate.querySelector(`label`).setAttribute(`for`, `update-${element.id}`);
      updateTemplate.querySelector(`label`).textContent = element.id;
      const clone = updateTemplate.cloneNode(true); // Clona el template.
      fragment.appendChild(clone); // Envía la clonación.
    })
  }
  let number; // Guarda un número
  updateButtons.addEventListener(`click`, (e) => {
    number = e.target.value; // Toma el numero del valor de algún input.
    if(number > 0) updateButton.removeAttribute(`disabled`); // Remueve el atributo "disabled".
    else updateButton.setAttribute(`disabled`, `true`);  // Agrega el atributo "disabled".
  })
  updateButtons.appendChild(fragment); // Rnderiza el template.
}

const renderButtonsDelete = (data) => {
  const productForm = document.querySelector('#product-form');
  const productContent = document.querySelector('#product-content');
  let deleteTemplate = document.querySelector(`#delete-template`);
  if(deleteTemplate) {
    deleteTemplate = document.querySelector(`#delete-template`).content; // Comprueba si existe el atributo ID.
    data.forEach(element => {
      deleteTemplate.querySelector(`input`).setAttribute(`value`, `${element.id}`);
      deleteTemplate.querySelector(`input`).setAttribute(`id`, `delete-${element.id}`);
      const clone = deleteTemplate.cloneNode(true); // Clona el template.
      fragment.appendChild(clone); // Envía la clonación.
    })
  }
  productContent.addEventListener(`click`, (e) => {
    productForm.action = `api/products/${e.target.value}`; // Cambia la dirección del action dinamicamente.
  })
  productContent.appendChild(fragment); // Rnderiza el template.
}
