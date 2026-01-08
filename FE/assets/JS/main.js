$(document).ready(function() {
    updateCartBadge();
    if ($('#cart-items').length > 0) {
        renderCart();
    }

    let slideIndex = 0;
    const slides = $('.slide');
    const dots = $('.dot');
    let timer;

    function showSpecificSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        slides.eq(index).addClass('active');
        dots.eq(index).addClass('active');
        slideIndex = index;
    }

    function startAutoPlay() {
        if (slides.length > 0) {
            timer = setInterval(function() {
                slideIndex = (slideIndex + 1) % slides.length;
                showSpecificSlide(slideIndex);
            }, 5000);
        }
    }

    dots.on('click', function() {
        clearInterval(timer);
        showSpecificSlide($(this).index());
        startAutoPlay();
    });

    if (slides.length > 0) {
        showSpecificSlide(0);
        startAutoPlay();
    }

    $(document).on('click', '.add-to-cart-btn', function() {
        const name = $(this).data('name');
        const price = parseInt($(this).data('price'));

        if (!name || isNaN(price)) {
            alert("錯誤：HTML 按鈕缺少正確的 data-name 或 data-price 屬性！");
            return;
        }

        let cart = JSON.parse(localStorage.getItem('dessert_cart')) || [];
        let found = cart.find(item => item.name === name);

        if (found) {
            found.quantity += 1;
        } else {
            cart.push({ name: name, price: price, quantity: 1 });
        }

        localStorage.setItem('dessert_cart', JSON.stringify(cart));
        updateCartBadge();
        alert('【' + name + '】已成功加入購物車！');
    });
});


function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('dessert_cart')) || [];
    let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const $badge = $('.cart-count'); 
    
    if (totalQty > 0) {
        $badge.text(totalQty).show();
    } else {
        $badge.text(0).hide();
    }
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('dessert_cart')) || [];
    let $cartTable = $('#cart-items');
    let $totalDisplay = $('#total-price');
    let html = '';
    let grandTotal = 0;

    if (cart.length === 0) {
        html = '<tr><td colspan="5" style="padding:50px; text-align:center;">您的購物車目前是空的。</td></tr>';
    } else {
        cart.forEach((item, index) => {
            let subtotal = item.price * item.quantity;
            grandTotal += subtotal;
            html += `
                <tr>
                    <td>${item.name}</td>
                    <td>NT$ ${item.price}</td>
                    <td>
                        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                        <span style="margin: 0 10px;">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    </td>
                    <td>NT$ ${subtotal}</td>
                    <td><button class="del-btn" onclick="removeItem(${index})">刪除</button></td>
                </tr>
            `;
        });
    }

    $cartTable.html(html);
    $totalDisplay.text(grandTotal);
    updateCartBadge();
}
window.changeQty = function(index, amount) {
    let cart = JSON.parse(localStorage.getItem('dessert_cart')) || [];
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        window.removeItem(index); 
    } else {
        localStorage.setItem('dessert_cart', JSON.stringify(cart));
        renderCart();
    }
};

window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('dessert_cart')) || [];
    if (confirm(`確定要移除此商品嗎？`)) {
        cart.splice(index, 1);
        localStorage.setItem('dessert_cart', JSON.stringify(cart));
        renderCart();
    }
};

$(document).ready(function() {
    let slideIndex = 0;
    const slides = $('.slide');
    const dots = $('.dot');
    let timer; 

    function showSpecificSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        slides.eq(index).addClass('active');
        dots.eq(index).addClass('active');
        slideIndex = index;
    }

    function startAutoPlay() {
        timer = setInterval(function() {
            slideIndex = (slideIndex + 1) % slides.length;
            showSpecificSlide(slideIndex);
        }, 5000); 
    }

    dots.on('click', function() {
        const clickedIndex = $(this).index(); 
        
        clearInterval(timer);
        showSpecificSlide(clickedIndex);
        startAutoPlay();
    });
    if (slides.length > 0) {
        showSpecificSlide(0);
        startAutoPlay();
    }
});


function openTab(tabId) {
    $('.tab-content').removeClass('active');
    $('.tab-btn').removeClass('active');
    $('#' + tabId).addClass('active');
    $(event.currentTarget).addClass('active');
}

function setRating(n) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < n) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}