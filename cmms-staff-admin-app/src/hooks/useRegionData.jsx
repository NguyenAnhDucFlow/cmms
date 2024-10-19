import { useEffect, useState } from "react";
import axios from "axios";

const useRegionData = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  // api get all provinces

  const fetchProvinces = async () => {
    const response = await axios.get("https://provinces.open-api.vn/api/p");
    setProvinces(response.data);
  };

  // api get all districts of a province

  const fetchDistricts = async (provinceCode) => {
    const response = await axios.get(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
    );
    setDistricts(response.data.districts);
  };

  // api get all wards of a district

  const fetchWards = async (districtCode) => {
    const response = await axios.get(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
    );
    setWards(response.data.wards);
  };

  return { provinces, districts, wards, fetchDistricts, fetchWards };
};
export default useRegionData;
