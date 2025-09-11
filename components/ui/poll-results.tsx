'use client';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollResultsProps {
  options: PollOption[];
  totalVotes: number;
}

export function PollResults({ options, totalVotes }: PollResultsProps) {
  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div key={option.id} className="space-y-1">
          <div className="flex justify-between font-medium">
            <span>{option.text}</span>
            <span>{option.votes} votes</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${getPercentage(option.votes)}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-slate-500">
            {getPercentage(option.votes)}%
          </div>
        </div>
      ))}
    </div>
  );
}
