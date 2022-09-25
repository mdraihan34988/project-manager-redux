import React from 'react'

function CancelButton({control}) {
  return (
    <button
        type="button"
        className="group relative w-full flex justify-center my-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        onClick={control}
    >
        Cancel
    </button>
  )
}

export default CancelButton