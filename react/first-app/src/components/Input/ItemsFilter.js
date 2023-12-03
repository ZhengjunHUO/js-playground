import "./ItemsFilter.css";

export const ItemsFilter = (props) => {
  const selectChangeHandler = (event) => {
    props.onYearChosen(event.target.value);
  };

  return (
    <div className="items-filter">
      <div className="items-filter__control">
        <label>Filter</label>
        <select value={props.selected} onChange={selectChangeHandler}>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
    </div>
  );
};
