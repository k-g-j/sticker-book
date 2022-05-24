import React from 'react'

function Steps({ goal }) {
  return (
    <div>
      <ul>
        <li>{goal.steps}</li>
        <li>{goal.step.completed}</li>
      </ul>
    </div>
  )
}

export default Steps