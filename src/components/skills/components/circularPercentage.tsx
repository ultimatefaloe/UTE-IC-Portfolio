'use client';

interface Props {
  percentage: number;
  label: string;
}

const CircularProgress: React.FC<Props> = ({ percentage, label }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className='flex flex-col items-center'>
      <div className='relative w-32 h-32'>
        <svg className='transform -rotate-90 w-32 h-32'>
          <circle
            cx='64'
            cy='64'
            r={radius}
            stroke='currentColor'
            strokeWidth='8'
            fill='none'
            className='text-gray-700'
          />
          <circle
            cx='64'
            cy='64'
            r={radius}
            stroke='currentColor'
            strokeWidth='8'
            fill='none'
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className='text-sky-400 transition-all duration-1000 ease-out'
            strokeLinecap='round'
          />
        </svg>
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-xl font-semibold text-sky-900 dark:text-sky-100'>
            {percentage}%
          </span>
        </div>
      </div>
      <p className='mt-3 text-sm text-sky-900 dark:text-sky-100'>{label}</p>
    </div>
  );
};

export default CircularProgress;