const dataset = [
  { month: "Jan", quarter: "q1", region: "north", revenue: 22000, orders: 120, product: "Analytics Suite" },
  { month: "Feb", quarter: "q1", region: "south", revenue: 18000, orders: 96, product: "Forecast Pro" },
  { month: "Mar", quarter: "q1", region: "west", revenue: 26000, orders: 132, product: "Insight Hub" },
  { month: "Apr", quarter: "q2", region: "north", revenue: 28000, orders: 146, product: "Forecast Pro" },
  { month: "May", quarter: "q2", region: "south", revenue: 24000, orders: 128, product: "Insight Hub" },
  { month: "Jun", quarter: "q2", region: "west", revenue: 30000, orders: 150, product: "Analytics Suite" },
  { month: "Jul", quarter: "q3", region: "north", revenue: 32000, orders: 166, product: "Insight Hub" },
  { month: "Aug", quarter: "q3", region: "south", revenue: 27500, orders: 140, product: "Forecast Pro" },
  { month: "Sep", quarter: "q3", region: "west", revenue: 34000, orders: 172, product: "Analytics Suite" },
  { month: "Oct", quarter: "q4", region: "north", revenue: 36000, orders: 188, product: "Insight Hub" },
  { month: "Nov", quarter: "q4", region: "south", revenue: 31000, orders: 162, product: "Analytics Suite" },
  { month: "Dec", quarter: "q4", region: "west", revenue: 39000, orders: 205, product: "Forecast Pro" }
];

const regionSelect = document.querySelector("#region");
const quarterSelect = document.querySelector("#quarter");
const revenue = document.querySelector("#revenue");
const orders = document.querySelector("#orders");
const aov = document.querySelector("#aov");
const bestRegion = document.querySelector("#best-region");
const bars = document.querySelector("#bars");
const products = document.querySelector("#products");

function filterData() {
  return dataset.filter((item) => {
    const regionOk = regionSelect.value === "all" || item.region === regionSelect.value;
    const quarterOk = quarterSelect.value === "all" || item.quarter === quarterSelect.value;
    return regionOk && quarterOk;
  });
}

function render() {
  const filtered = filterData();
  const totalRevenue = filtered.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = filtered.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  const byRegion = filtered.reduce((acc, item) => {
    acc[item.region] = (acc[item.region] || 0) + item.revenue;
    return acc;
  }, {});
  const best = Object.entries(byRegion).sort((a, b) => b[1] - a[1])[0];

  revenue.textContent = `$${totalRevenue.toLocaleString()}`;
  orders.textContent = totalOrders.toLocaleString();
  aov.textContent = `$${avgOrderValue.toFixed(0)}`;
  bestRegion.textContent = best ? best[0][0].toUpperCase() + best[0].slice(1) : "-";

  const maxRevenue = Math.max(...filtered.map((item) => item.revenue), 1);
  bars.innerHTML = filtered.map((item) => `
    <div class="bar-row">
      <span>${item.month}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(item.revenue / maxRevenue) * 100}%"></div></div>
      <span>$${item.revenue.toLocaleString()}</span>
    </div>
  `).join("");

  const byProduct = filtered.reduce((acc, item) => {
    acc[item.product] = (acc[item.product] || 0) + item.revenue;
    return acc;
  }, {});

  products.innerHTML = Object.entries(byProduct)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => `
      <div class="product-card">
        <strong>${name}</strong>
        <span>Revenue Contribution: $${value.toLocaleString()}</span>
      </div>
    `)
    .join("");
}

regionSelect.addEventListener("change", render);
quarterSelect.addEventListener("change", render);
render();
