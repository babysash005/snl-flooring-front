import React from "react";
import { useState } from "react";
import moment from "moment";


interface Items {
    ItemDescription: string;
    InvNo: string;
    Amount: number;
    RecordDate: string;

}

type PopupProps = {
  onClose: (data: Items) => void;
};

interface FormData {
    ItemDescription: string;
    InvNo: string;
    Amount: number;
    RecordDate: string;
}

export default function GenericStatementTbl({ onClose }: PopupProps) {
  const [popup, setPopup] = useState(false);
  const [formData, setFormdata] = useState<FormData>({
    ItemDescription: "",
    InvNo: "",
    Amount: 0,
    RecordDate: "",
  });
  const [errormessage, setErrorMessage] = useState(false);

  function calculateTotal() {
    let value = formData.Amount;
    setFormdata({ ...formData, Amount: value });
  }
  const toggleModal = () => {
    setPopup(!popup);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLInputElement>) => {
  
    event.preventDefault();
    if (
      formData.ItemDescription === null ||
      formData.ItemDescription === "" ||
      formData.RecordDate === null ||
      formData.RecordDate === "" ||
      formData.Amount === null ||
      formData.Amount === 0 ||
      formData.InvNo === null ||
      formData.InvNo === ""
    ) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      const data: Items = { ...formData };
      onClose(data);
      setFormdata({
        ItemDescription: "",
        RecordDate: "",
        Amount: 0,
        InvNo: "",
      });

      toggleModal();
    }
  };

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const newDate = moment(new Date(event.target.value)).format("YYYY-MM-DD");
    setFormdata({ ...formData, RecordDate: newDate });
    console.log(newDate); // value picked from date picker
  };

  return (
    <>
      <br />
      <button
        className=" relative left-64 py-2 px-6 inline-flex justify-center  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={toggleModal}
      >
        Add Item
      </button>

      <br />
      {popup && (
        <div
          className="fixed z-10 overflow-y-auto top-0 w-full left-0"
          id="modal"
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <div
              className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {/* <span>  { errormessage === true ? (
                <>Please Ensure All Fields are filled</>
              ):(<></>)}</span> */}

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="ItemDescription"
                  name="ItemDescription"
                  value={formData.ItemDescription}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormdata((formData) => ({
                      ...formData,
                      [name]: value,
                    }));
                  }}
                  className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  RecordDate
                </label>
                <input
                  type="date"
                  id="RecordDate"
                  name="RecordDate"
                  value={formData.RecordDate}
                  onChange={onChangeDate}
                  className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="InvNo"
                >
                  InvNo
                </label>
                <input
                  type="number"
                  id="InvNo"
                  name="InvNo"
                  value={formData.InvNo}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormdata((formData) => ({
                      ...formData,
                      [name]: parseFloat(value), // Convert the value to a number using parseFloat
                    }));
                  }}
                  onBlur={calculateTotal}
                  className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="Amount"
                  name="Amount"
                  value={formData.Amount}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormdata((formData) => ({
                      ...formData,
                      [name]: value,
                    }));
                  }}
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
