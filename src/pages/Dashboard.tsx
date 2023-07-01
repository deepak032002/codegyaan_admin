import React, { useEffect } from "react";
import { useGetUserQuery } from "../redux/services/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUserData } from "../redux/features/AuthSlice";

const Dashboard = () => {

  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch()
  const { isLoading, data } = useGetUserQuery(token)

  useEffect(() => {
    if (data) dispatch(setUserData(data.userData))
  }, [data])

  if (isLoading) return <>Loading...</>

  return <div>Dashboard</div>;
};

export default Dashboard;
