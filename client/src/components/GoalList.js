import React from 'react'

function GoalList({ goal }) {
  return (
    <div>
      <ul>
        <li>{goal.goalText}</li>
        <li>{goal.completed}</li>
      </ul>
    </div>
  )
}

export default GoalList