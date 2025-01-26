import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { useTheme } from "@/hooks/ThemeProvider";
import { Ellipsis } from "lucide-react";
import { Colors } from "@/app/constants/Colors";

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  quantity: number;
};

interface InventoryTableProps {
  items: InventoryItem[];
  deleteItem: (id: number) => void;
  editItem: (item: InventoryItem) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  deleteItem,
  editItem,
}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [newQuantity, setNewQuantity] = useState("");
  const [currentItemId, setcurrentItemId] = useState(0);
  const [actionOpenId, setActionOpenId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleEdit = (item: InventoryItem) => {
    setCurrentItem(item);
    setNewQuantity(item.quantity.toString());
    setOpen(true);
    setActionOpenId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      editItem({ ...currentItem, quantity: parseInt(newQuantity) });
      setOpen(false);
    }
  };

  const { colorScheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActionOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <div className="grid border-2 border-slate-500 grid-cols-4 p-4 rounded-xl">
        <div className="font-extrabold border-r-2 border-slate-500 text-center">
          Item ID
        </div>
        <div className="font-extrabold border-r-2 border-slate-500 text-center">
          Item Name
        </div>
        <div className="font-extrabold border-r-2 border-slate-500 text-center">
          Category
        </div>
        <div className="font-extrabold text-center">Quantity</div>
      </div>

      <div
        className="flex flex-col py-2 gap-2"
        style={{ maxHeight: "calc(100vh - 230px)", overflow: "auto" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`grid grid-cols-4 group justify-center items-center p-4 rounded-xl ${
              item.quantity < 10
                ? "bg-red-400"
                : colorScheme == "dark"
                ? "bg-slate-800"
                : "bg-slate-300"
            }`}
          >
            <div className="border-r-2 font-bold border-slate-500 text-center">
              {item.id}
            </div>
            <div className="border-r-2 font-bold border-slate-500 text-center">
              {item.name}
            </div>
            <div className="border-r-2 font-bold border-slate-500 text-center">
              {item.category}
            </div>
            <div className="font-bold text-center">{item.quantity}</div>
            <div className="absolute right-12">
              <div className="relative">
                <div
                  className="hover:bg-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer p-1 rounded-full"
                  onClick={() =>
                    setActionOpenId(actionOpenId === item.id ? null : item.id)
                  }
                >
                  <Ellipsis />
                </div>
                {actionOpenId === item.id && (
                  <div
                    ref={dropdownRef}
                    className="absolute p-2 z-50 w-32 gap-1 flex flex-col rounded-xl top-10 right-0"
                    style={{
                      background: "transparent",
                      backgroundColor:
                        colorScheme == "dark"
                          ? "rgba(0, 0, 0, 0.7)"
                          : "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    <button
                      className="px-2 py-1 rounded"
                      style={{ background: Colors[colorScheme].tint }}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setOpenDelete(true);
                        setcurrentItemId(item.id);
                        setActionOpenId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{ background: Colors[colorScheme].itemBackground }}
          className="flex flex-col gap-4 w-[90%] justify-center items-center p-3 rounded-xl shadow-xl"
        >
          <h2 className="text-xl font-bold">Edit Quantity</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-lg">
                Quantity for <strong>{currentItem?.name}</strong>
              </label>
              <input
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                placeholder="Item Quantity"
                required
                autoFocus
                className="w-full bg-opacity-15 font-bold outline-none rounded-[10px] px-2 h-12 text-black"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-gray-400 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded"
                style={{ background: Colors[colorScheme].tint }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <div
          style={{ background: Colors[colorScheme].itemBackground }}
          className="flex flex-col gap-4 w-[100%] justify-center items-center p-5 rounded-xl shadow-xl"
        >
          <h2 className="text-xl flex gap-1">
            Delete <strong>{currentItem?.name}</strong>
          </h2>
          <div className="flex justify-end w-full gap-2 mt-4">
            <button
              type="button"
              onClick={() => setOpenDelete(false)}
              className="bg-gray-400 px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => {
                deleteItem(currentItemId);
                setOpenDelete(false);
              }}
              className="px-3 py-1 rounded bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryTable;
