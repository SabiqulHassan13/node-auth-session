function showPayDonation(req, res) {
  res.render("payment/donate");
}

function showPaySuccess(req, res) {
  res.render("payment/success");
}

function showPayCancel(req, res) {
  res.render("payment/cancel");
}

module.exports = { showPayDonation, showPaySuccess, showPayCancel };
