import { useCollectionsData } from "../../hooks/useCollectionsData";
import ReactApexChart from "react-apexcharts";

function Overview() {
  const { data, isPending, error } = useCollectionsData();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const totalPots = data.pots.reduce((sum, pot) => sum + (pot.total || 0), 0);
  const totalBudgetsSpent = data.transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalBudgetsLimit = data.budgets.reduce((sum, budget) => sum + (budget.maximum || 0), 0);

  const chartOptions = {
    series: data.budgets.map(budget => budget.maximum),
    options: {
      chart: {
        type: 'donut',
      },
      labels: data.budgets.map(budget => budget.category),
      colors: data.budgets.map(budget => budget.theme),
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Budget',
                formatter: () => `$${totalBudgetsLimit}`
              }
            }
          }
        }
      }
    }
  };

  const getTransactionType = (amount) => amount >= 0 ? "income" : "expense";

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="main bg-[#f9f6f1] min-h-screen w-[1665px] p-6 grid grid-cols-1 gap-6">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1c1c1e] text-white p-5 rounded-lg">
          <p className="text-sm mb-1">Current Balance</p>
          <p className="text-3xl font-bold">${data.balance.current?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || ""}</p>
        </div>

        <div className="bg-white p-5 rounded-lg">
          <p className="text-sm mb-1">Income</p>
          <p className="text-3xl font-bold">${data.balance.income?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || "0.00"}</p>
        </div>

        <div className="bg-white p-5 rounded-lg">
          <p className="text-sm mb-1">Expenses</p>
          <p className="text-3xl font-bold">${data.balance.expenses?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || "0.00"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Pots</h2>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              See Details <span className="ml-1">›</span>
            </button>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#e8f5f1] rounded-md flex items-center justify-center mr-3">
              <span className="text-[#3cb489] text-xl">$</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Saved</p>
              <p className="text-2xl font-bold">${totalPots.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="space-y-3">
            {data.pots.slice(0, 4).map((pot) => (
              <div key={pot.id} className="flex items-center">
                <div className="w-1 h-10" style={{ backgroundColor: pot.theme || '#3cb489' }}></div>
                <div className="flex-1 ml-3">
                  <p className="text-sm">{pot.name || "Unnamed Pot"}</p>
                  <p className="font-bold">${pot.total?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || "0.00"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Budgets</h2>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              See Details <span className="ml-1">›</span>
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <ReactApexChart 
                options={chartOptions.options} 
                series={chartOptions.series} 
                type="donut" 
                height={300}
              />
            </div>
          </div>

          <div className="space-y-3">
            {data.budgets.map((budget) => (
              <div key={budget.id} className="flex items-center">
                <div className="w-1 h-10" style={{ backgroundColor: budget.theme || '#3cb489' }}></div>
                <div className="flex-1 ml-3">
                  <p className="text-sm">{budget.category || "Unnamed Budget"}</p>
                  <p className="font-bold">${budget.maximum?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || "0.00"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Transactions</h2>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              View All <span className="ml-1">›</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.transactions.slice(0, 5).map((transaction) => {
              const type = getTransactionType(transaction.amount);
              return (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                      {type === "income" ? (
                        <span className="text-green-500">↑</span>
                      ) : (
                        <span className="text-red-500">↓</span>
                      )}
                    </div>
                    <div>
                      <p>{transaction.name || "No description"}</p>
                      <p className="text-xs text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`${type === "income" ? "text-green-600" : "text-red-600"} font-medium`}>
                      {type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Recurring Bills</h2>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              See Details <span className="ml-1">›</span>
            </button>
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

            {data.transactions
              .filter(t => t.recurring)
              .slice(0, 2)
              .map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-1 h-10 bg-[#826CB0] mr-3"></div>
                    <p>{transaction.name}</p>
                  </div>
                  <p className="font-bold text-red-600">-${Math.abs(transaction.amount).toFixed(2)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;