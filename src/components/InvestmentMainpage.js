import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/css/App.css';
import AppContext from '../Context';
import { ActionType } from '../store/actions';
// import LineChart from "./Charts/BarChart";
// import PieChart from "./Charts/PieChart";

const InvestmentMainPage = () => {
  const [investmentData, set2024InvestmentData] = useState([]);
  const { state, dispatch } = useContext(AppContext);

  // const { investments2024 } = state.excel;
  // console.log('investments', state);
  // // const { investments2024 } = investments;
  // console.log('investments:', investments2024);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3001/fetch-data');
  //     console.log(response.data);
  //     // setSheetData(response.data);
  //     response.data.map((exceldata) => {
  //       console.log(exceldata);
  //       if (exceldata.title === '2024 Investments') {
  //         dispatch({
  //           type: ActionType.INVESTMENT_2024,
  //           payload: exceldata.data,
  //         });
  //       }
  //       if (exceldata.title === '2023 Investments') {
  //         dispatch({
  //           type: ActionType.INVESTMENT_2023,
  //           payload: exceldata.data,
  //         });
  //       }
  //       if (exceldata.title === 'Monthly Expense 2023') {
  //         dispatch({
  //           type: ActionType.MONTHLY_SPENDS_2023,
  //           payload: exceldata.data,
  //         });
  //       }
  //       if (exceldata.title === 'Monthly Expense 2024') {
  //         dispatch({
  //           type: ActionType.MONTHLY_SPENDS_2024,
  //           payload: exceldata.data,
  //         });
  //       }
  //       if (exceldata.title === 'Salary 23-24') {
  //         dispatch({
  //           type: ActionType.SALARY_23_24,
  //           payload: exceldata.data,
  //         });
  //       }
  //       if (exceldata.title === 'Salary 22-23') {
  //         dispatch({
  //           type: ActionType.SALARY_22_23,
  //           payload: exceldata.data,
  //         });
  //       }
  //       if (exceldata.title === 'Bills to be paid') {
  //         dispatch({
  //           type: ActionType.BILLS_TO_BE_PAID,
  //           payload: exceldata.data,
  //         });
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <h1 className="sheets">Google Sheets Integration</h1>
      {/* {investments2024.map((array, index) => (
        <div key={index}>
          {array.map((element, subIndex) => (
            <span key={subIndex}>{element} | </span>
          ))}
        </div>
      ))} */}
      {/* {sheetData.map((sheet) => console.log(sheet))} */}
      {/* {sheetData && <LineChart barchartData={sheetData} />}
      {sheetData && <PieChart piechartData={sheetData} />} */}
    </div>
  );
};

export default InvestmentMainPage;
