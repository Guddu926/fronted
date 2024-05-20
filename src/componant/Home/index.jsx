import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { Modal } from 'antd';

// Vehicle and model data for demonstration purposes
const vehicleData = {
    2: ['Motorcycle', 'Scooter'],
    4: ['Car', 'SUV']
};

const modelData = {
    'Motorcycle': ['Model A', 'Model B'],
    'Scooter': ['Model C', 'Model D'],
    'Car': ['Model E', 'Model F'],
    'SUV': ['Model G', 'Model H']
};

const BookingForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [wheels, setWheels] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Modal state
    const [carData, setCarData] = useState([]);
    const [bikeData, setBikeData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [vanModalVisible, setVanModalVisible] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    const hideModal = () => setModalVisible(false);
    const handleModalOk = () => setModalVisible(false);

    const hideVanModal = () => setVanModalVisible(false);
    const handleVanModalOk = () => {
        console.log('Selected Item:', selectedItem);
        setVanModalVisible(false);
    };

    const handleWheelsChange = (e) => {
        setWheels(e.target.value);
        setVehicleType('');
        setVehicleModel('');
    };

    const handleVehicleTypeChange = (e) => {
        setVehicleType(e.target.value);
        setVehicleModel('');
    };

    const handleVehicleModelChange = (e) => {
        setVehicleModel(e.target.value);
    };

    const handleItemSelection = (item) => {
        setSelectedItem(item);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            firstName,
            lastName,
            wheels,
            vehicleType,
            vehicleModel,
            startDate,
            endDate
        };
        console.log('Form Data:', formData);
        alert("Successfully Van Booking !")
    };

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bikes");
            setCarData(response.data); // Ensure data is set correctly
            setModalVisible(true);
        } catch (error) {
            console.error("Error fetching Bike data:", error);
        }
    };

    const getVanData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/cars");
            setBikeData(response.data); // Ensure data is set correctly
            setVanModalVisible(true);
        } catch (error) {
            console.error("Error fetching car data:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Vehicle Booking Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <span className="block text-sm font-medium text-gray-700">Number of Wheels</span>
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="wheels"
                                value="2"
                                checked={wheels === '2'}
                                onChange={handleWheelsChange}
                                required
                                className="form-radio"
                            />
                            <span className="ml-2">2</span>
                        </label>
                        <label className="inline-flex items-center ml-4">
                            <input
                                type="radio"
                                name="wheels"
                                value="4"
                                checked={wheels === '4'}
                                onChange={handleWheelsChange}
                                required
                                className="form-radio"
                            />
                            <span className="ml-2">4</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="block text-sm font-medium text-gray-700">Type of Vehicle</span>
                    <div className="mt-2">
                        {wheels && vehicleData[wheels].map((type) => (
                            <label key={type} className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="vehicleType"
                                    value={type}
                                    checked={vehicleType === type}
                                    onChange={handleVehicleTypeChange}
                                    required
                                    className="form-radio"
                                    onClick={wheels === '2' ? getData : getVanData}
                                />
                                <span className="ml-2">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <Modal open={modalVisible} onCancel={hideModal} onOk={handleModalOk}>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-4">Bike Data</h2>
                        <div className="flex space-x-6">
                            <div className="border border-gray-300 rounded-lg shadow-md p-4 w-1/2">
                                <h2 className="text-xl font-semibold mb-2">Bike List</h2>
                                <div className="divide-y divide-gray-200">
                                    {carData.map((item, index) => (
                                        <label key={index} className="inline-flex items-center mr-4">
                                            <input
                                                type="radio"
                                                name="selectedBike"
                                                value={item.name}
                                                onChange={() => handleItemSelection(item)}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{item.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="border border-gray-300 rounded-lg shadow-md p-4 w-1/2">
                                <h2 className="text-xl font-semibold mb-2">Category</h2>
                                <div className="divide-y divide-gray-200">
                                    {carData.map((item, index) => (
                                        <div key={index} className="py-2">
                                            <h2 className="pl-2 text-gray-700">{item.category}</h2>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="mb-4">
                    <span className="block text-sm font-medium text-gray-700">Specific Model</span>
                    <div className="mt-2">
                        {vehicleType && modelData[vehicleType].map((model) => (
                            <label key={model} className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="vehicleModel"
                                    value={model}
                                    checked={vehicleModel === model}
                                    onChange={handleVehicleModelChange}
                                    required
                                    className="form-radio"
                                    onClick={getVanData}
                                />
                                <span className="ml-2">{model}</span>
                            </label>
                        ))}
                    </div>
                    <Modal open={vanModalVisible} onCancel={hideVanModal} onOk={handleVanModalOk}>
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-4">Van Data</h2>
                            <div className="flex space-x-6">
                                <div className="border border-gray-300 rounded-lg shadow-md p-4 w-1/2">
                                    <h2 className="text-xl font-semibold mb-2">Van List</h2>
                                    <div className="divide-y divide-gray-200">
                                        {bikeData.map((item, index) => (
                                            <label key={index} className="inline-flex items-center mr-4">
                                                <input
                                                    type="radio"
                                                    name="selectedVan"
                                                    value={item.name}
                                                    onChange={() => handleItemSelection(item)}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{item.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="border border-gray-300 rounded-lg shadow-md p-4 w-1/2">
                                    <h2 className="text-xl font-semibold mb-2">Category</h2>
                                    <div className="divide-y divide-gray-200">
                                        {bikeData.map((item, index) => (
                                            <div key={index} className="py-2">
                                                <h2 className="pl-2 text-gray-700">{item.category}</h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Book Now</button>
            </form>
        </div>
    );
};

export default BookingForm;
