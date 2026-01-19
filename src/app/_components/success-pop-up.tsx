import type { Dispatch, SetStateAction } from 'react';

type Props = {
  setSuccessToast: Dispatch<SetStateAction<boolean>>;
};

const SuccessPopUp = ({ setSuccessToast }: Props) => {
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-6 shadow-xl"
    >
      <div className="flex items-center justify-center gap-4 text-center">
        <span className="text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-12 w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            Draft Mode activated!
          </strong>

          <p className="mt-1 text-center text-sm text-gray-700">
            You&apos;re now pulling content from the DatoCMS Draft endpoint,
            with real-time updates! As soon as you make a change on DatoCMS, the
            new content will instantly show up on the pages!
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSuccessToast(false);
          }}
          className="text-gray-500 transition hover:text-gray-600"
        >
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SuccessPopUp;
