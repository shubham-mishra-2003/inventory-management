import { useTheme } from "@/hooks/ThemeProvider";

type FilterProps = {
  setFilteredCategory: React.Dispatch<React.SetStateAction<string>>;
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
};

const options = [
  { title: "All categories", value: "" },
  { title: "Electronics", value: "electronics" },
  { title: "Furniture", value: "furniture" },
  { title: "Households", value: "households" },
  { title: "Groceries", value: "groceries" },
  { title: "Clothing", value: "clothing" },
];

const Filter: React.FC<FilterProps> = ({
  setFilteredCategory,
  setSortAscending,
}) => {
  const { colorScheme } = useTheme();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "asc") {
      setSortAscending(true);
    } else if (value === "dsc") {
      setSortAscending(false);
    }
  };

  return (
    <div className="flex gap-1 sm:gap-3 md:gap-4">
      <select
        onChange={(e) => setFilteredCategory(e.target.value)}
        className={`font-bold w-24 text-[13px] sm:text-[15px] outline-none rounded-[10px] p-2 ${
          colorScheme === "dark"
            ? "text-white bg-slate-800"
            : "bg-slate-200 text-black"
        }`}
      >
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>

      <select
        onChange={handleSortChange}
        className={`font-bold truncate w-24 text-[13px] sm:text-[15px] outline-none rounded-[10px] p-2 ${
          colorScheme === "dark"
            ? "text-white bg-slate-800"
            : "bg-slate-200 text-black"
        }`}
      >
        <option value="">Sort</option>
        <option value="asc">Sort Ascending</option>
        <option value="dsc">Sort Descending</option>
      </select>
    </div>
  );
};

export default Filter;
