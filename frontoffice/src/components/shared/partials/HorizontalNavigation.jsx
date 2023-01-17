function HorizontalNavigation({ items, onCategoryClick }) {
  return (
    <div className="shadow border-b flex justify-center items-center overflow-x-auto">
      <ul className="flex gap-x-3 w-full">
        {items.map(({ id, name }) => (
          <li
            key={id}
            className="uppercase p-3 hover:scale-[1.2] transition ease-in-out hover:text-yellow-500 hover:cursor-pointer"
            onClick={() => onCategoryClick(id, name)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { HorizontalNavigation };
