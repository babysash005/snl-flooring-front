import GenericStatementTbl from "@/components/genericStatementsForm";
import { data } from "autoprefixer";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import Popup from "@/components/popup";

interface BuildTableProps {
  listItems: Items[];
  onDelete: (id: string) => void;
  Subtotal : number ,

  BalanceOutStanding : number
}

type ItemsList = {
  // existing properties...
  listItems?: Items[] | null;
};

interface Items {
  ItemDescription: string;
  InvNo: string;
  Amount: number;
  RecordDate: string;
  GenericId: string;
  Id: number | null;
}

interface StatementFormData {
  ATT: string;
  To: string;
  Contact: string;
  Date: string;
  BalanceOutStanding: number;
 

  Items: Items[];
  Id: number | null;
  CellPhone: string;
}

// interface InputJson {
//   ATT: string;
//   To: string;
//   Date: string;
//   Total: number;
//   SubTotal: number;
//   VAT: number;
//   Items: {
//     Description: string;
//     Qty: string;
//     UnitPrice: number;
//     Total: number;
//     GenericId: string;
//   }[];
//   Id: number;
//   Jobsite: string;
// }
interface MyData {
  att: string;
  to: string;
  contact: string;
  date: string;
  balanceOutStanding: number;
  items: Item[];
  id: number;
  cellPhone: string;
}

interface Item {
  itemDescription: string;
  invNo: string;
  amount: number;
  genericId: string;
  id: number;
  recordDate: string;
}
export default function Statements() {
 
  const router = useRouter();
  const { q }  = router.query;
  const [formData, setFormdata] = useState<StatementFormData>({
    BalanceOutStanding: 0, // Ensure it's a number, not a string
    ATT: "",
    To: "",
    Contact: "",
    Date: new Date().toString(),
   
    CellPhone: "",
    Items: [],
    Id: null
  });
  const [message , setPopUpMessage] = useState("");

  useEffect(() => {
    // Fetch the data from the API
    if(q !== null && q  !== "")
    {
      LoadData(q);
    }
   
     
  }, []);
async function LoadData(qvalue :any) {
  debugger;
  try {
    const result = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+"api/Statement/api/statement/getstatment?Id=" + q , { withCredentials : true}).then(( response) =>{
      debugger;
      console.log(response);
  

      setFormdata((formdata) => ({
        
        ...formdata,
        Id : response.data.values.id,
        ATT :  response.data.values.att,
        To :  response.data.values.to,
        Contact : response.data.values.contact,
        Date : moment(new Date(response.data.values.date)).format("YYYY-MM-DD") ,
        // Items:  response.data.values.items,
        Items: response.data.values.items.map((v : any) => ({
          ItemDescription: v.itemDescription,
          RecordDate: moment(new Date(v.recordDate.toString())).format("YYYY-MM-DD") ,
          InvNo: v.invNo,
          Amount: v.amount,
          GenericId: v.genericId,
          Id : v.id
        })),
   
       BalanceOutStanding : response.data.values.balanceOutStanding,
      }))
    }).catch(error => {
      console.log(error);
    });
    
  } catch (error) {
    console.log(error);
  }
}

