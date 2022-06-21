import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../slice/userSlice";

function Mypage() {
  const dispatch = useDispatch();
  const { user, addresses } = useSelector((store) => store.user);

  useEffect(() => {
      dispatch(getUser());
  }, []);

  console.log({user, addresses});
  return <div>Mypage</div>;
}

export default Mypage;
