import { Modal } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import PhoneInput from 'react-phone-number-input';
import { useState } from "react";
import 'react-phone-number-input/style.css';

function FormServices({ isModalOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation and submission logic here

    // Close the modal after submission
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      header={
        <ModalHeader style={{ backgroundColor: "transparent", padding: "1rem 2rem", height: "4%" }}>
          Contact Form
        </ModalHeader>
      }
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        height:"fix"
      }}
      open={isModalOpen} // Control modal visibility externally
      onOpenChange={onClose} // Close modal when form is submitted or user interacts to close
    >
      <div className="p-8 max-w-lg bg-white font-sans rounded-lg shadow-lg">
        <h1 className="text-3xl text-gray-800 font-bold text-center mb-4">Contact Us</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 text-sm block mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm block mb-1">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm block mb-1">Your Phone Number</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm block mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter the subject"
              className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm block mb-1">Message</label>
            <textarea
              placeholder="Write your message here"
              rows="5"
              className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-3 px-6 transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default FormServices;
