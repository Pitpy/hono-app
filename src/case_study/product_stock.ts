type Product = {
    id: number;
    name: string;
    stock: number;
    price: number;
}
interface Cart extends Omit<Product, "stock"> { // Omit ແມ່ນບໍ່ເອົາຄ່າທີ່ລະບຸ
    amount: number;
    quantity: number;
}

let productItems: Product[] = [
    { id: 1, name: 'Item 1', stock: 10, price: 1000 },
    { id: 2, name: 'Item 2', stock: 10, price: 2000 },
    { id: 3, name: 'Item 3', stock: 10, price: 3000 },
    { id: 4, name: 'Item 4', stock: 10, price: 4000 },
    { id: 5, name: 'Item 5', stock: 10, price: 5000 },
    { id: 6, name: 'Item 6', stock: 10, price: 6000 },
    { id: 7, name: 'Item 7', stock: 10, price: 7000 },
    { id: 8, name: 'Item 8', stock: 10, price: 8000 },
    { id: 9, name: 'Item 9', stock: 10, price: 9000 },
    { id: 10, name: 'Item 10', stock: 10, price: 10000 },
]
let cartItems: Cart[] = []
let totalStock = productItems.reduce((sum, product) => sum + product.stock, 0) // ຈຳນວນ stock ທັງໝົດ

// ເພີ່ມລາຍການສິນຄ້າ
function addItem(product: Product) {
    productItems.push(product)

    console.log('Added product');
    console.table(productItems);
}

// ລຶບລາຍການສິນຄ້າ
function removeItem(id: number) {
    productItems = productItems.filter((e) => e.id != id) // ເອົາສະເພາະສິນຄ້າທີ່ມີ ID ບໍ່ກົງກັນ

    console.log('Removed product');
    console.table(productItems);
}

// ແກ້ໄຂລາຍການສິນຄ້າ
function updateItem(product: Product) {
    productItems = productItems.map((e) => {
        if (e.id == product.id)
            return product
        return e
    })

    console.log('updated product');
    console.table(productItems);
}

// ເພີ່ມສິນຄ້າລົງກະຕ່າ
function addToCart(product: Product, qty: number) {

    if (product.stock < qty) return console.log('Sorry... product out of stock'); // ກວດສອບ ຖ້າຈຳນວນຂາຍຫລາຍກວ່າຈຳນວນສະຕ໊ອກ

    let cart: Cart = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        amount: product.price * qty,
    }

    if (cartItems.find(c => c.id === product.id)) { // ຄົ້ນຫາສິນຄ້າທີ່ຖືກເລືອກແລ້ວ
        cartItems = cartItems.map((e) => {
            if (e.id === product.id) // ເລືອກແກ້ໄຂຕາມ ID ທີ່ກົງກັນ
                return { ...e, quantity: e.quantity + cart.quantity, amount: e.amount + cart.amount } // ແກ້ໄຂຈຳນວນ ແລະ ຄາລາລວມ
            return e
        })
    } else {
        cartItems.push(cart) // ເພີ່ມລາຍການໃຫມ່
    }

    updateItem({ ...product, stock: product.stock - qty }) // ຕັດສະຕ໊ອກ

    let total = cartItems.reduce((sum, cart) => sum + cart.amount, 0) // ຍອດລວມທັງໝົດ ທີ່ລູກຄ້າຕ້ອງຈ່າຍ

    console.log('added to cart');
    console.table(cartItems);
    console.log('Total amount:', total);
}

// ເລືອກລາຍການສິນຄ້າ
function pickItem(id: number, qty: number) {
    let product = productItems.find((e) => e.id == id) as Product;
    addToCart(product, qty)
}

pickItem(1, 2)
pickItem(5, 5)