import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const { accountId } = useParams();

  useEffect(() => {
    async function fetchTransactions() {
      if (!accountId) return;
      const res = await api.get(`/transactions/history/${accountId}`);
      setTransactions(res.data.transactions || []);
    }

    fetchTransactions();
  }, [accountId]);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse top-0 left-0"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-600 opacity-20 rounded-full blur-3xl animate-pulse bottom-0 right-0"></div>
      </div>

      <div className="flex justify-center items-center min-h-screen px-6 relative z-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-3xl">

          <h2 className="text-3xl font-bold mb-8 text-center">
            Transaction History
          </h2>

          {transactions.length === 0 && (
            <p className="text-center text-gray-400">
              No transactions found.
            </p>
          )}

          <div className="space-y-4">

            {transactions.map((tx) => {
              const isDebit = tx.fromAccount === accountId;

              return (
                <div
                  key={tx._id}
                  className="flex justify-between items-center bg-black/40 rounded-xl px-6 py-4 border border-white/10"
                >
                  <div>
                    <p className={`font-semibold ${isDebit ? "text-red-400" : "text-green-400"}`}>
                      {isDebit ? "Debit" : "Credit"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <p className={`text-xl font-bold ${isDebit ? "text-red-500" : "text-green-500"}`}>
                    ₹ {tx.amount}
                  </p>
                </div>
              );
            })}

          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-10 w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    </div>
  );
}

export default Transactions;
