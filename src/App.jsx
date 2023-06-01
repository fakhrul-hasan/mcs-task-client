import Swal from "sweetalert2";
import "./App.css";
import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import { data } from "autoprefixer";

function App() {
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              fetchData();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          fetchData();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your task added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card flex-shrink-0 w-full shadow-2xl bg-base-100"
      >
        <div className="card-body flex flex-row">
          <label className="label max-w-sm">
            <span className="label-text">Title</span>
          </label>
          <span className="flex flex-col">
            <input
              type="text"
              placeholder="title"
              className="input input-bordered max-w-sm"
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
              className="input input-bordered flex-grow"
              {...register("description", { required: true })}
            />
            {errors.desRequired && (
              <span className="text-red-600">Description is required</span>
            )}
          </span>
          <select
            {...register("status")}
            className="select select-primary w-full max-w-xs"
          >
            <option disabled selected value="default">
              Select task status
            </option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button className="btn btn-primary">Add Task</button>
        </div>
      </form>
      <div className="grid grid-cols-3 gap-4 p-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            handleDelete={handleDelete}
            fetchData={fetchData}
          ></TaskCard>
        ))}
      </div>
    </>
  );
}

export default App;
