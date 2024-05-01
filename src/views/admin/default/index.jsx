import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ActionType } from "../../../store/actions";
import axios from "axios";
import AppContext from "../../../Context";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [sheetData, setSheetData] = useState([]);
  const [investmentType, setInvestmentType] = useState({});
  const { state, dispatch } = useContext(AppContext);

  const investmentTypes = (data) => {
    const invTypes = {};
    for (let i = 1; i < data.length; i++) {
      console.log(data[i][0], data[i][2]);
      if (data !== undefined) {
        // invTypes[data[i][2]] = 0.0;
        invTypes[data[i][0]] =
          parseFloat(invTypes[data[i][0]] || "0.0") + parseFloat(data[i][2]);
      }
      console.log(
        parseFloat(invTypes[data[i][0]]),
        "parseFloat(invTypes[data[i][0]])"
      );
    }
    setInvestmentType(invTypes);
    console.log("invTypes", invTypes);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetch-data");
      console.log(response.data);
      // setSheetData(response.data);
      response.data.map((exceldata) => {
        console.log(exceldata);
        if (exceldata.title === "2024 Investments") {
          dispatch({
            type: ActionType.INVESTMENT_2024,
            payload: exceldata.data,
          });
        }
        if (exceldata.title === "2023 Investments") {
          dispatch({
            type: ActionType.INVESTMENT_2023,
            payload: exceldata.data,
          });
        }
        if (exceldata.title === "Monthly Expense 2023") {
          dispatch({
            type: ActionType.MONTHLY_SPENDS_2023,
            payload: exceldata.data,
          });
        }
        if (exceldata.title === "Monthly Expense 2024") {
          dispatch({
            type: ActionType.MONTHLY_SPENDS_2024,
            payload: exceldata.data,
          });
        }
        if (exceldata.title === "Salary 23-24") {
          dispatch({
            type: ActionType.SALARY_23_24,
            payload: exceldata.data,
          });
        }
        if (exceldata.title === "Salary 22-23") {
          dispatch({
            type: ActionType.SALARY_22_23,
            payload: exceldata.data,
          });
        }
        if (exceldata.title === "Bills to be paid") {
          dispatch({
            type: ActionType.BILLS_TO_BE_PAID,
            payload: exceldata.data,
          });
        }
        setSheetData(response.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (state.excel?.investments2024) {
      console.log("state.excel.investments2024", state.excel.investments2024);
      investmentTypes(state.excel.investments2024);
    }
  }, [state.excel?.investments2024]);
  {
    investmentType.map(
      (type) => console.log(type)
      // <MiniStatistics
      //   startContent={
      //     <IconBox
      //       w="56px"
      //       h="56px"
      //       bg={boxBg}
      //       icon={
      //         <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
      //       }
      //     />
      //   }
      //   name={type}
      //   value="$350.4"
      // />
    );
  }
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        {/* {investmentType.map((type) =>
          console.log(type)
          // <MiniStatistics
          //   startContent={
          //     <IconBox
          //       w="56px"
          //       h="56px"
          //       bg={boxBg}
          //       icon={
          //         <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
          //       }
          //     />
          //   }
          //   name={type}
          //   value="$350.4"
          // />
        )} */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Earnings"
          value="$350.4"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Spend this month"
          value="$642.39"
        />
        <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
        <MiniStatistics
          endContent={
            <Flex me="-16px" mt="10px">
              <FormLabel htmlFor="balance">
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id="balance"
                variant="mini"
                mt="5px"
                me="0px"
                defaultValue="usd"
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gba">GBA</option>
              </Select>
            </Flex>
          }
          name="Your balance"
          value="$1,000"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="New Tasks"
          value="154"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Total Projects"
          value="2935"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
