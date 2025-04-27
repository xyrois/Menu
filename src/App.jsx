import { useState } from "react";

const menuItems = [
  { id: 1, name: "Grilled Chicken", price: 10.99 },
  { id: 2, name: "Chilled Cheese", price: 7.99 },
  { id: 3, name: "Buffalo Chicken Pizza", price: 14.99 },
  { id: 4, name: "Biryani", price: 13.99 },
  { id: 5, name: "Burger", price: 5.99 },
  { id: 6, name: "Salad", price: 4.99 },
  { id: 7, name: "Fries", price: 2.99 },
  { id: 8, name: "Ice Cream", price: 6.99 },
]

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((i) => i.id === item.id);
      if (itemInCart) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#DACDFB" }}>
    <h1 className="text-3xl font-bold mb-8 text-center">Food Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Menu Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
                onClick={() => addToCart(item)}
              >
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Clear Cart
              </button>

              {/* Total Price */}
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
