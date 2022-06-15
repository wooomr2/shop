import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { upsertAddress } from "../../slice/userSlice";
import PostCodeModal from "../postCodeModal/PostCodeModal";

function AddressForm({ selectedAddress, enableInput, setEnableInput }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [claim, setClaim] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    const address = {
      name,
      contactNumber,
      pinCode,
      address1,
      address2,
      claim,
    };
    if (selectedAddress) address._id = selectedAddress._id;
    console.log(address);
    if (
      !(
        address.name.length ||
        address.contactNumber.length ||
        address.pinCode.length ||
        address.address2.length
      )
    )
      return alert("배송 정보를 입력하세요.");
    dispatch(upsertAddress(address));
    setEnableInput(false);
  };

  useEffect(() => {
    setName(selectedAddress?.name || "");
    setContactNumber(selectedAddress?.contactNumber || "");
    setPinCode(selectedAddress?.pinCode || "");
    setAddress1(selectedAddress?.address1 || "");
    setAddress2(selectedAddress?.address2 || "");
    setClaim(selectedAddress?.claim || "");
    return;
  }, [selectedAddress]);

  return (
    <>
      {isModalOpen && (
        <PostCodeModal
          onClick={() => setIsModalOpen((prev) => !prev)}
          setPinCode={setPinCode}
          setAddress1={setAddress1}
        />
      )}
      <div className="shipping-item">
        <div className="shipping-item-left">이름</div>
        <div className="shipping-item-right">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={selectedAddress && !enableInput ? true : false}
          />
        </div>
      </div>
      <div className="shipping-item">
        <div className="shipping-item-left">연락처</div>
        <div className="shipping-item-right">
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            disabled={selectedAddress && !enableInput ? true : false}
          />
        </div>
      </div>
      <div className="shipping-item">
        <div className="shipping-item-left">우편번호</div>
        <div className="shipping-item-right">
          <input type="text" value={pinCode} className="pincode" disabled />
          <button
            onClick={() => setIsModalOpen((prev) => !prev)}
            disabled={selectedAddress && !enableInput ? true : false}
          >
            <span>주소 검색</span>
          </button>
        </div>
      </div>
      <div className="shipping-item">
        <div className="shipping-item-left">기본주소</div>
        <div className="shipping-item-right">
          <input type="text" value={address1} className="explain" disabled />
        </div>
      </div>
      <div className="shipping-item">
        <div className="shipping-item-left">상세주소</div>
        <div className="shipping-item-right">
          <input
            className="explain"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            disabled={selectedAddress && !enableInput ? true : false}
          />
        </div>
      </div>
      <div className="shipping-item">
        <div className="shipping-item-left">배송메시지</div>
        <div className="shipping-item-right">
          <input
            className="explain"
            type="text"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            disabled={selectedAddress && !enableInput ? true : false}
          />
        </div>
      </div>
      <div className="shipping-item">
        {selectedAddress && !enableInput && (
          <>
            <button onClick={() => setEnableInput(true)}>수정하기</button>
          </>
        )}
        {enableInput && (
          <>
            <button onClick={handleSubmit}>수정 완료</button>
            <button onClick={() => setEnableInput(false)}>취소 하기</button>
          </>
        )}
        {!selectedAddress && !enableInput && (
          <button onClick={handleSubmit}>등록하기</button>
        )}
      </div>
    </>
  );
}

export default AddressForm;
