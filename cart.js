function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.forEach((doc) => {
            cartItems.push({
                id: doc.id,
               ...doc.data()
            })
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    })
}

function getTotalCost(items){
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += (item.price * item.quantity);
    })
    document.querySelector(".total-cost-number").innerText = numeral(totalCost).format("$0,0.00")

}

function decreaseCount(itemID){
    let cartItem =  db.collection("cart-items").doc(itemID);
    cartItem.get().then(function(doc) {
        if (doc.exists){
            if (doc.data().quantity > 1){
                cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}

function increaseCount(itemID){
    let cartItem =  db.collection("cart-items").doc(itemID);
    cartItem.get().then(function(doc) {
        if(doc.exists){
            if (doc.data().quantity > 0){
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}

function deleteItem(itemID){
    db.collection("cart-items").doc(itemID).delete();
}

function generateCartItems(cartItems){
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `                    
            <div class="cart-item flex items-center p-4 border-b border-gray-100">
            <div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg ">
                <img class=" w-full h-full object-contain" src="${item.image}" alt="">
            </div> 
            <div class="cart-item-details flex-grow">
                <div class="cart-item-title font-bold text-sm text-gray-600">
                    ${item.name}
                </div>
                <div class="cart-item-brand text-sm text-gray-400">
                    ${item.make}
                </div>
            </div>
            <div class="cart-item-counter w-48 flex items-center">
                <div data-id="${item.id}" class="cart-item-decrease chevron-left cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200">
                    <i class="fas fa-chevron-left fa-xs"></i>
                </div>
                <h4 class="text-gray-400 mx-2">x${item.quantity}</h4>
                <div data-id="${item.id}" class="cart-item-increase chevron-right cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200">
                    <i class="fas fa-chevron-right fa-xs"></i>
                </div>
            </div>
            <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                ${numeral(item.price * item.quantity).format("$0,0.00")}
            </div>
            <div data-id="${item.id}" class="cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
                <i class="fas fa-times fa-xs"></i>
            </div>
            </div> `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners(){
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");
    let deleteButtons = document.querySelectorAll(".cart-item-delete")

    decreaseButtons.forEach((button) => {
        button.addEventListener('click', function(){
            decreaseCount(button.dataset.id);
        })
    })

    increaseButtons.forEach((button) => {
        button.addEventListener('click', function(){
            increaseCount(button.dataset.id);
        })
    })

    deleteButtons.forEach((button) => {
        button.addEventListener('click', function(){
            deleteItem(button.dataset.id);
        })
    })
}

getCartItems();