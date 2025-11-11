function calculateEstimate() {
  let orderAmount = Number(document.getElementById("orderAmount").value);
  let isPremium = document.getElementById("isPremium").checked;
  let isRemote = document.getElementById("isRemote").checked;

  if (isNaN(orderAmount) || orderAmount <= 0) {
    document.getElementById("result").innerHTML = "Please enter a valid order amount.";
    return;
  }

  let deliveryFee = 0;
  let deliveryDays = 3;

  // Rule 1: Add ₹50 if order < ₹500 and not premium
  if (orderAmount < 500 && !isPremium) {
    deliveryFee = 50;
  }

  // Rule 2: Premium users get free delivery
  if (isPremium) {
    deliveryFee = 0;
  }

  // Rule 3: Add 2 days for remote address
  if (isRemote) {
    deliveryDays += 2;
  }

  let totalCost = orderAmount + deliveryFee;

  document.getElementById("result").innerHTML =
    "Total Cost: ₹" + totalCost + "<br>Estimated Delivery Time: " + deliveryDays + " days";
}
