import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import "./addresses.scss";
import AddressForm from '../../components/addressForm/AddressForm';
import MypageItem from '../../components/mypage/MypageItem';
import MypageLayout from '../../components/mypage/MypageLayout';

function Addresses() {
  const { addresses } = useSelector((store) => store.user);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [formType, setFormType] = useState("add");
  const [enableInput, setEnableInput] = useState(false);

  return (
    <MypageLayout>
      <MypageItem title={"배송지 관리"}>
      <div className="shipping-content">
            <div className="shipping-item">
              <div className="shipping-item-left">배송지 선택</div>
              <div className="shipping-selection">
                <div>
                  <input
                    type="radio"
                    id="new"
                    name="destination"
                    value="new"
                    onClick={() => {
                      setFormType("add");
                      setEnableInput(false);
                    }}
                    defaultChecked={formType === "add" ? true : false}
                  />{" "}
                  <label htmlFor="new">신규 배송지</label>
                </div>
                {addresses?.map((address) => (
                  <div key={address._id}>
                    <input
                      type="radio"
                      id={address.name}
                      name="destination"
                      value={address.name}
                      onClick={() => {
                        setSelectedAddress(address);
                        setFormType("update");
                      }}
                    />{" "}
                    <label htmlFor={address.name}>{address.name}</label>
                  </div>
                ))}
              </div>
            </div>
            {formType === "add" ? (
              <AddressForm
                enableInput={enableInput}
                setEnableInput={setEnableInput}
              />
            ) : (
              <AddressForm
                enableInput={enableInput}
                setEnableInput={setEnableInput}
                selectedAddress={selectedAddress}
              />
            )}
          </div>
      </MypageItem>
    </MypageLayout>
  )
}

export default Addresses;