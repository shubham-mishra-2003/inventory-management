"use client";

import { useTheme } from "@/hooks/ThemeProvider";
import { Colors } from "./constants/Colors";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import AddItemForm from "@/components/AddItemForm";
import InventoryTable from "@/components/InventoryTable";

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  quantity: number;
};

export default function Home() {
  const { colorScheme } = useTheme();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <div
      style={{
        background: Colors[colorScheme].background,
        color: Colors[colorScheme].text,
      }}
      className="flex flex-col gap-1 overflow-hidden h-full w-full"
    >
      <Header />
      <h1 className="text-xl text-center font-bold mt-2">Inventory Table</h1>
      <div className="flex flex-col gap-3 h-full w-full px-10">
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
    </div>
  );
}

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black text-slate-200 text-2xl font-extrabold">
      Loading...
    </div>
  );
};
