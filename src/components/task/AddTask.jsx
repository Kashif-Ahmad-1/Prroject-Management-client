import React, { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import axios from "axios";

const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
const WEBSITE_TYPES = ["E-commerce", "Portfolio", "Blog", "Corporate", "Other"];

const AddTask = ({ open, setOpen, task, isEdit ,onTaskUpdate }) => {
  const [priority, setPriority] = useState(isEdit ? task.priority.toUpperCase() : PRIORIRY[2]);
  const [websiteType, setWebsiteType] = useState(isEdit ? task.websiteType : WEBSITE_TYPES[0]);
  const [assets, setAssets] = useState([]); // For handling file upload (if any)
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Used for setting form fields when in edit mode
  } = useForm();

  // Pre-fill form values if editing
  useEffect(() => {
    if (isEdit && task) {
      setValue("projectName", task.projectName);
      setValue("projectTitle", task.projectTitle);
      setValue("description", task.description);
      setValue("price", task.price);
      setValue("projectCompletionTime", task.projectCompletionTime);
    }
  }, [isEdit, task, setValue]);

  const submitHandler = async (data) => {
    const token = localStorage.getItem("authToken");
    try {
      const projectData = {
        projectName: data.projectName,
        projectTitle: data.projectTitle,
        priority: priority.toLowerCase(),
        price: data.price,
        projectCompletionTime: data.projectCompletionTime,
        websiteType,
        description: data.description,
      };

      setUploading(true);

      let response;
      if (isEdit) {
        // Update existing project
        response = await axios.put(
          `http://localhost:5000/api/projects/${task._id}`,
          projectData,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Create a new project
        response = await axios.post(
          "http://localhost:5000/api/projects/create",
          projectData,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status === 200) {
        alert(isEdit ? "Project updated successfully!" : "Project added successfully!");
        setOpen(false); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to add/update project!");
    } finally {
      setUploading(false);
    }
  };

  // Handle file selection for assets
  const handleSelect = (e) => {
    setAssets(e.target.files);
    console.log("Selected files:", e.target.files); // Debugging files
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
          {isEdit ? "Edit Project" : "Add Project"}
        </Dialog.Title>

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Project Name */}
          <div className="w-full">
            <Textbox
              placeholder="Project Name"
              type="text"
              name="projectName"
              label="Project Name"
              className="w-full rounded"
              register={register("projectName", {
                required: "Project Name is required",
              })}
              error={errors.projectName ? errors.projectName.message : ""}
            />
          </div>

          {/* Project Title */}
          <div className="w-full">
            <Textbox
              placeholder="Project Title"
              type="text"
              name="projectTitle"
              label="Project Title"
              className="w-full rounded"
              register={register("projectTitle", {
                required: "Project Title is required",
              })}
              error={errors.projectTitle ? errors.projectTitle.message : ""}
            />
          </div>

          {/* Project Description */}
          <div className="w-full">
            <Textbox
              placeholder="Description"
              type="text"
              name="description"
              label="Description"
              className="w-full rounded"
              register={register("description", {
                required: "Description is required",
              })}
              error={errors.description ? errors.description.message : ""}
            />
          </div>

          {/* Price */}
          <div className="w-full">
            <Textbox
              placeholder="Price"
              type="number"
              name="price"
              label="Price"
              className="w-full rounded"
              register={register("price", { required: "Price is required" })}
              error={errors.price ? errors.price.message : ""}
            />
          </div>

          {/* Project Completion Time */}
          <div className="w-full">
            <Textbox
              placeholder="Project Completion Time"
              type="text"
              name="projectCompletionTime"
              label="Completion Time"
              className="w-full rounded"
              register={register("projectCompletionTime", {
                required: "Completion time is required",
              })}
              error={errors.projectCompletionTime ? errors.projectCompletionTime.message : ""}
            />
          </div>

          {/* Priority Level */}
          <div className="w-full">
            <SelectList
              label="Priority Level"
              lists={PRIORIRY}
              selected={priority}
              setSelected={setPriority}
            />
          </div>

          {/* Website Type */}
          <div className="w-full">
            <SelectList
              label="Website Type"
              lists={WEBSITE_TYPES}
              selected={websiteType}
              setSelected={setWebsiteType}
            />
          </div>

          {/* File Upload for Assets */}
          <div className="w-full flex items-center justify-center mt-4 sm:col-span-2">
            <label
              className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
              htmlFor="imgUpload"
            >
              <input
                type="file"
                className="hidden"
                id="imgUpload"
                onChange={handleSelect}
                accept=".jpg, .png, .jpeg"
                multiple
              />
              <BiImages />
              <span>Add Assets</span>
            </label>
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
          {uploading ? (
            <span className="text-sm py-2 text-red-500">Uploading assets...</span>
          ) : (
            <Button
              label={isEdit ? "Update" : "Submit"}
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
            />
          )}

          <Button
            type="button"
            className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
            onClick={() => setOpen(false)}
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};


export default AddTask;
