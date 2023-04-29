import { render } from "@testing-library/react";
import { mainStore } from "../../../stores/MainStore";
import BalanceAndBet from "./BalanceAndBet";
import { STARTING_BALANCE } from "../../../utils/consts";

describe("BalanceAndBet", () => {
  it("should render initial balance", () => {
    const { getByText } = render(<BalanceAndBet />);

    expect(getByText("BALANCE")).toBeInTheDocument();
    expect(getByText(STARTING_BALANCE)).toBeInTheDocument();
  });

  it("should render initial total bet", () => {
    const { getByText } = render(<BalanceAndBet />);

    expect(getByText("TOTAL BET")).toBeInTheDocument();
    expect(getByText("0")).toBeInTheDocument();
  });

  it("should rerender after balances changes", () => {
    mainStore.userStore.addToBalance(100);
    const { getByText } = render(<BalanceAndBet />);

    expect(getByText(STARTING_BALANCE + 100)).toBeInTheDocument();
  });

  it("should rerender after total bet changes", () => {
    mainStore.userStore.addToTotalBet(1234);
    const { getByText } = render(<BalanceAndBet />);

    expect(getByText("1234")).toBeInTheDocument();
  });
});
