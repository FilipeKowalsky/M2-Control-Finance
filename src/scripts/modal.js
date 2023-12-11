export function openModal(){
  const button = document.querySelector("#button__modal")
  const modalController = document.querySelector(".modal__controller")

  button.addEventListener('click', () => {
    modalController.showModal()

    closeModal()
  })
}

export function closeModal(){
  const closeButton = document.querySelector('#button__close')
  const cancelButton = document.querySelector('#button__cancel')
  const insertButton = document.querySelector('#button__insert')
  const modalContainer = document.querySelector('.modal__controller')

  closeButton.addEventListener('click', () => {
    modalContainer.close()
  })

  cancelButton.addEventListener('click', () => {
    modalContainer.close()
  })

  insertButton.addEventListener('click', () => {
    modalContainer.close()
  })
}

export function buttonConfig(){
  const buttonDeposit = document.querySelector('#deposit')
  const buttonwithdrawal = document.querySelector('#withdrawal')
  
  buttonDeposit.addEventListener('click', () =>{
    buttonDeposit.classList.add('on')
    buttonwithdrawal.classList.remove('on');
  })
  buttonwithdrawal.addEventListener('click', ()=>{
    buttonwithdrawal.classList.add('on')
    buttonDeposit.classList.remove('on');
  })
}