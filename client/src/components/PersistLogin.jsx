import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";


function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useSelector(authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const res = await axios.get("/refresh", {
          baseURL: process.env.API,
          withCredentials: true,
        });
        console.log(res.data);
        dispatch(setAuth())
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    accessToken
      ? verifyRefreshToken()
      : (isMounted = false && setIsLoading(false));
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
}

export default PersistLogin;
