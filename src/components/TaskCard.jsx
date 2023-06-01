import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const TaskCard = ({ task, handleDelete, fetchData }) => {
  const { title, description, status, _id } = task;

  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>{
    fetch(`http://localhost:5000/tasks/${_id}`,{
      method: 'PUT',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.modifiedCount>0){
        fetchData();
        modalRef.current.close();
      }
    })
  };
  return (
    <>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <p>
            Status:{" "}
            {status === "To Do" ? (
              <span className="text-white font-bold">To Do</span>
            ) : status === "In Progress" ? (
              <span className="text-blue-500 font-bold">Progress</span>
            ) : (<span className="text-green-500 font-bold">Done</span>)}
          </p>
          <div className="card-actions justify-end">
            <button
              // onClick={() => handleUpdate(_id)}
              onClick={openModal}
              className="btn btn-primary"
            >
              Update
            </button>
            <button onClick={() => handleDelete(_id)} className="btn btn-info">
              Delete
            </button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal w-1/2 mx-auto" ref={modalRef}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card flex-shrink-0 w-full shadow-2xl bg-base-100"
        >
          <div className="card-body flex flex-col items-center">
            <label className="label max-w-sm">
              <span className="label-text">Title</span>
            </label>
            <span className="flex flex-col">
              <input
                type="text"
                placeholder="title"
                defaultValue={title}
                className="input input-bordered max-w-lg"
                {...register("title", { required: true })}
              />
              {errors.titleRequired && (
                <span className="text-red-600">Title is required</span>
              )}
            </span>
            <label className="label max-w-sm">
              <span className="label-text">Description</span>
            </label>
            <span className="flex flex-col">
              <input
                type="text"
                placeholder="description"
                defaultValue={description}
                className="input input-bordered max-w-lg"
                {...register("description", { required: true })}
              />
              {errors.desRequired && (
                <span className="text-red-600">Description is required</span>
              )}
            </span>
            <select
              {...register("status")}
              className="select select-primary max-w-lg max-w-xs"
              defaultValue={status}
            >
              <option disabled value="default">
                Select task status
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <button className="btn btn-primary max-w-sm">Add Task</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TaskCard;
