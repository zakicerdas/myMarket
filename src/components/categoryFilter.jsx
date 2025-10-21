export default function filterCategory({ value, onChange, categories = [] }){
    return(
         <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-md"
    >
      <option value="all">All</option>
      {categories.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
    );
}