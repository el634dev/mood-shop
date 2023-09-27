import data from './data.js'

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
//itemList.innerHTML = '<li> Hello World</li>'

const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const addForm = document.getElementById('add-form');

// length of our data determines how many times this loop goes around
// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
    
	// put new div inside items container
	itemsContainer.appendChild(newDiv)
	// create a paragraph element for a description
	const desc = document.createElement('P')
	// give the paragraph text from the data
	desc.innerText = data[i].desc
	// append the paragraph to the div
	newDiv.appendChild(desc)
	// do the same thing for price
	const price = document.createElement('P')
	price.innerText = data[i].price
	newDiv.appendChild(price)

	// ----------------
	// Make a button 
	const button = document.createElement('button')
	// add an  id name to the button
	button.id = data[i].name
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)
}

// --------------------------
// Add to Cart Buttons
const all_items_button = Array.from(document.querySelectorAll("button"));
all_items_button.forEach(elt => elt.addEventListener('click', () => {
	addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
	showItems()
}))

// ------------------------
// Make shopping cart
const cart = [];

// -----------------------------------------
// Handle Change events on update input
itemList.onchange = function(e) {
	if (e.target && e.target.classList.contains('update')) {
		const name = e.target.dataset.name;
		const qty = parseInt(e.target.value);
		updateCart(name, qty)
	}
}

// ----------------------------------------
// Handle click in list
itemList.onclick = function(e) {
	//console.log(e.target)
	//console.log("Clicked list!!!")
	if (e.target && e.target.classList.contains('remove')) {
		const name = e.target.dataset.name; // name of date-name
		removeItem(name)
	} else if (e.target && e.target.classList.contains('add-one')) {
		const name = e.target.dataset.name;
		addItem(name)
	} else if (e.target && e.target.classList.contains('remove-one')) {
		const name = e.target.dataset.name;
		removeItem(name, 1)
	}
}

// -------------------------------------------
// Handle add submit
addForm.onsubmit = function(e) {
	e.preventDefault()
	const name = itemName.value;
	const price = itemPrice.value;
	addItem(name, price)
}

// -----------------------------------
// Add Item to shopping cart
function addItem(name, price) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			cart[i].qty += 1;
			showItems()
			return;
		}
	}
	const item = {name, price, qty: 1};
	cart.push(item)
	showItems()
}

// ----------------------------------------------------
// Show Items in cart
function showItems() {
	const qty = getQty();
	cartQty.innerHTML = `You have ${qty} items in your cart.`

	let itemStr = ''
	// Loop through our cart
	for (let i = 0; i < cart.length; i += 1) {
		// console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
	
		// {name: 'Apple', price: 0.99, qty: 3}
		const { name, price, qty } = cart[i];
		
		const itemPrice = qty * price
		itemStr += `<li>
				${name} $${price} x ${qty} = ${itemPrice.toFixed(2)}
				<button class="remove" data-name="${name}">Remove</button>
				<button class="add-one" data-name="${name}"> + </button>
				<button class="remove-one" data-name="${name}"> - </button>
				<input class="update" type="number" data-name="${name}">
			</li>`
	}
	itemList.innerHTML = itemStr

	const total = getTotal();
	cartTotal.innerHTML =`Your total is $${total.toFixed(2)}`
}

// ------------------------------------------------------------
// Get quantity
function getQty() {
	// Get the 
	let qty = 0;
	for (let i = 0; i < cart.length; i += 1) {
		qty += cart[i].qty;
	}
	return qty
}

// -------------------------------------------
// Get total 
function getTotal() {
	// Calculates shopping cart total
	let total = 0;
	for (let i = 0; i < cart.length; i += 1) {
		total += cart[i].price * cart[i].qty;
	}
	return total // can include .toFixed(2) here
}

// ---------------------------------------------
// Remove Item from shopping cart
function removeItem(name, qty = 0) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			if (qty > 0) {
				cart[i].qty -= qty
			}
			//************* 
			// Edge case if qty is less than 1 or 0 
			if (cart[i].qty < 1 || qty === 0) {
				cart.splice(i, 1)
			}
			showItems()
			return
		}
	}
}

// -----------------------------
// Update Cart
function updateCart(name, qty) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			if (qty < 1) {
				removeItem(name)
				return
			}
			cart[i].qty = qty
			showItems()
			return
		}
	}
}

// ----------------
// Test code
// addItem('Apple', 0.99)
// addItem('Apple', 0.99)
// addItem('Orange', 1.29)
// addItem('Orange', 1.29)
// addItem('Orange', 1.29)
// addItem('Frisbee', 9.92)

// showItems()
// removeItem('Apple', 1)
// removeItem('Frisbee')
showItems()