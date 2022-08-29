function getCartItems(){
  db.collection('cart-items').onSnapshot((snopshot)=>{
    let cardItems=[]
    snopshot.docs.forEach((doc)=>{
      cardItems.push({
        id:doc.id,
        ...doc.data()
      })
    })
    generateCardItems(cardItems)
    getTotalCost(cardItems)
  })
}

function decraseButtons(itemId){
  let cardItems = db.collection('cart-items').doc(itemId);
  cardItems.get().then((doc)=>{
    if(doc.exists){
      if(doc.data().quantity > 1){
        cardItems.update({
          quantity:doc.data().quantity -1
        })
      }
    }
  })
}

function getTotalCost(items) {
  let total = 0
  items.forEach(item=>{
    total += (item.price * item.quantity)
  })
  document.querySelector('.total-cost-number').textContent= numeral(total).format('$0,0.00')
}

function inraseBtn(itemId){
  let cardItems = db.collection('cart-items').doc(itemId);
  cardItems.get().then((doc)=>{
    if(doc.exists){
      if(doc.data().quantity > 0){
        cardItems.update({
          quantity:doc.data().quantity +1
        })
      }
    }
  })

}

function deleteItem(itemId){
  db.collection('cart-items').doc(itemId).delete();
}


function generateCardItems(cardItems) {

  let itemsHtml = ''
  cardItems.forEach(item=>{
    itemsHtml +=
    `
    <div class="cart-items border-b border-gray-100 mt-5 flex items-center pb-4">
    <div class="cart-item ">
    <div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
      <img class="w-full h-full object-contain" src="${item.image}" alt="">
    </div>
    <!-- img -->
  </div>
  <div class="cart-item-details flex-grow">
    <div class="cart-item-title font-bold text-sm text-gray-400">
    ${item.name}
    </div>
    <div class="cart-item-brand text-sm text-purple-400">
    ${item.make}
    </div>
  </div>
  <div   class=" cart-item-counter w-48 flex items-center">
    <div data-id="${item.id}"  class="cart-item-decre chevron-left bg-gray-100 rounded text-gray-400 h-6 w-6 flex justify-center items-center
    hover:bg-gray-200 cursor-pointer
    ">
      <i class="fa-solid fa-chevron-left "></i>
    </div>
    <h4 class="text-gray-400">x${item.quantity}</h4>
    <div data-id="${item.id}"  class="cart-item-incre chevron-right bg-gray-100 rounded text-gray-400 h-6 w-6 flex justify-center items-center hover:bg-gray-200 cursor-pointer">
      <i  class="fa-solid fa-chevron-right "></i>
    </div>
  </div>
  <div class="cart-item-total-cost w-40 font-bold text-gray-400">
 $ ${numeral(item.price * item.quantity).format('$0,0.00')}
  </div>
  <div data-type="${item.id}" class="cart-item-delete text-gray-200 bg-gray-100 h-10 w-10 flex items-center justify-center rounded p-2 hover:bg-gray-700 cursor-pointer">
    <div class="fas fa-times"></div>
  </div>
  </div>
  `
  })
  document.querySelector('.content').innerHTML = itemsHtml
  createEventListenners()
}

function createEventListenners() {
  let decreBtn = document.querySelectorAll('.cart-item-decre')
  let increBtn = document.querySelectorAll('.cart-item-incre')
  let deleteButton = document.querySelectorAll('.cart-item-delete')

  decreBtn.forEach(item=>{
    item.addEventListener('click',()=>{
      decraseButtons(item.dataset.id)

    })
  })

  increBtn.forEach(item=>{
    item.addEventListener('click',()=>{
      inraseBtn(item.dataset.id)
    })
  })

  deleteButton.forEach(button=>{
    button.addEventListener('click',()=>{
      deleteItem(button.dataset.type)
    })
  })

}

getCartItems()