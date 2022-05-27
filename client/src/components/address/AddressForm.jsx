import { useState } from "react";
import { useDispatch } from "react-redux";
import { upsertAddress } from "../../slice/userSlice";

function AddressForm({ selectedAddress }) {
  const dispatch = useDispatch();

  const [name, setName] = useState(selectedAddress ? selectedAddress.name : "");
  const [contactNumber, setContactNumber] = useState(selectedAddress ? selectedAddress.contactNumber : "");
  const [pinCode, setPinCode] = useState(selectedAddress ? selectedAddress.pinCode : "");
  const [address1, setAddress1] = useState(selectedAddress ? selectedAddress.address1 : "");
  const [address2, setAddress2] = useState(selectedAddress ? selectedAddress.address2 : "");
  const [claim, setClaim] = useState(selectedAddress ? selectedAddress.claim : "");

  const handleSubmit = () => {
    const address = {
      name,
      contactNumber,
      pinCode,
      address1,
      address2,
      claim,
    };
    if(selectedAddress) address._id = selectedAddress._id;

    dispatch(upsertAddress(address));
  };

  return (
    <div className="addressForm">
      {selectedAddress ? "배송지 수정" : "배송지 추가"}
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="연락처"
        value={contactNumber} 
        onChange={(e) => setContactNumber(e.target.value)}
      />
      <input
        placeholder="우편번호"
        value={pinCode} 
        onChange={(e) => setPinCode(e.target.value)}
      />
      <input
        placeholder="주소"
        value={address1}  
        onChange={(e) => setAddress1(e.target.value)}
      />
      <input
        placeholder="상세주소"
        value={address2} 
        onChange={(e) => setAddress2(e.target.value)}
      />
      <input
        placeholder="요청사항"
        value={claim} 
        onChange={(e) => setClaim(e.target.value)}
      />
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
}

export default AddressForm;
