function HorizontalNavigation({ items }) {
  return (
    <div className="shadow border-b flex justify-center items-center overflow-x-auto">
      <ul className="flex gap-x-3 w-full">
        {items.map((item) => (
          <li key={item} className="uppercase p-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { HorizontalNavigation };
