import React from "react";

const TaskCard = ({ task }) => {
  const { title, description, status } = task;
  return (
    <div class="card w-96 bg-neutral text-neutral-content">
  <div class="card-body items-center text-center">
    <h2 class="card-title">{title}</h2>
    <p>{description}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Update</button>
      <button class="btn btn-ghost">Delete</button>
    </div>
  </div>
</div>
  );
};

export default TaskCard;
