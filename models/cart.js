module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id) {
        const that = this;
        return new Promise(function(resolve, reject) {
            var cartItem = that.items[id];
            if (!cartItem) {
                cartItem = that.items[id] = {item: item, quantity: 0, price: 0};
            }
            cartItem.quantity++;
            cartItem.price = cartItem.item.price * cartItem.quantity;
            that.totalItems++;
            that.totalPrice += cartItem.item.price;

            resolve(cartItem);
        })
    };

    this.remove = function(id) {
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};