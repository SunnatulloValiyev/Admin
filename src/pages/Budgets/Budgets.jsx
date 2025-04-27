import React from 'react';
import { useCollectionsData } from "../../hooks/useCollectionsData";
import ReactApexChart from "react-apexcharts";

function Budgets() {
  const { data, isPending, error } = useCollectionsData();

  if (isPending) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  if (!data?.budgets || !data?.transactions) return <div className="flex justify-center items-center h-screen">No budget data available</div>;

  const totalBudgetsLimit = data.budgets.reduce((sum, budget) => sum + (budget.maximum || 0), 0);
  
  // Find Entertainment budget
  const entertainmentBudget = data.budgets.find(budget => budget.category === "Entertainment") || {
    category: "Entertainment",
    maximum: 60,
    theme: "#277C78",
    id: 0
  };
  
  // Calculate spent and remaining amounts
  const sportSpending = 15.00;
  const remainingAmount = entertainmentBudget.maximum - sportSpending;

  // Filter entertainment transactions (mock filter - in real app would filter by category)
  const entertainmentTransactions = data.transactions.slice(0, 3).map(tx => ({
    ...tx,
    date: new Date(tx.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }));

  const chartOptions = {
    series: data.budgets.map(budget => budget.maximum || 0),
    options: {
      chart: {
        type: 'donut',
      },
      labels: data.budgets.map(budget => budget.category || 'Uncategorized'),
      colors: data.budgets.map(budget => budget.theme || '#3cb489'),
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
                formatter: () => `$${totalBudgetsLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
              }
            }
          }
        }
      },
      legend: {
        show: false
      }
    }
  };

  return (
    <div className='bg-[#f9f6f1] w-[1665px] p-6 grid grid-cols-1 gap-6'>
      <div className="flex justify-between pl-4 pr-4">
        <h1 className='text-4xl pl-10 mb-4 font-bold'>Budgets</h1>
        <button className="btn btn-neutral">+ Neutral</button>
      </div>
      <div className="flex gap-7 pl-10">
        {/* Left Panel - Budget Overview */}
        <div className="text-white w-[500px]">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Budget Overview</h2>
              <button className="text-blue-500 hover:text-blue-700 flex items-center">
                See Details <span className="ml-1">›</span>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2">
                <ReactApexChart 
                  options={chartOptions.options} 
                  series={chartOptions.series} 
                  type="donut" 
                  height={350}
                />
              </div>
              
              <div className="w-full lg:w-1/2 space-y-4">
                {data.budgets.map((budget) => (
                  <div key={budget.id || budget.category} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="w-3 h-12 rounded-md" style={{ backgroundColor: budget.theme || '#3cb489' }}></div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-600">{budget.category || "Unnamed Budget"}</p>
                      <p className="text-lg font-bold text-gray-800">
                        ${(budget.maximum || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Budget Details */}
        <div className="bg-white w-[808px] p-10 h-[510px] rounded-2xl shadow-md overflow-y-auto">
          {/* Budget Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold" style={{ color: entertainmentBudget.theme }}>
              {entertainmentBudget.category}
            </h2>
            <p className="text-lg mt-2">Maximum of ${entertainmentBudget.maximum.toFixed(2)}</p>
          </div>

          {/* Budget Summary */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-700">Sport</p>
              <p className="text-xl font-bold mt-1 text-red-500">
                -${sportSpending.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-700">Remaining</p>
              <p className="text-xl font-bold mt-1 text-green-500">
                ${remainingAmount.toFixed(2)}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Latest Spending</h3>
            <div className="space-y-4">
              {entertainmentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-start pb-4 border-b last:border-0">
                  {transaction.avatar && (
                    <img 
                      src={transaction.avatar} 
                      alt={transaction.name} 
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium ">{transaction.name}</p>
                      <p className="text-red-500 font-semibold">-${Math.abs(transaction.amount).toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 pl-32 ">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budgets;