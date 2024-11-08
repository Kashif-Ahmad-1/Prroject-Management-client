import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';

const AssignToDeveloperModal = ({ open, setOpen, taskId, onAssignComplete }) => {
    const [developers, setDevelopers] = useState([]);
    const [selectedDevelopment, setSelectedDevelopment] = useState('');
    const [selectedFigmaDesign, setSelectedFigmaDesign] = useState('');
    const [selectedBackendDevelopment, setSelectedBackendDevelopment] = useState('');
    const [description, setDescription] = useState('');
    const [daysLeft, setDaysLeft] = useState('');
    const [loading, setLoading] = useState(false);

  // Fetch developers list
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get('http://localhost:5000/api/auth/developers',{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        console.log('Developers data:', response.data);  // Inspect the response format

        // Check if the response contains a 'developers' key and is an array
        if (response.data && Array.isArray(response.data.developers)) {
          setDevelopers(response.data.developers);  // Set the developers state
        } else {
          console.error("Developers data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };
    fetchDevelopers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDevelopment || !selectedFigmaDesign || !selectedBackendDevelopment || !description || !daysLeft) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    
    const data = {
        description,
        development: selectedDevelopment, // Assigning developer ID to development
        figmaDesign: selectedFigmaDesign,  // Assigning developer ID to figmaDesign
        backendDevelopment: selectedBackendDevelopment, // Assigning developer ID to backendDevelopment
        daysLeftToCompletion: daysLeft,
      };
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(
          `http://localhost:5000/api/projects/${taskId}/assign`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        if (response.status === 200) {
          alert("Developers assigned successfully!");
          onAssignComplete(response.data); // Notify parent component of the successful assignment
          setOpen(false); // Close modal
        }
      } catch (error) {
        console.error("Error assigning developer:", error);
        alert("Error assigning developers.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-full sm:w-96">
            <Dialog.Title className="text-xl font-bold mb-4">Assign Developers</Dialog.Title>
  
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Description Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Subtask Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded p-2 mt-1"
                  placeholder="Enter subtask description"
                  rows="3"
                />
              </div>
  
              {/* Developer Dropdowns */}
              <div className="space-y-2">
                {/* Developer for Development */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Assign Developer to Development</label>
                  <select
                    value={selectedDevelopment}
                    onChange={(e) => setSelectedDevelopment(e.target.value)}
                    className="border rounded p-2 mt-1"
                  >
                    <option value="">Select Developer</option>
                    {developers.length > 0 ? (
                      developers.map((developer) => (
                        <option key={developer._id} value={developer._id}>
                          {developer.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No developers available</option>
                    )}
                  </select>
                </div>
  
                {/* Developer for Figma Design */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Assign Developer to Figma Design</label>
                  <select
                    value={selectedFigmaDesign}
                    onChange={(e) => setSelectedFigmaDesign(e.target.value)}
                    className="border rounded p-2 mt-1"
                  >
                    <option value="">Select Developer</option>
                    {developers.length > 0 ? (
                      developers.map((developer) => (
                        <option key={developer._id} value={developer._id}>
                          {developer.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No developers available</option>
                    )}
                  </select>
                </div>
  
                {/* Developer for Backend Development */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Assign Developer to Backend Development</label>
                  <select
                    value={selectedBackendDevelopment}
                    onChange={(e) => setSelectedBackendDevelopment(e.target.value)}
                    className="border rounded p-2 mt-1"
                  >
                    <option value="">Select Developer</option>
                    {developers.length > 0 ? (
                      developers.map((developer) => (
                        <option key={developer._id} value={developer._id}>
                          {developer.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No developers available</option>
                    )}
                  </select>
                </div>
              </div>
  
              {/* Days Left Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Days Left to Completion</label>
                <input
                  type="number"
                  value={daysLeft}
                  onChange={(e) => setDaysLeft(e.target.value)}
                  className="border rounded p-2 mt-1"
                  placeholder="Enter days left"
                />
              </div>
  
              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white p-2 rounded-md"
                >
                  {loading ? 'Assigning...' : 'Assign Developers'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  };
  
  export default AssignToDeveloperModal;