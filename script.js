
function getItems(){
    db.collection("items").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                make: doc.data().make,
                rating: doc.data().rating,
                price: doc.data().price

            })
        });
        generateItems(items);
    });    
}

function addToCart(item){
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get().then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        } else {
            cartItem.set({
                image: item.image,
                make: item.make,
                name: item.name,
                rating: item.rating,
                price: item.price,
                quantity: 1
            })
        }
    })

}

function generateItems(items){
    let itemsHTML = "";
    items.forEach((item) => {

        let doc =  document.createElement("div");
        doc.classList.add("main-product", "mr-5")
        doc.innerHTML = `
            <div class="product-image w-48 h-52 bg-white rounded-lg mt-5">
                <img class ="w-full h-full object-contain p-4" src="${item.image}" alt="">
            </div>
            <div class="product-name text-gray-700 font-bold mt-2 text-sm">
                ${item.name}
            </div>
            <div class="product-make text-green-700 font-bold">
                ${item.make}
            </div>
            <div class="product-rating text-yellow-300 my-1">
                ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price font-bold text-gray-500 text-lg">
                ${numeral(item.price).format("$0,0.00")}
            </div>
        `

        let addtoCartEl = document.createElement("div");
        addtoCartEl.classList.add("add-to-cart", "h-8", "w-28", "bg-yellow-500", "flex", "justify-center", "items-center", "rounded-lg", "mt-2", "text-white", "text-md", "cursor-pointer", "hover:bg-yellow-600");
        addtoCartEl.innerText = "Add to Cart";
        addtoCartEl.addEventListener("click", function(){
            addToCart(item)
        })
        doc.appendChild(addtoCartEl);
        document.querySelector(".main-section-products").appendChild(doc);
        
    })
}


getItems();