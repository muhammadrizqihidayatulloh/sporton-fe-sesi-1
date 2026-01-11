import CardWithHeader from "../ui/card-with-heder";

const OrderInformation = () => {
    return(
        <CardWithHeader title="Order Information">
            <div className="p-5">
                <div className="input-group">
                    <label htmlFor="full_name">Full Name</label>
                <input type="text" placeholder="Type your full name" id="full_name" />
                </div>
                <div className="input-group">
                    <label htmlFor="wa_numbe">Whatsapp Number</label>
                <input type="number" placeholder="Type your full whatsapp number" id="wa_number" />
                </div>
                <div className="input-group">
                    <label htmlFor="shipping_adress">Shipping Adress</label>
                <textarea placeholder="Type your full shipping adress" id="shipping_adress" rows={7} />
                </div>
            </div>
        </CardWithHeader>
    )
}
export default OrderInformation;