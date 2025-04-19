
interface BudgetItemProps {
  label: string;
  amount: number;
  percentage: number;
}

const BudgetItem = ({ label, amount, percentage }: BudgetItemProps) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">₹{amount.toLocaleString('en-IN')} ({percentage}%)</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-yatri-blue dark:bg-yatri-blue-light h-2.5 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default BudgetItem;
