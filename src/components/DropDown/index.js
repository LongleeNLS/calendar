export default function DropDown({ dropdownPosition, handleOptionClicker }) {
  return (
    <div
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
      }}
      className="popOvers"
    >
      {["New Job", "Add Time Off", "Add Custom Event"].map((index) => {
        return (
          <button
            key={index}
            // onClick={() =>
            //   handleOptionClicker(`
            //         Task ${Math.floor(Math.random() * 100) + 1}`)
            // }
          >
            {index}
          </button>
        );
      })}
    </div>
  );
}
