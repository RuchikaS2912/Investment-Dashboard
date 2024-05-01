import {
  BILLS_TO_BE_PAID,
  INVESTMENT_2023,
  INVESTMENT_2024,
  MONTHLY_SPENDS_2023,
  MONTHLY_SPENDS_2024,
  SALARY_22_23,
  SALARY_23_24,
} from '../actions/actionConstants';

const excelDataReducer = (state, action) => {
  console.log(state, action.type);
  switch (action.type) {
    case INVESTMENT_2024:
      return {
        ...state,
        investments2024: action.payload,
      };
    case MONTHLY_SPENDS_2024:
      return {
        ...state,
        monthlySpends2024: action.payload,
      };
    case SALARY_22_23:
      return {
        ...state,
        salaries_22_23: action.payload,
      };
    case INVESTMENT_2023:
      return {
        ...state,
        investments2023: action.payload,
      };
    case MONTHLY_SPENDS_2023:
      return {
        ...state,
        monthlySpends2023: action.payload,
      };
    case SALARY_23_24:
      return {
        ...state,
        salaries_23_24: action.payload,
      };
    case BILLS_TO_BE_PAID:
      return {
        ...state,
        billsToBePaid: action.payload,
      };
    default:
      return state;
  }
};

export default excelDataReducer;
