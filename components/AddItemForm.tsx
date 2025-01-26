import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/app/constants/Colors";
import { useTheme } from "@/hooks/ThemeProvider";
import Modal from "./Modal";

type AddItemFormProps = {
  addItem: (newItem: {
    id: number;
    name: string;
    category: string;
    quantity: number;
  }) => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ addItem }) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [open, setOpen] = React.useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && category) {
      const newItem = {
        id: Date.now(),
        name,
        category,
        quantity: parseInt(quantity.toString()),
      };
      addItem(newItem);
      setName("");
      setCategory("");
      setQuantity(1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { colorScheme } = useTheme();

  const options = [
    { title: "Select category", value: "" },
    { title: "Electronics", value: "electronics" },
    { title: "Furniture", value: "furniture" },
    { title: "Households", value: "households" },
    { title: "Groceries", value: "groceries" },
    { title: "Clothing", value: "clothing" },
  ];

  return (
    <div ref={modalRef}>
      <button
        style={{ background: Colors[colorScheme].tint }}
        className="p-3 rounded-xl font-bold"
        onClick={() => setOpen(!open)}
      >
        Add Items
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form
          className="flex flex-col gap-4 w-[90%] justify-center items-center p-3 rounded-xl shadow-xl"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setOpen(false);
          }}
          style={{ background: Colors[colorScheme].itemBackground }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item Name"
            required
            autoFocus
            className="w-full bg-opacity-15 font-bold outline-none rounded-[10px] px-2 h-12 text-black"
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            defaultValue="Select category"
            required
            className="w-full bg-opacity-15 font-bold outline-none rounded-[10px] px-2 h-12 text-black"
          >
            {options.map((option, key) => (
              <option key={key} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
          <label className="flex gap-3 w-full justify-between items-center font-bold text-lg">
            Quantity
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Quantity"
              required
              className="w-full bg-opacity-15 font-bold outline-none rounded-[10px] px-2 h-12 text-black"
            />
          </label>
          <button
            type="submit"
            style={{
              background: Colors[colorScheme].tint,
              color: Colors[colorScheme].text,
              borderRadius: 20,
              width: "100%",
              marginTop: 10,
              fontWeight: 700,
              padding: 10,
            }}
          >
            Add Item
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddItemForm;
