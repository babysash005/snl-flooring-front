import React, { ReactNode, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import PopupReload from '@/components/popupReload';
import GenericLoading from '@/components/genericLoading';

interface Value {
  id: string;
  att: string;
  to: string;
  date: string;
  referenceNumber: string;
}
interface Props {
  context? : ReactNode
}
interface ResponseData {
  statusCodes: string;
  statusMessage: string;
  values: Value[];
}

export async function getServerSideProps({context} : Props) {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_ENDPOINT + 'api/Statement/api/statement/getallstatements',
      { withCredentials: true }
    );
    console.log(res.data);
    const responseData: ResponseData = res.data;
    if (responseData.values === undefined) {
      return {
        props: {
          values: [],
        },
      };
    }
    return {
      props: {
        values: responseData.values,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        values: [],
      },
    };
  }
}

interface QuotationsIndexProps {
  values: Value[];
}

export default function QuotationsIndex({ values }: QuotationsIndexProps) {
  const [message, setPopUpMessage] = useState('');
  const [routemessage, setRouteMessage] = useState('');
  const router = useRouter();

  function PushToHome() {
    router.push('/');
  }

  function PushToStatements() {
    router.push('/statements');
  }

  const DetailsStatements = async (event: React.FormEvent, id: string): Promise<void> => {
    event.preventDefault();
    router.push('/statements?q=' + id);
  };

  const DeleteStatement = async (event: React.FormEvent, id: string) => {
    try {
      event.preventDefault();

      const result = await axios.delete(
        process.env.NEXT_PUBLIC_API_ENDPOINT + 'api/Statement/api/statement/deleteFullStatement?Id=' + id,
        { withCredentials: true }
      );

      if (result.status === 200) {
        setPopUpMessage('Statement Delete Successfully');
        setRouteMessage('statementslistindex');
      } else {
        setPopUpMessage('Statement Failed To Delete');
        setRouteMessage('statementslistindex');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [loadingStateActive , setLoadindState] = useState(false);
  const GeneratePDF  =async (event: React.FormEvent , id : string , referenceNumber : string) => {
    debugger;
    event.preventDefault();
    setLoadindState(true)
    try {
      
      const url = process.env.NEXT_PUBLIC_API_ENDPOINT +"Home/StatementHTML?q=" + id;
      const link = document.createElement('a');
    link.href = url;
    link.download = referenceNumber +'.pdf';
    link.target = '_blank';
    link.click();


      // const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+'api/Statement/api/statement/Generatepdf?q=' +  id, {
      //   responseType: 'arraybuffer',
      // });
      //   debugger;
      // // Create a Blob from the response data
      // debugger;
      // const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // // Generate a temporary URL for the Blob
      // const url = URL.createObjectURL(blob);
  
      // // Trigger a file download using the temporary URL
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = referenceNumber +'.pdf';
      // link.click();
  
      // // Clean up the temporary URL
      // URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
    setLoadindState(false)
  }

  return (
    <div className="w-px-[00px]">
    <GenericLoading loadingSTST={loadingStateActive} />
      <PopupReload message={message} route={routemessage} />
      <button
        type="button"
        onClick={PushToStatements}
        className="fixed top-24 left-64  bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-blue-500 hover:border border-blue-500"
      >
        Create Statement
      </button>
      <button
        type="button"
        onClick={PushToHome}
        className="fixed  top-24 left-[400px] bg-yellow-500 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-yellow-500 hover:border border-yellow-500"
      >
        Close
      </button>
      <br />  <br />  <br />
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0 bg-blue-500">
              <div className="flex flex-wrap items-center ">
                <div className="relative w-full  px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold  text-base text-white">Statements</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-white text-gray-400 active:bg-indigo-600 text-xs  uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 font-semibold"
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Reference Number
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      To
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      ATT
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                  </tr>
                </thead>

                <tbody>
                  {values && values.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="text-center py-4">
                      No Data....
                      </td>
                    </tr>
                  ) : (
                    values.map((item) => (
                      <tr key={item.id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {item.referenceNumber}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.att}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.to}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                          <button
                            type="submit"
                            onClick={(e) => DetailsStatements(e, item.id)}
                            className="text-white bg-blue-500 hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                          >
                            Details
                          </button>
                          <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                          <button
                        type="submit"  onClick={e => GeneratePDF(e , item.id , item.referenceNumber)}
                        className="text-white bg-blue-500 hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                      >
                        Generate PDF
                      </button>

                      <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                          <button
                            type="submit"
                            onClick={(e) => DeleteStatement(e, item.id)}
                            className="text-white bg-red-500 hover:bg-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
