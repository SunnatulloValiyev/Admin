import React from "react";
import { useCollectionsData } from "../../hooks/useCollectionsData";

function Transaction() {
  const { data, isPending, error } = useCollectionsData();

  if (isPending) {
    return (
      <div className="flex justify-center m-0 items-center">
        <span className="loader">Loading...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="main bg-[#f9f6f1] min-h-screen w-[1665px] p-6 grid grid-cols-1 gap-6">
      <h1 className="text-2xl font-bold pl-20 mb-4">Transaction</h1>

      <div className="pt-6 pl-20">
        <div className="bg-[#FFFFFF] w-[1400px] min-h-[983px] rounded-lg p-10">
          <div className="flex justify-between items-center mb-8">
            <fieldset className="w-[600px] space-y-1 dark:text-gray-800">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button type="button" className="p-1 focus:outline-none">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 dark:text-gray-800"
                    >
                      <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="Search"
                  placeholder="Search..."
                  className="w-full py-2 pl-10 text-sm rounded-md border border-gray-300 focus:outline-none"
                />
              </div>
            </fieldset>

            <div className="flex gap-6 items-center">
              <div className="sort flex items-center gap-2">
                <span>Sort</span>
                <select className="py-2 pl-2 text-sm rounded-md border border-gray-300">
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="category">Category</option>
                </select>
              </div>
              <div className="transaction flex items-center gap-2">
                <span>Category</span>
                <select className="py-2 pl-2 text-sm rounded-md border border-gray-300">
                  <option value="all">All</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="groceries">Groceries</option>
                  <option value="dining">Dining Out</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-between px-4 font-semibold text-gray-600">
            <span>Recipient / Sender</span>
            <div className="flex gap-40">
              <span>Category</span>
              <span>Transaction Date</span>
            </div>
            <span>Amount</span>
          </div>

          <div className="mt-6 space-y-6">
            {Array.isArray(data?.transactions) &&
              data.transactions.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-4 border-b"
                >
                  <div className="flex items-center gap-2 w-1/4">
                    {item.avatar && (
                      <img
                        src={item.avatar}
                        alt="user"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <span className="font-bold">{item.name || "Unknown"}</span>
                  </div>

                  <div className="w-1/4 pl-44">
                    <span className="font-normal">{item.category || "General"}</span>
                  </div>

                  <div className="w-1/4 pl-30">
                    <span>
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>

                  <div className="w-1/4 text-right">
                    <span className="font-bold">{item.amount ? `${item.amount} $` : "0 $"}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
