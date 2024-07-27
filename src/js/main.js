document.addEventListener("DOMContentLoaded", () => {
    let cartCounter = document.querySelector(".cart__counter");
    let cartItems = document.querySelector(".cart__items");
    const addToCart = document.querySelectorAll(".btn__add__to__cart");
    let totalCounter = document.querySelector(".total__counter");
    let totalCost= document.querySelector(".total__cost");

    

    let cartAddingArray = [];

    cartCounter.addEventListener("click", () => {

        cartItems.classList.toggle("active");
    })
    // console.log(addToCart)

    addToCart.forEach( btn => {

        btn.addEventListener("click", () => {
            let parentElement = btn.parentElement;
            const product = {
                id : parentElement.querySelector(".product_id").value,
                name : parentElement.querySelector(".product__name").innerText,
                price : parentElement.querySelector(".product__price").innerText.replace("$",""),
                img : parentElement.querySelector(".image").getAttribute("src"),
                quantity : 1
            }

            let isInCart = cartAddingArray.filter( item => item.id === product.id  ).length > 0 ;

            if(!isInCart) {
                addItemToTheCart(product)
            }
            else {
                alert("Product is already in the cart");
                return
            }


            let cart_Item = document.querySelectorAll(".cart__item");

            cart_Item.forEach( individuallItem => {
                if(individuallItem.querySelector(".product__id").value === product.id) {

                    increaseItem(individuallItem, product);
                    decreaseItem(individuallItem, product);
                    removeItem(individuallItem, product);

                }

            })
            
            
            cartAddingArray.push(product)
            calculateTotal();
        })
    })

    function addItemToTheCart(product) {
        cartItems.insertAdjacentHTML("afterbegin", `
            <div class="cart__item">
                <input type="hidden" name="" class="product__id" value ="${product.id}">
                <img src="${product.img}" alt="" class="product__img">
                <h4 class="product__name">${product.name}</h4>
                <a class="btn__small" action="decrease">&minus;</a>
                <h4 class="product__quantity">${product.quantity}</h4>
                <a class="btn__small" action="increase">&plus;</a>
                <span class="product__price">${product.price}</span>
                <a class="btn__small btn__remove" action="remove">&times;</a>
            </div>
            `)
    }


    function calculateTotal() {
        let total = 0;
        // totalCost.innerText = "$"+total;
        cartAddingArray.forEach( item => {
            total += item.quantity * item.price;
            totalCost.innerText = total;
            totalCounter.innerText = cartAddingArray.length
        })
    }

    function increaseItem(individuallItem, product) {
        individuallItem.querySelector("[action='increase']").addEventListener("click", () => {

            cartAddingArray.forEach( item => {
                if(item.id === product.id) {
                    individuallItem.querySelector(".product__quantity").innerText = ++item.quantity;
                    calculateTotal();
                }
            } ) 
            
        })
    }
    
    function decreaseItem(individuallItem, product) {
        individuallItem.querySelector("[action='decrease']").addEventListener("click", () => {

            cartAddingArray.forEach( item => {
                if(item.id === product.id) {
                    if(item.quantity > 1 ) {
                        individuallItem.querySelector(".product__quantity").innerText = --item.quantity;
                    }
                    else {
                        // cartAddingArray = cartAddingArray.filter(newElement => {
                        //     newElement.id !== product.id
                        // });
                        // individuallItem.remove();
                        alert("You have only one item left to checkout");
                        return
                    }
                    
                    calculateTotal();
                }
            } ) 
            
        })
    }
    function removeItem(individuallItem, product) {
        individuallItem.querySelector("[action='remove']").addEventListener("click", () => {

            cartAddingArray.forEach( item => {
                if(item.id === product.id) {
                    
                    cartAddingArray = cartAddingArray.filter(newElement => {
                        newElement.id !== product.id
                    });
                    individuallItem.remove();
                    
                    calculateTotal();
                }
            } ) 
            
        })
    }



})

