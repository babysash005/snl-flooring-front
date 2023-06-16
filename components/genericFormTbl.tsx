'use client';

import React, { ChangeEvent, MouseEvent } from "react";
import { useState , useEffect } from "react";
import axios from "axios";

interface Items {
  Description: string;
  Qty: number;
  UnitPrice: number;
  Total: number;
  GenericId: string;
  Id: number | null;
  uomid : number ;
  uom : string;
}

interface  uom {
  id : number;
  name  : string
}

type PopupProps = {
  onClose: (data: Items) => void;
};

interface FormData {
  Description: string;
  Qty: number;
  UnitPrice: number;
  Total: number;
  GenericId: string;
  Id: number | null;
  uomid : number  ;
  uom : string;
}

export default function GenericFormTbl({ onClose }: PopupProps) {
  const [popup, setPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    Description: "",
    Qty: 0,
    UnitPrice: 0,
    Total: 0,
    GenericId : "",
    Id : 0,
    uomid : 0,
    uom : ''
  });
  const [errorMessage, setErrorMessage] = useState(false);

  function calculateTotal() {
    let value = formData.Qty * formData.UnitPrice;
    setFormData((formData) => ({ ...formData, Total: value }));
  }

  const toggleModal = () => {
    setPopup(!popup);
  };
  const [uoms, setUOMS] = useState<uom[]>([]);

  useEffect(() => {
    // Fetch the data from the API
    axios
      .get<uom[]>(process.env.NEXT_PUBLIC_API_ENDPOINT+ "api/UOMs/uoms/getalluoms" ,  { withCredentials: true })
      .then((response) => {
        // Extract the dropdown options from the API response
        const options = response.data;
        setUOMS(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmit = () => {
  
    if (
      formData.Description === "" ||
      formData.Qty === 0 ||
      formData.Total === 0 ||
      formData.UnitPrice === 0
    ) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      const data: Items = { ...formData };
      onClose(data);
      setFormData({
        Description: "",
        Qty: 0,
        UnitPrice: 0,
        Total: 0,
        GenericId : "",
        Id : 0,
        uomid : 0,
        uom : ""

      });
      toggleModal();
    }
  };

  return (
    <>
      <br />
      <button
        className="relative left-64 py-2 px-6 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={toggleModal}
      >
        Add Item
      </button>

      <br />
      {popup && (
        <div className="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              {/* <span>  { errorMessage === true ? (
                <>Please Ensure All Fields are filled</>
              ):(<></>)}</span> */}

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                  Description
                </label>
                <input
                  type="text"
                  id="Description"
                  name="Description"
                  value={formData.Description}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormData((formData) => ({ ...formData, [name]: value }));
                  }}
                  className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>


              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <label  className="block text-sm font-medium text-gray-700">Select Unit of measure</label>
                  <select id="uom" name="uom" autoComplete="uom" value={formData.uom}
  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
    debugger;
    const { name, value } = event.target;
    let uomidvalue = uoms.find(x =>x.name == value)?.id;
    setFormData((formData) => ({
      ...formData,
      uomid :uomidvalue || 0,
      [name]: value,
      
    }));
  }}  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {/* <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option> */}
                    <option key="-1" value="-1">Select.....</option>
              {uoms.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
                  </select>
                </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                  Qty
                </label>
                <input
                  type="number"
                  id="Qty"
                  name="Qty"
                  value={formData.Qty}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormData((formData) => ({ ...formData, [name]: parseInt(value) }));
                  }}
                  className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="UnitPrice">
                  UnitPrice
                </label>
                <input
                  type="number"
                  id="UnitPrice"
                  name="UnitPrice"
                  value={formData.UnitPrice}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormData((formData) => ({ ...formData, [name]: parseFloat(value) }));
                  }}
                  onBlur={calculateTotal}
                  className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                  Total
                </label>
                <input
                  type="text"
                  id="Total"
                  name="Total"
                  value={formData.Total}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormData((formData) => ({ ...formData, [name]: value }));
                  }}
                  readOnly
                  className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={toggleModal}
                >
                  <i className="fas fa-times"></i> Close
                </button>
                <button
                  type="submit"
                  className="relative left-2 py-2 px-4 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSubmit}
                >
                  <i className="fas fa-times"></i> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
