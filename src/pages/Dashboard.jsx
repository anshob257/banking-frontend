import { useEffect, useState } from "react";
import {
  getAccounts,
  createAccount,
  getBalance,
  addFundsToOwnAccount
} from "../services/transactionService";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showLoading } from "../utils/alert";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [displayBalance, setDisplayBalance] = useState(0);
  const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

  const [summary, setSummary] = useState({
    totalAccounts: 0,
    totalBalance: 0,
    lastTransaction: null
  });

  // 🔥 Initial Load
  useEffect(() => {
    async function init() {
      let data = await getAccounts();

      if (data.accounts.length === 0) {
        await createAccount();
        data = await getAccounts();
      }

      setAccounts(data.accounts);
      setSelectedAccount(data.accounts[0]._id);
      calculateSummary(data.accounts);
    }

    init();
  }, []);

  // 🔥 Fetch Balance
  useEffect(() => {
    async function fetchBalance() {
      if (!selectedAccount) return;
      const bal = await getBalance(selectedAccount);
      setBalance(bal.balance);
    }
    fetchBalance();
  }, [selectedAccount]);

  // 🔥 Balance Animation
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = balance / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < balance) {
        setDisplayBalance(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setDisplayBalance(balance);
      }
    };

    animate();
  }, [balance]);

  // 🔥 Analytics Calculation (Simplified)
  const calculateSummary = async (accountsList) => {
    let totalBalance = 0;
    let lastTx = null;

    for (let acc of accountsList) {
      const bal = await getBalance(acc._id);
      totalBalance += bal.balance;

      const res = await api.get(`/transactions/history/${acc._id}`);
      const transactions = res.data.transactions || [];

      if (transactions.length > 0) {
        const latest = transactions[0];
        if (!lastTx || new Date(latest.createdAt) > new Date(lastTx.createdAt)) {
          lastTx = latest;
        }
      }
    }

    setSummary({
      totalAccounts: accountsList.length,
      totalBalance,
      lastTransaction: lastTx
    });
  };

  const handleCreateAccount = async () => {
    await createAccount();
    const data = await getAccounts();
    setAccounts(data.accounts);
    calculateSummary(data.accounts);
  };

  const handleAddFunds = async () => {
    if (!selectedAccount) return;

    try {
      showLoading("Adding funds...");
      await addFundsToOwnAccount(selectedAccount);

      const bal = await getBalance(selectedAccount);
      setBalance(bal.balance);

      calculateSummary(accounts);

      await showSuccess("Funds Added Successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to add funds");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse top-0 left-0"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-600 opacity-20 rounded-full blur-3xl animate-pulse bottom-0 right-0"></div>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center px-12 py-8 relative z-10">
        <h1 className="text-3xl font-bold tracking-wide">
          NeoBank Pro
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center relative z-10 px-6 space-y-10 pb-20">

        {/* 🔥 BIG USER NAME */}
        <div className="text-center space-y-2">
  <p className="text-xl text-400 tracking-wide flex items-center justify-center gap-2">
    {getGreeting()},
    <span className="wave-emoji">👋</span>
  </p>

  <h2 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
    {user?.name}
  </h2>
</div>



        {/* 🔥 ANALYTICS PANEL (Only 3) */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-center">
            <p className="text-gray-400">Total Accounts</p>
            <h2 className="text-3xl font-bold mt-2">
              {summary.totalAccounts}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-center">
            <p className="text-gray-400">Total Balance</p>
            <h2 className="text-3xl font-bold text-green-400 mt-2">
              ₹ {summary.totalBalance.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-center">
            <p className="text-gray-400">Last Transaction</p>
            {summary.lastTransaction ? (
              <div className="mt-2">
                <p className="font-bold">
                  ₹ {summary.lastTransaction.amount}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(summary.lastTransaction.createdAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                No transactions yet
              </p>
            )}
          </div>

        </div>

        {/* 🔥 MAIN ACCOUNT CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-12 w-full max-w-4xl transition-all duration-500 hover:scale-[1.01]">

          {/* Account Controls */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">

            <select
              value={selectedAccount || ""}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              {accounts.map((acc) => (
                <option key={acc._id} value={acc._id}>
                  {acc._id}
                </option>
              ))}
            </select>

            <button
              onClick={handleCreateAccount}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              + New Account
            </button>

            {user?.systemUser && (
              <button
                onClick={handleAddFunds}
                className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition"
              >
                + Add 10,000
              </button>
            )}
          </div>

          {/* Balance */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-2xl text-center shadow-xl mb-10">
            <p className="text-lg opacity-80 mb-2">Current Balance</p>
            <h3 className="text-4xl font-extrabold tracking-wide">
              ₹ {displayBalance.toLocaleString()}
            </h3>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => navigate("/transfer")}
              className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-lg"
            >
              Transfer Money
            </button>

            <button
              onClick={() => navigate(`/transactions/${selectedAccount}`)}
              className="px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition text-lg"
            >
              View Transactions
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
