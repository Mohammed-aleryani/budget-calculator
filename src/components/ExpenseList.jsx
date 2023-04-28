import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, clearItems, deleteItem, handleEdit }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              deleteItem={deleteItem}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>

      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear expense
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
