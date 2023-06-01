import React from "react";

const TaskCard = ({ task, handleDelete }) => {
  const { title, description, status, _id } = task;
  return (
    <div className="card w-96 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title">{title}</h2>
    <p>{description}</p>
    <p>Status: {status === 'toDo' ? <span className="text-white font-bold">To Do</span>:<span className="text-blue-500 font-bold">Progress</span>}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Update</button>
      <button onClick={()=>handleDelete(_id)} className="btn btn-info">Delete</button>
    </div>
  </div>
</div>
  );
};

export default TaskCard;
