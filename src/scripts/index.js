import { openModal, closeModal, buttonConfig, } from "./modal.js";

let total = 0;
const totalPrice = document.querySelector('#value__total')

function emptyText() {
  const allButton = document.querySelector('#button__all');
  const incomeButton = document.querySelector('#button__deposit');
  const outcomeButton = document.querySelector('#button__withdrawal');
  const emptyTitle = document.querySelector('.empty__container .title__secondary');

  allButton.addEventListener('click', () => {
    emptyTitle.textContent = 'Nenhum valor cadastrado!';
    const filterAll = insertedValues
    total = 0;
    filterAll.forEach(element =>{
      total += element.value;
      totalPrice.innerHTML = `R$ ${total.toFixed(2)}`
      const elementId = element.id
      const div = document.querySelector(`[data-id="${elementId}"]`)
      div.classList.remove('hidden')
    })
    
  });

  incomeButton.addEventListener('click', () => {
    emptyTitle.textContent = 'Nenhum valor na entrada!';
    const filter = insertedValues.filter(obj => obj.categoryID !== 0)
    const filterClear = insertedValues.filter(obj => obj.categoryID === 0)
    total = 0;
    filter.forEach(element => {
      const elementId = element.id
      const div = document.querySelector(`[data-id="${elementId}"]`)
      div.classList.add('hidden')
    })
    filterClear.forEach(element => {
      total += element.value;
      totalPrice.innerHTML = `R$ ${total.toFixed(2)}`
      const elementId = element.id
      const div = document.querySelector(`[data-id="${elementId}"]`)
      div.classList.remove('hidden')
    })

  });

  outcomeButton.addEventListener('click', () => {
    emptyTitle.textContent = 'Nenhum valor na saída!';
    const filter = insertedValues.filter(obj => obj.categoryID !== 1)
    const filterClear = insertedValues.filter(obj => obj.categoryID === 1)
    total = 0;
    filter.forEach(element => {
      const elementeId = element.id
      const div = document.querySelector(`[data-id="${elementeId}"]`)
      div.classList.add('hidden')
      
    });
    filterClear.forEach(element => {
      total += element.value;
      totalPrice.innerHTML = `R$ ${total.toFixed(2)}`
      const elementeId = element.id
      const div = document.querySelector(`[data-id="${elementeId}"]`)
      div.classList.remove('hidden')
    })
  });
}

function hidden(){
  const container = document.querySelector('.loaded__container')
  const containerEmpty = document.querySelector('.empty__container')
  
  if(container.childElementCount < 1){
    containerEmpty.classList.remove('hidden')
  }
  else{
    containerEmpty.classList.add('hidden')
  }
}

function setValue(item, valuesCategory, arr){
  const loadedContainer = document.querySelector('.loaded__container');
  const value = item.value;
  const categoryID = item.categoryID;
  const category = valuesCategory[categoryID];
  const id = item.id;
  const div = document.createElement('div');
  const valueP = document.createElement('p');
  const container = document.createElement('div');
  const categoryP = document.createElement('p');
  const trashButton = document.createElement('i'); 

  div.classList.add("test")
  div.dataset.id = id
  valueP.textContent = `R$ ${value.toFixed(2)}`;
  valueP.classList.add("text__primary")
  categoryP.textContent = category;
  categoryP.classList.add(category === 'Entrada' ? 'entrada' : 'saida');
  trashButton.classList.add("fa-solid")
  trashButton.classList.add("fa-trash")
  trashButton.setAttribute('data-container-id', arr.length);
  
  div.appendChild(valueP);
  div.appendChild(container);
  container.appendChild(categoryP);
  container.appendChild(trashButton);
  loadedContainer.appendChild(div);

  total += item.value;
  totalPrice.innerHTML = `R$ ${total.toFixed(2)}`

  trashButton.addEventListener('click', function() {
    total -= item.value;
    totalPrice.innerHTML = `R$ ${total.toFixed(2)}`
    deleteContainer(id);
    div.remove();
    hidden()
  });
}

function deleteContainer(index) {
  const positionArr = insertedValues.findIndex(obj => obj.id === index)
  insertedValues.splice(positionArr, 1)
}

function createNewValue(arr){
  const input = document.querySelector('.value')
  const buttonDeposit = document.querySelector('#deposit')
  const buttonwithdrawal = document.querySelector('#withdrawal')
  const buttonInsert = document.querySelector('#button__insert')

  input.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  buttonInsert.addEventListener('click', () =>{
    let validInput = input.value !== ''
    let validButton = buttonDeposit.classList.contains('on') || buttonwithdrawal.classList.contains('on');
    if(validInput && validButton){
      let inputValue = input.value
      let buttonValue
      if(buttonDeposit.classList.contains('on')){
        buttonValue = 0;
      }
      else{
        buttonValue = 1;
      }
      
      let container ={
        id: arr.length+1,
        value: parseInt(inputValue),
        categoryID: buttonValue
      }
      arr.push(container)
      setValue(container, valuesCategory, arr);
      hidden()
    }
  })
}


function init(){
  openModal()
  closeModal()
  buttonConfig()
  emptyText();
  createNewValue(insertedValues)
}
init()