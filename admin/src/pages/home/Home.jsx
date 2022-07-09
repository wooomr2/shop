import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserStats } from "../../slice/userSlice";
import { getMonthlyIncome } from "../../slice/orderSlice";

function Home() {
  const dispatch = useDispatch();
  const userStats = useSelector((store) => store.user.userStats);
  const income = useSelector(store=>store.order.income)

  useEffect(() => {
    dispatch(getUserStats());
    dispatch(getMonthlyIncome());
  }, []);

  console.log({userStats, income});

  return (
    <div className="home">
      <div>home</div>
    </div>
  );
}

export default Home;
