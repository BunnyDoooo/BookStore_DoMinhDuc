function updateCartItemQuantity(quantityInput) {
    var productRow = $(quantityInput).closest('.product');
    var linePriceElement = productRow.find('.product-line-price');
    var oldPrice = parseFloat(linePriceElement.text().replace(/\D/g, ''));
    var newQuantity = parseInt($(quantityInput).val());
    var newPrice = oldPrice * newQuantity;
  
    // Thay đổi giá trị theo hiệu ứng
    linePriceElement.animate({
      opacity: 0.1
    }, 300, function() {
      // Khi giá trị đã biến mất (opacity = 0.1), thay đổi giá trị và hiển thị lại
      linePriceElement.text(newPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
      linePriceElement.animate({
        opacity: 1
      }, 3000);
      
      // Cập nhật tổng giỏ hàng và các giá trị khác tại đây
      recalculateCart();
    });
  }
  