function CheckString(id : string)
{
  debugger;
  try {
    let checkvalue = parseInt(id);
    if(checkvalue === undefined || Number.isNaN(checkvalue))
    {
      return false;
    }
   else{
    return true;
   }
  } catch (error) {
    return false;
  }
}


  async function DeleteTempRecord(id: string) {
    debugger;

    

    let ItemTotalSub : any = 0; ;
    if(CheckString(id) === true)
    {
      if(formData.Items.length > 1)
    {
      let idvalue = parseInt(id);
      const result = await axios.delete(process.env.NEXT_PUBLIC_API_ENDPOINT+"api/Statement/api/statement/deleteRecordFromStatement?Id=" + idvalue ,
      { withCredentials : true});
      debugger;
      if(result.status === 200)
      {
        setFormdata((formdata) => ({
          ...formdata,
        
          Items: formdata.Items.filter((item) => item.Id !== idvalue),
        }));
        ItemTotalSub  = formData.Items.find((item) => item.Id === idvalue)?.Amount;
        UpdateSubtotalDelete(ItemTotalSub);
       // LoadData(q);
      }else{
        setPopUpMessage("Oops!!! , Unable to delete Statement")
      }
    }else{
      setPopUpMessage( "Oops!!! , Please ensure you have more than one item in Statement before deleteing and item");  
    }
      
    }else{
     
      setFormdata((formdata) => ({
        ...formdata,
      
        Items: formdata.Items.filter((item) => item.GenericId !== id),
      }));
      ItemTotalSub  = formData.Items.find((item) => item.GenericId === id)?.Amount;
      UpdateSubtotalDelete(ItemTotalSub);
    }

  }



  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const newDate = moment(new Date(event.target.value)).format("YYYY-MM-DD");
    setFormdata({ ...formData, Date: newDate });
    console.log(newDate); // value picked from date picker
  };

  const [popupData, setPopupData] = useState<Items[] | null>(null);

  // function generateRandomId() {
  //   const timestamp = Date.now();
  //   const random = Math.random().toString(36).substring(2);
  //   return `${timestamp}-${random}/`;
  // }
  function generateRandomId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomId = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomId += chars.charAt(randomIndex);
    }
    return randomId;
  }
  function receievePopUpData(data: Items) {
    debugger;
    data.GenericId = generateRandomId();
    //setFormdata({ ...formData, Items: [...formData.Items, data] });

    setFormdata((formData) => {
      debugger;
      const updatedItems = Array.isArray(formData.Items)
        ? [...formData.Items, data]
        : [data];
    
      return { ...formData, Items: updatedItems };
    });
    console.log(formData.Items);
    UpdateSubtotal(data);
    console.log(formData.Items);
  }
  function UpdateSubtotal(data : Items) {
    const balanceOutstanding: number = formData.BalanceOutStanding +  parseInt(data.Amount);
   debugger;
  
    setFormdata((prevFormData) => ({
      ...prevFormData,
      
      BalanceOutStanding: balanceOutstanding,
    }));
    if(formData.Items !== null || formData.Items !== undefined)
    {
      UpdateGrandTotal(balanceOutstanding, false)
    }else{
      UpdateGrandTotal(data.Amount, false)
    }
   
  }

  function UpdateSubtotalDelete(total : number) {
    debugger;
     const subtotalValue = formData.BalanceOutStanding - total;
    
   
     setFormdata((prevFormData) => ({
      
       ...prevFormData,
       subtotalValue : prevFormData.BalanceOutStanding - total,
       SubTotal: subtotalValue,
     }));
      
     
     UpdateGrandTotal(subtotalValue, true)
   }

   function UpdateGrandTotal(Subtotal : number  , Remove : boolean )
   {
    debugger;
    if (Remove) {
      
      setFormdata((prevFormData) => ({
        ...prevFormData,
        
        BalanceOutStanding: Subtotal ,
      }));
    }else{
     
      setFormdata((prevFormData) => ({
        ...prevFormData,
       
        BalanceOutStanding: Subtotal ,
      }));
    }
  

   }
   const [submitdata, setSubmitData] = useState<MyData>({
    balanceOutStanding: 0, // Ensure it's a number, not a string
    att: "",
    to: "",
    contact: "",
    date: new Date().toString(),
   
    cellPhone: "",
    items: [],
    id: 0
  });
   async function submit(event :  React.FormEvent )
   {
    debugger;
    event.preventDefault();
    try {

      console.log(JSON.stringify(formData));
      const items: Item[] = formData.Items.map((item) => ({
        itemDescription: item.ItemDescription,
        invNo: item.InvNo,
        amount: item.Amount,
        genericId: item.GenericId,
        id: item.Id ?? 0,
        recordDate: item.RecordDate,
      }));
  
      const newData: MyData = {
        att: formData.ATT,
        to: formData.To,
        contact: formData.Contact,
        date: formData.Date,
        balanceOutStanding: formData.BalanceOutStanding,
        items: items,
        id: formData.Id ?? 0,
        cellPhone: formData.CellPhone,
      };
      
      if(VaildationCheck() === 2)
      {
        if(formData.Id === null || formData.Id === 0)
        {





          const result = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+ "api/Statement/api/statement/savestatement" , formData , { withCredentials: true});  debugger;
          if(result.status === 200)
          {
            setPopUpMessage("Statement Save Sucessfully")
          }else{
            setPopUpMessage("Oops !!!! Statement failed to save, try again later")
          }
        }else{
          
          const result = await axios.put(process.env.NEXT_PUBLIC_API_ENDPOINT+ "api/Statement/api/statement/updatestatement" , formData , { withCredentials: true});  debugger;
          if(result.status === 200)
          {
           // LoadData(q);
            setPopUpMessage("Statement Update Sucessfully")
          }else{
            setPopUpMessage("Oops !!!! Statement failed to Update, try again later")
          }
        }
     
      }else{
        setPopUpMessage("Please ensure all fields are filled and you have added at least 1 item");
      }
     
      
    } catch (error) {
      console.log(error);
      // setPopUpMessage("Oops !!!! Statement failed to save, try again later")
    }
   }
   function VaildationCheck()
   {
    let count : number  = 0;
    if(formData.Items.length > 0)
    {
      count+= 1;
    }
    if(formData.ATT !== null && formData.ATT !== ""  && formData.Date !== null && formData.Date !== ""
    && formData.To !== null && formData.To !== "" 
    && formData.Contact !== null && formData.Contact !== "" )
    {
      count+= 1;
    }
    return count;
   }


 //const  subtotalresult = UpdateSubtotal();

  return (
    
    <div className="mt-16">
      <Popup message={message} />
      <div className="relative top-2 right-[45rem] w-[60rem]">
        <div className="relative left-full">
          <div className="shadow overflow-hidden sm:rounded-md px-4 py-4 bg-blue-400 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-white">
            Statement
            </h3>
            <p className="mt-1 text-sm text-white">Build Statement For Customer</p>
          </div>

          <div className="shadow overflow-hidden sm:rounded-md px-4 py-4 bg-white sm:p-6">
            <br />
        
          <button onClick={() => {
            router.push('/statementslistindex');
          }} className=" relative bottom-9 left-2 py-2 px-6 inline-flex justify-center  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" >Close</button>
                
       
          </div>
          
          <form onSubmit={submit} method="POST">
          <button
                  type="submit"
                  className=" relative left-[52rem] bottom-24 py-2 px-6 inline-flex justify-center  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-4 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      To
                    </label>
                    <input
                      type="text"
                      name="To"
                      id="To"
                      value={formData.To}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { name, value } = event.target;
                        setFormdata((formData) => ({
                          ...formData,
                          [name]: value,
                        }));
                      }}
                      autoComplete="given-name"
                      className="mt-1 py-2 px-3 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-3000 rounded-md"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      ATT
                    </label>
                    <input
                      type="text"
                      name="ATT"
                      id="ATT"
                      value={formData.ATT}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { name, value } = event.target;
                        setFormdata((formData) => ({
                          ...formData,
                          [name]: value,
                        }));
                      }}
                      autoComplete="given-name"
                      className="mt-1 py-2 px-3 focus:ring-indigo-500  border border-gray-300 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  rounded-md"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.Date}
                      onChange={onChangeDate}
                      autoComplete="given-name"
                      className="mt-1 py-2 px-3  border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  rounded-md"
                    />
                  </div>
                  <div className="col-span-5">
                    <label className="block text-sm font-medium text-gray-700 ">
                     Contact
                    </label>
                    <textarea
                      name="Contact"
                      id="Contact"
                      value={formData.Contact}
                      onChange={(
                        event: React.ChangeEvent<HTMLTextAreaElement>
                      ) => {
                        const { name, value } = event.target;
                        setFormdata((formData) => ({
                          ...formData,
                          [name]: value,
                        }));
                      }}
                      autoComplete="given-name"
                      className="mt-1 py-2 px-3  border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  rounded-md"
                    ></textarea>
                  </div>
                
                </div>
              </div>
          
            </div>
          </form>
        </div>
      </div>
      <GenericStatementTbl onClose={receievePopUpData} />
      <BuildTable listItems={formData.Items} onDelete={DeleteTempRecord} Subtotal={formData.BalanceOutStanding}BalanceOutStanding={formData.BalanceOutStanding} />
      

      <div>
        
      </div>
    </div>
  );
}

