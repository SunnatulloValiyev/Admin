function Overview() {
  return (
    <div className="bg-[#f9f6f1] h-[1000px] w-[1700px]">
      <h1 className="text-2xl font-bold p-6 pb-4">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mb-6">
        <div className="bg-[#1c1c1e] text-white p-5 rounded-lg">
          <p className="text-sm mb-1">Current Balance</p>
          <p className="text-3xl font-bold">$4,836.00</p>
        </div>

        <div className="bg-white p-5 rounded-lg">
          <p className="text-sm mb-1">Income</p>
          <p className="text-3xl font-bold">$3,814.25</p>
        </div>

        <div className="bg-white p-5 rounded-lg">
          <p className="text-sm mb-1">Expenses</p>
          <p className="text-3xl font-bold">$1,700.50</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mb-6">
        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Pots</h2>
            <div className="flex items-center text-sm text-gray-500">
              See Details <span className="ml-1">›</span>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#e8f5f1] rounded-md flex items-center justify-center mr-3">
              <span className="text-[#3cb489] text-xl">$</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Saved</p>
              <p className="text-2xl font-bold">$850</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-1 h-10 bg-[#3cb489] mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">Savings</p>
                <p className="font-bold">$159</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1 h-10 bg-[#6a8caf] mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">Gift</p>
                <p className="font-bold">$40</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1 h-10 bg-[#e67e22] mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">Concert Ticket</p>
                <p className="font-bold">$110</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1 h-10 bg-[#3498db] mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">New Laptop</p>
                <p className="font-bold">$10</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Budgets</h2>
            <div className="flex items-center text-sm text-gray-500">
              See Details <span className="ml-1">›</span>
            </div>
          </div>

          <div className="flex justify-center mb-2">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full border-[15px] border-[#e0e0e0]"></div>
              <div
                className="absolute inset-0 rounded-full border-[15px] border-[#64b5f6] border-l-transparent border-b-transparent border-r-transparent"
                style={{ transform: "rotate(45deg)" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <p className="text-3xl font-bold">$338</p>
                <p className="text-xs text-gray-500">of $975 limit</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="flex items-center">
              <div className="w-1 h-10 bg-[#3cb489] mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">Entertainment</p>
                <p className="font-bold">$50.00</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1 h-10 bg-[#2c3e50] mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">Bills</p>
                <p className="font-bold">$750.00</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1 h-10 bg-[#e67e22] mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">Dining Out</p>
                <p className="font-bold">$75.00</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1 h-10 bg-[#9b59b6] mr-3"></div>
              <div className="flex-1">
                <p className="text-sm">Personal Care</p>
                <p className="font-bold">$100.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mb-6">
        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Transactions</h2>
            <div className="flex items-center text-sm text-gray-500">
              View All <span className="ml-1">›</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                </div>
                <p>Emma Richardson</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-medium">+$75.50</p>
                <p className="text-xs text-gray-500">19 Aug 2024</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#cd6133] rounded-full overflow-hidden mr-3 flex items-center justify-center text-white">
                  <span>🍽️</span>
                </div>
                <p>Savory Bites Bistro</p>
              </div>
              <div className="text-right">
                <p className="text-red-600 font-medium">-$55.50</p>
                <p className="text-xs text-gray-500">19 Aug 2024</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                </div>
                <p>Daniel Carter</p>
              </div>
              <div className="text-right">
                <p className="text-red-600 font-medium">-$42.30</p>
                <p className="text-xs text-gray-500">18 Aug 2024</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                </div>
                <p>Sun Park</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-medium">+$120.00</p>
                <p className="text-xs text-gray-500">17 Aug 2024</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#f1c40f] rounded-full overflow-hidden mr-3 flex items-center justify-center">
                  <span>🏢</span>
                </div>
                <p>Urban Services Hub</p>
              </div>
              <div className="text-right">
                <p className="text-red-600 font-medium">-$65.00</p>
                <p className="text-xs text-gray-500">17 Aug 2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Recurring Bills</h2>
            <div className="flex items-center text-sm text-gray-500">
              See Details <span className="ml-1">›</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1 h-10 bg-[#3cb489] mr-3"></div>
                <p>Paid Bills</p>
              </div>
              <p className="font-bold">$190.00</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1 h-10 bg-[#e67e22] mr-3"></div>
                <p>Total Upcoming</p>
              </div>
              <p className="font-bold">$194.98</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1 h-10 bg-[#e74c3c] mr-3"></div>
                <p>Due Soon</p>
              </div>
              <p className="font-bold">$59.98</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
