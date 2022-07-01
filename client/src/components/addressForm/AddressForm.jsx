import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { deleteAddress, upsertAddress } from "../../slice/userSlice";
import PostCodeModal from "../postCodeModal/PostCodeModal";

function ShippingItem({ title, children }) {
  return (
    <div className="shipping-item">
      <div className="shipping-item-left">{title}</div>
      <div className="shipping-item-right">{children}</div>
    </div>
  );
}

function AddressForm({ selectedAddress, enableInput, setEnableInput }) {
  const dispatch = useDispatch();
  const [name, onChangeName, setName] = useInput("");
  const [contactNumber, onChangeContactNumber, setContactNumber] = useInput("");
  const [zonecode, setZonecode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, onChangeAddress2, setAddress2] = useInput("");
  const [claim, onChangeClaim, setClaim] = useInput("");
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  const handleSubmit = () => {
    const address = {
      name,
      contactNumber,
      zonecode,
      address1,
      address2,
      claim,
    };
    if (selectedAddress) address._id = selectedAddress._id;

    if (
      !(
        address.name.length ||
        address.contactNumber.length ||
        address.zonecode.length ||
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
    setZonecode(selectedAddress?.zonecode || "");
    setAddress1(selectedAddress?.address1 || "");
    setAddress2(selectedAddress?.address2 || "");
    setClaim(selectedAddress?.claim || "");
    return;
  }, [selectedAddress]);

  return (
    <>
      {isModalOpen && (
        <PostCodeModal
          onClick={toggleIsModalOpen}
          setZonecode={setZonecode}
          setAddress1={setAddress1}
        />
      )}

      <ShippingItem title={"이름"}>
        <input
          type="text"
          value={name}
          onChange={onChangeName}
          disabled={selectedAddress && !enableInput ? true : false}
        />
      </ShippingItem>

      <ShippingItem title={"연락처"}>
        <input
          type="text"
          value={contactNumber}
          onChange={onChangeContactNumber}
          disabled={selectedAddress && !enableInput ? true : false}
        />
      </ShippingItem>

      <ShippingItem title={"우편번호"}>
        <input className="zonecode" type="text" value={zonecode} disabled />
        <button
          onClick={toggleIsModalOpen}
          disabled={selectedAddress && !enableInput ? true : false}
        >
          <span>주소 검색</span>
        </button>
      </ShippingItem>

      <ShippingItem title={"기본주소"}>
        <input type="text" value={address1} className="explain" disabled />
      </ShippingItem>

      <ShippingItem title={"상세주소"}>
        <input
          className="explain"
          type="text"
          value={address2}
          onChange={onChangeAddress2}
          disabled={selectedAddress && !enableInput ? true : false}
        />
      </ShippingItem>

      <ShippingItem title={"배송메시지"}>
        <input
          className="explain"
          type="text"
          value={claim}
          onChange={onChangeClaim}
          disabled={selectedAddress && !enableInput ? true : false}
        />
      </ShippingItem>

      <div className="shipping-item">
        {selectedAddress && !enableInput && (
          <div className="shipping-button">
            <button onClick={() => setEnableInput(true)}>수정하기</button>
            <button
              onClick={() => dispatch(deleteAddress(selectedAddress._id))}
            >
              삭제하기
            </button>
          </div>
        )}
        {enableInput && (
          <div className="shipping-button">
            <button onClick={handleSubmit}>수정 완료</button>
            <button onClick={() => setEnableInput(false)}>취소 하기</button>
          </div>
        )}
        {!selectedAddress && !enableInput && (
          <div className="shipping-button">
            <button onClick={handleSubmit}>등록하기</button>
          </div>
        )}
      </div>
    </>
  );
}

export default AddressForm;