function BuildTable({ listItems, onDelete , Subtotal , BalanceOutStanding }: BuildTableProps) {
  return (
    <>
    
      <div className="mt-3 relative left-[235px]  w-[123rem]">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full top-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white-700 uppercase bg-gray-50 dark:bg-blue-500 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Invoice No
                  </th>
                  <th scope="col" className="px-6 py-3">
                   Record Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listItems &&
                Array.isArray(listItems) &&
                listItems.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center py-4">
                      No Data...
                    </td>
                  </tr>
                ) : (
                  listItems &&
                  Array.isArray(listItems) &&
                  listItems.map((items) => {
                    return (
                      <tr
                        key={items.ItemDescription}
                        className="bg-white border-b dark:bg-white dark:border-gray-700"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {items.InvNo}
                        </td>

                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {items.RecordDate}
                        </td>

                     
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {items.Amount}
                        </td>

                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                          <button
                            type="button"
                            onClick={(e) => onDelete(items.Id != null ? items.Id.toString() : items.GenericId)}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}










                      <tr
                      
                        className="bg-white border-b dark:bg-white dark:border-gray-700"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          
                        </td>

                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                         
                        </td>

                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                         
                         
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                           Balance OutStanding
                             <input
                      type="number"
                      name="BalanceOutStanding"
                      id="BalanceOutStanding" readOnly
                      value={BalanceOutStanding}
                   
                      autoComplete="given-name"
                      className="mt-1 py-2 px-3 w-50  border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  rounded-md"
                    />
                        </td>

                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                      
                        </td>
                      </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

const DeleteTODO = async (
  event: React.FormEvent,
  id: number
): Promise<void> => {
  debugger;

  event.preventDefault();
  debugger;
  try {
    const response = await axios.delete(
      "http://localhost:8000/api/todo/deletetodo/" + id,
      { withCredentials: true }
    );
    console.log("Response:", response.data);
    debugger;
    if (response.status === 204) {
      debugger;
      // setTodos(todos.filter((todo) => todo.Id !== id));
    }
    // setFormdata({
    //     Description: "",

    //   });
  } catch (error: any) {
    console.error("Error submitting form:", error.message);
  }
};
