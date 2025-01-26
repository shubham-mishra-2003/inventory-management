import { useState, useEffect } from "react";
import InventoryTable from "../components/InventoryTable";
import AddItemForm from "./AddItemForm";
import Filter from "./Filter";

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  quantity: number;
};

const Table = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string>("");
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("inventory") || "[]");
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: InventoryItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const editItem = (updatedItem: InventoryItem) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const filteredItems = items
    .filter((item) =>
      filteredCategory ? item.category === filteredCategory : true
    )
    .sort((a, b) =>
      sortAscending ? a.quantity - b.quantity : b.quantity - a.quantity
    );

  return (
    <div className="flex flex-col px-10 h-full">
      <div className="flex justify-between w-full items-center">
        <Filter
          setFilteredCategory={setFilteredCategory}
          setSortAscending={setSortAscending}
        />
        <AddItemForm addItem={addItem} />
      </div>
      <div className="flex h-full w-full">
        <InventoryTable
          items={filteredItems}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      </div>
    </div>
  );
};

export default Table;
