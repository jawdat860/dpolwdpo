import { Modal, VisuallyHidden } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { FaCartShopping } from "react-icons/fa6";
import BuyItem from "./BuyItem";
import { useContext, useState, useEffect } from "react";
import CartContext from "../store/CartContext";
import classes from './Cart.module.css';
import classe from './HeaderCartButton.module.css';
import image from "../../assets/product.png";
import FormServices from "../FormServices/FormServices";

function BuyPage() {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [isBuyPageOpen, setIsBuyPageOpen] = useState(false); // State to control BuyPage modal
  const [isFormServicesOpen, setIsFormServicesOpen] = useState(false); // State to control FormServices modal

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const numberOfCartItems = cartCtx.items.length;

  const btnClasses = `${classe.button} ${btnIsHighlighted ? classe.bump : ''}`;

  // Close the BuyPage modal and open FormServices
  const handleOrderClick = () => {
    setIsBuyPageOpen(false); // Close the BuyPage modal
    setIsFormServicesOpen(true); // Open the FormServices modal
  };

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <>
      {/* BuyPage Modal */}
      <Modal
        header={<ModalHeader style={{ backgroundColor: "transparent", padding: "1rem 2rem", height: "4%" }}>Service Details</ModalHeader>}
        trigger={
          <button
            className={`bg-gradient-to-r relative rounded-[100%] from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-2 flex items-center gap-3 ${btnClasses}`}
            onClick={() => setIsBuyPageOpen(true)} // Open BuyPage modal on button click
          >
            <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            <span className="hidden md:inline">View Cart</span>
            {numberOfCartItems > 0 && <span className={classe.badge}>{numberOfCartItems}</span>}
          </button>
        }
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          height: "90%",
        }}
        open={isBuyPageOpen} // Control modal visibility with state
        onOpenChange={(open) => setIsBuyPageOpen(open)}
      >
        <DialogTitle>
          <VisuallyHidden>Cart Details</VisuallyHidden>
        </DialogTitle>

        <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col">
          {/* Cart items list */}
          <div className="overflow-y-auto flex-grow mb-6">
            {cartCtx.items.length > 0 ? (
              <ul className={`${classes['cart-items']} flex flex-col gap-4`}>
                {cartCtx.items.map((item) => (
                  <BuyItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={() => cartCtx.removeItem(item.id)}
                    onAdd={() => cartCtx.addItem({ ...item, amount: 1 })}
                  />
                ))}
              </ul>
            ) : (
              <img src={image} alt="Empty Cart" />
            )}
          </div>

          {/* Total amount and buttons */}
          <div className="mt-6">
            <div className="flex justify-between items-center text-gray-900 dark:text-white text-lg font-semibold mb-4">
              <span>Total Amount:</span>
              <span>{totalAmount}</span>
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-200"
                onClick={() => setIsBuyPageOpen(false)} // Close BuyPage modal
              >
                Close
              </button>

              {hasItems && (
                <button
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white py-2 px-6 rounded-md shadow-md transition-all duration-200"
                  onClick={handleOrderClick} // Open FormServices and close BuyPage modal
                >
                  Order
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* FormServices Modal */}
      {isFormServicesOpen && (
        <FormServices
          isModalOpen={isFormServicesOpen}
          onClose={() => setIsFormServicesOpen(false)} // Close FormServices modal
        />
      )}
    </>
  );
}

export default BuyPage;
