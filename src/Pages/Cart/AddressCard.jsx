
// AddressCard component
const AddressCard = ({name, address, onSelectAddress, selectedAddress }) => {
    const isSelected = selectedAddress === address.id;

    return (
        <div className={`p-4 border rounded-lg cursor-pointer ${isSelected ? "bg-red-100" : ""}`} onClick={() => onSelectAddress(address.id)}>
            <p className="text-lg font-semibold">{name}</p>
            <p className="">{address.street_address}, {address.region}</p>
            <p>{address.district}, {address.state} - {address.postal_code}</p>
        </div>
    );
};
export default AddressCard;