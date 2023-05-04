import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car payment", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill", amount: 1200 },
// ];
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : "[]";
function App() {
  const [expenses, setExpenses] = useState([]);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log("useEffect called");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 0 && charge.length > 0) {
      if (edit) {
        const newExpenses = expenses.map((item) =>
          item.id === id ? { ...item, charge, amount } : item
        );
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item Edited" });
      } else {
        const newExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, newExpense]);
        handleAlert({ type: "success", text: "Item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "charge can't be an empty value abn amount must be bigger than zero",
      });
    }
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "Items have deleted" });
  };

  const deleteItem = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "Item has deleted" });
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setEdit(true);
    setCharge(charge);
    setAmount(amount);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          setEdit={setEdit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          deleteItem={deleteItem}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total spending :
        <span className="total">
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}
export default App;
