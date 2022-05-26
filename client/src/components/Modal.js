import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GIVE_ENCOURAGEMENT } from '../utils/mutations'
import { QUERY_GOALS, QUERY_ME } from '../utils/queries'
import party from 'party-js';
import { idbPromise } from '../utils/idb'


export default function Modal({
  goal,
  setShowModal,
  showModal,
  message,
  setMessage,
}) {
  const [giveEncouragement, { error }] = useMutation(GIVE_ENCOURAGEMENT)

  const handleClick = async (id, e) => {
    party.confetti(e.target, {
      count: party.variation.range(70, 40),
    })
    try {
      await giveEncouragement({
        variables: { goalId: id, message, points: 1 },
      })
      setShowModal(false)
      setMessage('')
      idbPromise('goals', 'put', { ...goal, encouragements: { message, points: 1} })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Encourage others! 😸
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <h3 className="p-5">{goal.goalText}</h3>
                <div className="relative p-4 flex flex-col justify-center">
                  <input
                    type="text"
                    placeholder="friendly message here..."
                    value={message}
                    className="h-10 pl-2 color-black"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => handleClick(goal._id, e)}
                  >
                    Give encouragement!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )
}
