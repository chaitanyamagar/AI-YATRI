
const BudgetPlannerHeader = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <span className="inline-block px-3 py-1 text-sm font-medium text-yatri-orange bg-yatri-orange/10 rounded-full mb-3">
        AI Budget Planner
      </span>
      <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 dark:text-white">
        Plan Your Travel Budget
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        Our AI will help you calculate and optimize your travel budget with real-time pricing data
      </p>
    </div>
  );
};

export default BudgetPlannerHeader;
