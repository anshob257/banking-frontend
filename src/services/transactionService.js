import api from "./api";

export const getAccounts = async () => {
  const res = await api.get("/accounts");
  return res.data;
};

export const createAccount = async () => {
  const res = await api.post("/accounts");
  return res.data;
};

export const getBalance = async (accountId) => {
  const res = await api.get(`/accounts/balance/${accountId}`);
  return res.data;
};

export const createTransaction = async (data) => {
  const res = await api.post("/transactions", data);
  return res.data;
};

export const addInitialFunds = async (data) => {
  const res = await api.post(
    "/transactions/system/initial-funds",
    data
  );
  return res.data;
};

export const addFundsToOwnAccount = async (accountId) => {
  const res = await api.post("/transactions/system/initial-funds", {
    toAccount: accountId,
    amount: 10000,
    idempotencyKey: Date.now().toString()
  });
  return res.data;
};


