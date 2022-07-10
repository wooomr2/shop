import "./home.scss";
import { batch, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserStats } from "../../slice/userSlice";
import { getMonthlyIncome, getOrders } from "../../slice/orderSlice";
import LineChart from "../../components/chart/LineChart";
import ComposedChart from "../../components/chart/ComposedChart";
import { getUsers } from "../../slice/userSlice";

function Home() {
  const dispatch = useDispatch();
  const { userStats, users } = useSelector((store) => store.user);
  const { income, orders } = useSelector((store) => store.order);

  useEffect(() => {
    batch(() => {
      dispatch(getUserStats());
      dispatch(getMonthlyIncome());
      dispatch(getUsers({ perPage: 3, currentPage: 1 }));
      dispatch(getOrders({ perPage: 3, currentPage: 1 }));
    });
  }, []);

  console.log({ users, userStats, orders, income });

  return (
    <div className="home">
      <LineChart data={userStats} title="월 가입자 수" />
      <ComposedChart data={income} title="월 매출 & 판매량" />
      {/* {JSON.stringify(users)}
      {JSON.stringify(orders)} */}
    </div>
  );
}

export default Home;
