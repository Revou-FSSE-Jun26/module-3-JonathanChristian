interface Product { id: number; name: string; price: number; category: string; inStock: boolean; stock: number; }
interface CartItem { product: Product; quantity: number; }
interface Cart { items: CartItem[]; totalItems: number; totalPrice: number; }
type BadgeVariant = "success" | "warning" | "error";

const products: Product[] = [
  { id: 1, name: "Logitech Wireless Mouse", price: 250000, category: "Accessories", inStock: true, stock: 100},
  { id: 2, name: "Razer Mechanical Keyboard", price: 750000, category: "Accessories", inStock: false, stock: 0},
  { id: 3, name: "ASUS ROG Zephyrus G14", price: 35000000, category: "Computers", inStock: true, stock: 50},
  { id: 4, name: "Nothing Phone Fold (a)", price: 25000000, category: "Smartphones", inStock: true, stock: 7},
  { id: 5, name: "ASUS ROG SWIFT Monitor", price: 18000000, category: "Accessories", inStock: true, stock: 20},
  { id: 6, name: "iPhone Duo", price: 55000000, category: "Smartphones", inStock: true, stock: 10}
];

let cartItems: CartItem[] = [];

function getBadgeClasses(variant: BadgeVariant): string {
  const base = "text-xs font-semibold px-2 py-1 rounded-full";
  const variants: Record<BadgeVariant, string> = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  };
  return base + " " + variants[variant];
}

function getCardClasses(inStock: boolean): string {
  const base = "bg-white rounded-xl shadow-md p-4 transition flex flex-col";
  return inStock
  ? `${base} hover:shadow-xl`
  : `${base} opacity-60 grayscale`;
}

function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

function updateInStock(p: Product) {
  if (p.stock === 0) {
    p.inStock = false;
  }
}

function renderProducts(list: Product[]) {
  const grid = document.getElementById("grid");
  if (grid) {
    grid.innerHTML = list.map((p) => `
    <article class="${getCardClasses(p.inStock)}">
        <span class="${getBadgeClasses(p.inStock ? 'success' : 'error')}">${p.inStock ? 'In Stock' : 'Sold Out'}</span>
        <h3 class="text-lg font-bold text-gray-900 truncate mt-2">${p.name}</h3>
        <p class="text-xl font-bold text-[#4c936d] mt-1">${formatRupiah(p.price)}</p>
        <p class="text-sm font-bold text-gray-400 mt-1">Stock: ${p.stock}</p>
        <span class="text-sm text-gray-500">${p.category}</span>
        <button data-id="${p.id}" ${p.inStock ? "" : "disabled"} class="add-btn w-full mt-3 bg-[#4c936d] text-white px-4 py-2 rounded-xl hover:bg-green-700 disabled:opacity-50">
            Add to Cart
        </button>
    </article>`).join("");
  }
}

function renderCart() {
  const totalItems: number = cartItems.reduce((s, ci) => s + ci.quantity, 0);
  const totalPrice: number = cartItems.reduce((s, ci) => s + ci.product.price * ci.quantity, 0);

  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  if (cartCount) {
    cartCount.textContent = totalItems + " items";
  }
  if (cartTotal) {
    cartTotal.textContent = formatRupiah(totalPrice);
  }
}

function addToCart(id: number) {
  const product = products.find((p) => p.id === id);
  if (!product || !product.inStock) {
    return;
  }
  product.stock -= 1;
  const searchInCart = cartItems.find((ci) => ci.product.id === product.id);
  if (searchInCart) {
    searchInCart.quantity += 1;
  } else {
    cartItems.push({ product, quantity: 1 });
  }
  updateInStock(product);
  renderProducts(products);
  renderCart();
}

const gridEl = document.getElementById("grid")
if (gridEl && gridEl instanceof HTMLElement) {
    gridEl.addEventListener("click", (e) => {
        const target = e.target as HTMLElement | null;
        if (target && target instanceof HTMLElement) {
            const btn = target.closest(".add-btn");
            if (btn && btn instanceof HTMLButtonElement) addToCart(Number(btn.dataset.id));
        }
    });
}

const searchEl = document.getElementById("search");
if (searchEl && searchEl instanceof HTMLInputElement) {
    searchEl.addEventListener("input", (e) => {
        const term = searchEl.value.toLowerCase();
        const filtered = products.filter((p) => p.name.toLowerCase().includes(term));
        renderProducts(filtered);
    });
}

renderProducts(products);
renderCart();