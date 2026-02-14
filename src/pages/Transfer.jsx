import { useEffect, useState } from "react";
import {
  getAccounts,
  createTransaction
} from "../services/transactionService";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showLoading } from "../utils/alert";


function Transfer() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  const [form, setForm] = useState({
    fromAccount: "",
    toAccount: "",
    amount: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAccounts() {
      const data = await getAccounts();
      setAccounts(data.accounts);

      if (data.accounts.length > 0) {
        setForm((prev) => ({
          ...prev,
          fromAccount: data.accounts[0]._id
        }));
      }
    }

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    showLoading("Processing transaction...");

    await createTransaction({
      ...form,
      amount: Number(form.amount),
      idempotencyKey: generateIdempotencyKey()
    });

    await showSuccess("Transaction Successful!");
    navigate("/dashboard");
  } catch (err) {
    showError(err.response?.data?.message || "Transaction Failed");
  }
};


  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse top-0 left-0"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-600 opacity-20 rounded-full blur-3xl animate-pulse bottom-0 right-0"></div>
      </div>

      <div className="flex justify-center items-center min-h-screen px-6 relative z-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-12 w-full max-w-2xl">

          <h2 className="text-3xl font-bold text-center mb-10">
            Transfer Money
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* FROM ACCOUNT (RED) */}
            <div>
              <label className="block mb-2 text-red-400 font-semibold">
                From Account
              </label>
              <select
                name="fromAccount"
                value={form.fromAccount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
              >
                {accounts.map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc._id}
                  </option>
                ))}
              </select>
            </div>

            {/* TO ACCOUNT (GREEN) */}
            <div>
              <label className="block mb-2 text-green-400 font-semibold">
                To Account
              </label>
              <input
                type="text"
                name="toAccount"
                placeholder="Enter Receiver Account ID"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* AMOUNT */}
            <div>
              <label className="block mb-2 font-semibold">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter Amount"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all duration-300 text-white font-semibold"
            >
              {loading ? "Processing..." : "Transfer"}
            </button>

          </form>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    </div>
  );
}

export default Transfer;
