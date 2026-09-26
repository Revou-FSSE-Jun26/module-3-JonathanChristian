const orders = [
    { id: 1, customer: "Ava",   product: "Wireless Mouse",      quantity: 2, unitPrice: 25.0, category: "Electronics" },
    { id: 2, customer: "Ben",   product: "Coffee Mug",          quantity: 4, unitPrice: 8.5,  category: "Kitchen" },
    { id: 3, customer: "Cara",  product: "Mechanical Keyboard", quantity: 1, unitPrice: 89.0, category: "Electronics" },
    { id: 4, customer: "Dan",   product: "Notebook",            quantity: 6, unitPrice: 3.25, category: "Stationery" },
    { id: 5, customer: "Eve",   product: "Desk Lamp",           quantity: 1, unitPrice: 42.0, category: "Home" },
    { id: 6, customer: "Finn",  product: "USB-C Cable",         quantity: 3, unitPrice: 12.0, category: "Electronics" }
];

const HIGH_VALUE = 50;

const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
const lineTotal = (order) => order.quantity * order.unitPrice;

function renderAllOrders() {
    const el = document.getElementById("all-orders");
    orders.forEach((o) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${o.customer} - ${o.product}</span><span>x${o.quantity}</span>`;
        el.appendChild(li);
    });
}

function renderOrderTotals() {
    const el = document.getElementById("order-totals");
    orders
        .map((o) => ({ product: o.product, total: lineTotal(o) }))
        .forEach((o) => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${o.product}</span><span>${formatCurrency(o.total)}</span>`;
            el.appendChild(li);
        });
}

function renderHighValueOrders() {
    const el = document.getElementById("filtered-orders");
    orders
        .filter((o) => lineTotal(o) >= HIGH_VALUE)
        .forEach((o) => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${o.customer} - ${o.product}</span><span>${formatCurrency(lineTotal(o))}</span>`;
            el.appendChild(li);
        });
}

function renderSalesSummary() {
    const el = document.getElementById("sales-summary");
    const revenue = orders.reduce((sum, o) => sum + lineTotal(o), 0);
    const itemsSold = orders.reduce((sum, o) => sum + o.quantity, 0);

    const summary = [
        { label: "Total Revenue", value: formatCurrency(revenue) },
        { label: "Items Sold", value: itemsSold },
        { label: "Orders", value: orders.length }
    ];

    summary.forEach((s) => {
        const div = document.createElement("div");
        div.innerHTML = `<span class="label">${s.label}</span><span class="value">${s.value}</span>`;
        el.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderAllOrders();
    renderOrderTotals();
    renderHighValueOrders();
    renderSalesSummary();
});
