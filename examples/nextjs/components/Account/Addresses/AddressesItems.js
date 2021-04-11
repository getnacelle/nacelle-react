import React, { useContext, useState } from 'react';
import AddressesForm from 'components/Account/Addresses/AddressesForm';
import { Button } from '@nacelle/react-components';
import { AccountContext } from 'providers/Account';

const AddressesItems = ({ address }) => {
  const { accountData, accountDispatcher } = useContext(AccountContext);
  const [editing, setEditing] = useState(false);
  const handleEdit = () => {
    setEditing(!editing);
  };
  const handleDelete = () => {
    accountDispatcher({
      type: 'DELETE_ADDRESS',
      payload: { id: address.id }
    });
  };
  const handleSelect = () => {
    accountDispatcher({
      type: 'UPDATE_DEFAULT_ADDRESS',
      payload: { id: address.id }
    });
  };
  return (
    <div>
      <div>
        {address.id === accountData.defaultAddress.id && (
          <h3>Default Address</h3>
        )}

        <p>{address.firstName}</p>
        <p>{address.lastName}</p>
        <p>
          {address.city}, {address.province}, {address.zip}
        </p>
        <p>{address.lastName}</p>
        <p>{address.country}</p>
        <p>{address.phone}</p>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleSelect}>Default</Button>
      </div>
      {editing && <AddressesForm address={address} />}
    </div>
  );
};

export default AddressesItems;
